import React from 'react';
import logger from '../../../lib/logger';
import StudyRegistrationDash from '../../../views/StudyRegistration/StudyRegistrationDash/StudyRegistrationDash';
import axios from 'axios';
import { GET_CURATOR_STUDIES } from '../../../constants/apiRoutes';

const StudyRegistrationCuratorPage = (props) => <StudyRegistrationDash {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'Study Registration Dashboard - Curator View';
    const { req, query } = context;
    const status = query?.status || 'all';
    let studies;
    const userRole = 'curator';
    logger.info('Calling GET_CURATOR_STUDIES');
    try {
        const studyResponse = await axios.get(`${GET_CURATOR_STUDIES}?status=${status}`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        studies = studyResponse.data;
    } catch (e) {
        logger.error(`GET_CURATOR_STUDIES call failed.  Error Message: ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
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

export default StudyRegistrationCuratorPage;
