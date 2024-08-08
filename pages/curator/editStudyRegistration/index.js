import React from 'react';
import logger from '../../../lib/logger';
import StudyRegistrationEdit from '../../../views/StudyRegistration/StudyEdit/StudyRegistrationEdit';
import axios from 'axios';
import { DOWNLOAD_STUDY_REG_PDF, GET_CODELISTS, GET_STUDY_VALUES } from '../../../constants/apiRoutes';

const StudyRegistrationEditPage = (props) => <StudyRegistrationEdit {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'Study Registration - Curator View';
    const { req } = context;
    const { studyId } = context.query;
    let codeLists, studyInfo;
    logger.info('Calling GET_STUDY_VALUES for study: ', studyId);

    try {
        const studyDataResponse = await axios.get(GET_STUDY_VALUES.replace('[studyId]', studyId), {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        studyInfo = studyDataResponse.data;
    } catch (e) {
        logger.error(`GET_STUDY_VALUES call failed for study ${studyId}: ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
        if ([400, 401, 403, 500].includes(e?.response?.status)) {
            return {
                redirect: {
                    destination: `/?e=${e?.response?.status}`,
                },
            };
        }
    }
    logger.info('Calling GET_CODELISTS for study: ', studyId);
    try {
        const codeListResponse = await axios.get(GET_CODELISTS, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        codeLists = codeListResponse.data;
    } catch (e) {
        logger.error(`Get Codelists call failed: ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
    }

    const codeListsValues = {};
    for (const codeList in codeLists) {
        codeListsValues[codeList] = [];
        codeLists[codeList].map((string) => {
            return codeListsValues[codeList].push({ label: string, value: string });
        });
    }

    const formData = {};
    for (let i = 0; i < studyInfo.studyPropertyValues.length; i++) {
        // If we already have the entity name in our FormData, that means it will always be a multiSelect or an other, so this needs to be an array
        if (studyInfo.studyPropertyValues[i].entityProperty.name in formData) {
            if (Array.isArray(formData[studyInfo.studyPropertyValues[i].entityProperty.name])) {
                formData[studyInfo.studyPropertyValues[i].entityProperty.name].push(studyInfo.studyPropertyValues[i].value);
            } else {
                formData[studyInfo.studyPropertyValues[i].entityProperty.name] = [
                    formData[studyInfo.studyPropertyValues[i].entityProperty.name],
                    studyInfo.studyPropertyValues[i].value,
                ];
            }
        } else {
            formData[studyInfo.studyPropertyValues[i].entityProperty.name] = studyInfo.studyPropertyValues[i].value;
        }
    }

    return {
        props: { type: 'Curator', studyInfo, formData, codeListsValues, PDF_URL: DOWNLOAD_STUDY_REG_PDF.replace('[studyId]', studyId) },
    };
}

export default StudyRegistrationEditPage;
