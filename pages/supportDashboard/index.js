import React from 'react';
import SupportDashboard from '../../views/SupportDashboard/SupportDashboard';

import logger from '../../lib/logger';
import { GET_ALL_SUPPORT_REQUEST } from '../../constants/apiRoutes';
import axios from 'axios';

const SupportDashboardPage = (props) => <SupportDashboard {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'get_support_dashboard';
    const { query, req } = context;
    let getSupportDashboard = {};

    try {
        const getSupportDashboardResponse = await axios.get(`${GET_ALL_SUPPORT_REQUEST}${query.status || 'all'}`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });

        getSupportDashboard = getSupportDashboardResponse.data;
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
            getSupportDashboard,
        },
    };
}

export default SupportDashboardPage;
