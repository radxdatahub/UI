import React from 'react';
import StudyFileSubmissionDetailsPage from '../../views/StudyFileSubmissions/StudyFileSubmissionDetailsPage';
import { GET_STUDY_FILE_SUBMISSION_FILES } from '../../constants/apiRoutes';
import logger from '../../lib/logger';
import axios from 'axios';

const StudyFileSubmissionsInfo = (props) => <StudyFileSubmissionDetailsPage {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'get_study_file_submission';
    const { req } = context;
    const { submissionId } = context.query;

    let studySubmissionInfo = {};
    const baseUrl = process.env.DEV_URL;

    logger.info('Calling GET_STUDY_FILE_SUBMISSION_FILES with: %s', `${GET_STUDY_FILE_SUBMISSION_FILES}${submissionId}`);
    try {
        const studySubmissionInfoResponse = await axios.get(`${GET_STUDY_FILE_SUBMISSION_FILES}${submissionId}`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        studySubmissionInfo = studySubmissionInfoResponse.data;
    } catch (e) {
        logger.error(`GET_STUDY_FILE_SUBMISSION_FILES call failed.  Error Message: ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
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
            submissionId,
            studySubmissionInfo,
            baseUrl
        },
    };
}

export default StudyFileSubmissionsInfo;
