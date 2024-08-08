import React from 'react';
import StudyRegistrationDash from '../../../views/StudyRegistration/StudyRegistrationDash/StudyRegistrationDash';
import logger from '../../../lib/logger';
import axios from 'axios';
import { GET_DCC_STUDIES } from '../../../constants/apiRoutes';

const StudyRegistrationDCCPage = (props) => <StudyRegistrationDash {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'Study Registration Dashboard - DCC View';
    const { req, query } = context;
    const status = query?.status || 'all';
    let studies;
    const userRole = 'dcc';
    logger.info('Calling GET_DCC_STUDIES');
    try {
        const studyResponse = await axios.get(`${GET_DCC_STUDIES}?status=${status}`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        studies = studyResponse.data;
    } catch (e) {
        logger.error(`GET_DCC_STUDIES call failed.  Error Message: ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
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
            userRole,
            studies,
        },
    };
}

export default StudyRegistrationDCCPage;
