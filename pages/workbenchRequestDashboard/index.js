import React from 'react';
import WorkbenchRequestDashboard from '../../views/WorkbenchRequest/WorkbenchRequestDashboard';
import { GET_WORKBENCH_REQUESTS } from '../../constants/apiRoutes';
import axios from 'axios';
import logger from '../../lib/logger';

const WorkbenchRequestDashboardPage = (props) => <WorkbenchRequestDashboard {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'Workbench Request Dashboard';
    const { req } = context;
    let workbenchRequestData;

    logger.info('Calling GET_WORKBENCH_REQUESTS: %s', GET_WORKBENCH_REQUESTS);
    try {
        const getWorkbenchRequestReponse = await axios.get(GET_WORKBENCH_REQUESTS, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        workbenchRequestData = getWorkbenchRequestReponse.data;
    } catch (e) {
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
        if ([400, 401, 403, 500].includes(e?.response?.status)) {
            return {
                redirect: {
                    destination: `/?e=${e?.response?.status}`,
                },
            };
        }
    }

    return {
        props: { workbenchRequestData },
    };
}

export default WorkbenchRequestDashboardPage;
