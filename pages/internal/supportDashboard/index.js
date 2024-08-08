import React from 'react';
import logger from '../../../lib/logger';
import { GET_ALL_SUPPORT_REQUEST, GET_INTERNAL_SUPPORT_REQUEST_REPORT } from '../../../constants/apiRoutes';
import axios from 'axios';
import InternalDashboard from '../../../views/Internal/InternalDashboard';

const InternalDashboardPage = (props) => <InternalDashboard {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'get_support_dashboard';
    const { req } = context;
    const baseUrl = process.env.DEV_URL;
    let getSupportTracker = {};

    try {
        const getSupportDashboardResponse = await axios.get(`${GET_ALL_SUPPORT_REQUEST}all`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        getSupportTracker = getSupportDashboardResponse.data;
    } catch (e) {
        logger.error(`Error with GET_ALL_SUPPORT_REQUEST: ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
        if ([400, 401, 403, 500].includes(e?.response?.status)) {
            return {
                redirect: {
                    destination: `/?e=${e?.response?.status}`,
                },
            };
        }
    }

    return {
        props: {
            getSupportTracker,
            downloadCSV: `${baseUrl}${GET_INTERNAL_SUPPORT_REQUEST_REPORT}`
        },
    };
}

export default InternalDashboardPage;
