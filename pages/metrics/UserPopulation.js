import React from 'react';
import axios from 'axios';
import logger from '../../lib/logger';
import Metrics from '../../views/Metrics/Metrics';
import { GET_USER_POPULATION, GET_USER_POPULATION_CSV } from '../../constants/apiRoutes';
import { generateMetricsRows } from '../../lib/componentHelpers/TableHelpers/metricsTableHelpers';
import { monthAgo, weekAgo } from '../../views/Metrics/Constants/MetricsConstants';
import { format } from 'date-fns';

const MetricsHub = (props) => <Metrics {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'Metrics Reports - User Population';
    const { req } = context;

    let tableRows = {};
    let tableColumns = {};
    const reportType = {
        label: 'User Population',
        value: 'UserPopulation',
    };
    const aggregations = [
        { label: 'Institution: Type', value: 'type' },
        { label: 'Institution: Location', value: 'location' },
        { label: 'Institution: Profit/Not for Profit', value: 'profit' },
        { label: 'User: Researcher Level', value: 'level' },
    ];
    let { startDate, endDate, time, aggBy } = context.query;

    if (time === 'LastWeek') {
        startDate = weekAgo;
        endDate = format(new Date(), 'yyyy-MM-dd');
    } else if (time === 'LastMonth') {
        startDate = monthAgo;
        endDate = format(new Date(), 'yyyy-MM-dd');
    } else if (time === 'AllTime') {
        startDate = format(new Date('December 01, 2022 00:00:01'), 'yyyy-MM-dd');
        endDate = format(new Date(), 'yyyy-MM-dd');
    }

    logger.info('Checking if query has been submitted by user.');
    if (startDate !== undefined || endDate !== undefined) {
        // If we have the date range, get the data
        logger.info(
            'Query Submitted - Calling Metrics for User Activities at : %s',
            GET_USER_POPULATION.replace('[startDate]', startDate).replace('[endDate]', endDate).replace('[aggBy]', aggBy)
        );

        try {
            const getUserActivitiesResponse = await axios.get(
                GET_USER_POPULATION.replace('[startDate]', startDate).replace('[endDate]', endDate).replace('[aggBy]', aggBy),
                {
                    withCredentials: true,
                    headers: {
                        Cookie: req.headers.cookie,
                    },
                }
            );

            tableRows = generateMetricsRows(getUserActivitiesResponse.data.aggDtos);
            tableColumns = getUserActivitiesResponse.data.columnNames;
        } catch (e) {
            logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
            if ([400, 401, 403].includes(e?.response?.status)) {
                return {
                    redirect: {
                        destination: `/?e=${e?.response?.status}`,
                    },
                };
            }
        }
    } else {
        logger.info('User has not submitted a query yet.');
    }

    return {
        props: {
            aggregations,
            tableRows,
            tableColumns,
            reportType,
            initData: { time: time || 'Custom', from: startDate, to: endDate, aggregate: aggBy },
            redirectString: '/metrics/UserPopulation',
            CSV_URL: GET_USER_POPULATION_CSV.replace('[startDate]', startDate).replace('[endDate]', endDate).replace('[aggBy]', aggBy),
        },
    };
}

export default MetricsHub;
