import React from 'react';
import axios from 'axios';
import logger from '../../lib/logger';
import Metrics from '../../views/Metrics/Metrics';
import { GET_HARMONIZATION_OUTCOMES, GET_HARMONIZATION_OUTCOMES_CSV, GET_HARMONIZATION_REPORT_IDS } from '../../constants/apiRoutes';
import { generateMetricsRows } from '../../lib/componentHelpers/TableHelpers/metricsTableHelpers';

const MetricsHub = (props) => <Metrics {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'Metrics Reports - Harmonization Outcomes';
    const { req, query } = context;
    let dateResponse;

    logger.info('Getting Report ID List : %s', GET_HARMONIZATION_REPORT_IDS);

    try {
        const getReportIDReponse = await axios.get(GET_HARMONIZATION_REPORT_IDS, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        dateResponse = getReportIDReponse?.data;
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
    const aggregations = [
        { label: 'Dataset', value: 'dataset' },
        { label: 'Study', value: 'study' },
    ];

    // grab Year Index, Month Index, and Report Index for initialization if a query was passed
    const selectedIDs = { year: query?.yi, month: query?.mi, reportID: query?.ri };
    logger.info('setting selected IDs : %s', selectedIDs);
    // we can't know the report id from the URL, so we have to parse it first (which is very gross but this is the API I was given)
    const reportId = dateResponse[selectedIDs?.year]?.months[selectedIDs?.month]?.reports[selectedIDs?.reportID]?.reportId || undefined;
    logger.info('setting reportID : %s', dateResponse[selectedIDs?.year]?.months[selectedIDs?.month]);
    let tableRows = {};
    let tableColumns = {};
    const reportType = {
        label: 'Harmonization Outcomes',
        value: 'Harmonization',
    };
    const { aggBy } = query;

    logger.info('Checking if query has been submitted by user.');
    if (aggBy !== undefined || reportId !== undefined) {
        // If we have the Aggregate type and the date range (which relates to the reportID), get the data
        logger.info(
            'Query Submitted - Calling Metrics for Harmonization at : %s',
            GET_HARMONIZATION_REPORT_IDS.replace('[aggBy]', aggBy).replace('[reportId]', reportId)
        );

        try {
            const getHarmonizationResponse = await axios.get(
                GET_HARMONIZATION_OUTCOMES.replace('[aggBy]', aggBy).replace('[reportId]', reportId),
                {
                    withCredentials: true,
                    headers: {
                        Cookie: req.headers.cookie,
                    },
                }
            );
            tableRows = generateMetricsRows(getHarmonizationResponse.data.dtos);
            tableColumns = getHarmonizationResponse.data.columnNames;
        } catch (e) {
            logger.error(`Get Harmonization call failed: ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
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
    // initialize years list
    const years = dateResponse.map((value, index) => {
        return { label: value.year, value: index };
    });
    // if a query is present, we need to populate the right months right away.
    const initializedMonths = dateResponse[selectedIDs?.yi || 0]?.months.map((value, index) => {
        return { label: value.month[0] + value.month.slice(1).toLowerCase(), value: index };
    });

    // if a query is present, we need to populate the reportID list for the month too.
    const initIDs = dateResponse[selectedIDs?.year]?.months[selectedIDs?.month].reports.map((value, index) => {
        return { label: value.reportDate.slice(8), value: index, reportID: value.reportId };
    });
    return {
        props: {
            tableRows,
            tableColumns,
            reportType,
            aggregations,
            reportIDs: { years: years, dateResponse: dateResponse },
            initData: { months: initializedMonths, IDList: initIDs, selectedIDs: selectedIDs, aggregate: query.aggBy }, // if query is present
            redirectString: '/metrics/Harmonization',
            CSV_URL: GET_HARMONIZATION_OUTCOMES_CSV.replace('[aggBy]', aggBy).replace('[reportId]', reportId),
        },
    };
}

export default MetricsHub;
