import React from 'react';
import SubmitterDashboard from '../../views/SubmitterDashboard/Components/SubmitterDashboard';
import logger from '../../lib/logger';
import { GET_RESOURCE_CENTER_BUCKET, GET_SUBMITTER_SUBMISSIONS } from '../../constants/apiRoutes';
import axios from 'axios';

const SubmitterDashboardPage = (props) => <SubmitterDashboard {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'get_submitter_dashboard_submissions';
    const { req, query } = context;
    const status = query?.status || 'in_progress';
    let submissionsData = [];
    const baseUrl = process.env.DEV_URL;
    try {
        const submitterDashboardResponse = await axios.get(`${GET_SUBMITTER_SUBMISSIONS}?status=${status}`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        submissionsData = submitterDashboardResponse.data;
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
        props: {
            submissionsData,
            baseUrl,
            fileUploadSOP: `${process.env.DEV_URL}${GET_RESOURCE_CENTER_BUCKET}RADx_Data_Hub-File_Upload_SOP.pdf`,
        },
    };
}

export default SubmitterDashboardPage;
