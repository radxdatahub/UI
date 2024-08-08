ARG DEV_URL={INSERT URL HERE}
ARG EXT_DEV_URL={INSERT URL HERE}
ARG RAS_URL={INSERT URL HERE}
ARG NODE_TLS_REJECT_UNAUTHORIZED=0
ARG NEXT_PUBLIC_GTAG

FROM node:18-alpine3.18 AS deps

ARG DEV_URL
ARG EXT_DEV_URL
ARG RAS_URL
ARG NODE_TLS_REJECT_UNAUTHORIZED
ARG NEXT_PUBLIC_GTAG

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json ./
# RUN npm i @next/eslint-plugin-next
RUN npm install --production

FROM node:18-alpine3.18 AS builder

ARG DEV_URL
ARG EXT_DEV_URL
ARG RAS_URL
ARG NODE_TLS_REJECT_UNAUTHORIZED
ARG NEXT_PUBLIC_GTAG

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

FROM node:18-alpine3.18 AS runner

ARG DEV_URL
ARG EXT_DEV_URL
ARG RAS_URL
ARG NODE_TLS_REJECT_UNAUTHORIZED
ARG NEXT_PUBLIC_GTAG

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

ENV PORT 3000
ENV DEV_URL=${DEV_URL}
ENV EXT_DEV_URL=${EXT_DEV_URL}
ENV RAS_URL=${RAS_URL}
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
ENV NEXT_PUBLIC_GTAG=${NEXT_PUBLIC_GTAG}

EXPOSE 3000

CMD ["node", "server.js"]
