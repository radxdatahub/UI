/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
    stories: ['../components/**/*.mdx', '../components/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-coverage',
        '@storybook/addon-a11y',
    ],
    framework: {
        name: '@storybook/nextjs',
        options: {},
    },
    core: {
        disableTelemetry: true,
    },
    docs: {
        autodocs: 'tag',
    },
    staticDirs: ['../public'],
};
export default config;
