/* eslint-disable no-inner-declarations */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classes from './StudyRegistrationEdit.module.scss';
import { useRouter } from 'next/router';
import Banner from '../../../components/Banner/Banner';
import { Col, Container, Row } from 'react-bootstrap';
import Button from '../../../components/Button/Button';
import CuratorForm from './Components/CuratorForm';
import DCCForm from './Components/DCCForm';
import { useForm } from 'react-hook-form';
import useRest from '../../../lib/hooks/useRest';
import Alert from '../../../components/Notifications/Alert';
import { isEmpty } from '../../../lib/hooks/comparisonFunctions';
import Input from '../../../components/Input/Input';
import { BaseNotification, NotificationType } from '../../../store/notifications/notificationConstants';
import { UPDATE_STUDY_REGISTRATION } from '../../../constants/apiRoutes';
import { addNotification } from '../../../store/notifications/notificationsSlice';
import { useDispatch } from 'react-redux';
import { scrollToTop } from '../../../lib/componentHelpers/scrollHelpers';
import { ChevronLeft, Download, ChevronRight } from 'react-bootstrap-icons';
import TextArea from '../../../components/TextArea/TextArea';
import Cookies from 'js-cookie';

/**
 * This is the dynamic Study Registration Form that is prepopulated from the fields in DBGap's MTA form a curator uploads on the Study Registration Dashboard
 * The views will differ based on if a DCC or a curator are viewing it.
 * The major difference in views is that a curator can edit pretty much anything that originally came from the MTA form.
 * @property {String} type - details if the curator or a dcc is looking at this page and manages differences in the views
 * @property {Object} formData - data that prepopulates these fields
 * @property {Object} studyInfo - the original data from the study
 * @property {Object} codeListsValues - all of the codelists on the site
 * @property {String} PDF_URL - Link for the user to download the MTA PDF form for this study
 * @returns {Node} The Study Registration Edit form
 */

const StudyRegistrationEdit = (props) => {
    const { type, formData, studyInfo, codeListsValues, PDF_URL } = props;
    const crumbs = [
        {
            page: 'Home',
            pageLink: '/',
            ariaLabel: 'home',
        },
        {
            page: 'Study Registration',
            // eslint-disable-next-line react/prop-types
            pageLink: `/${type.toLowerCase()}/studyRegistration`,
            ariaLabel: 'Study Registration',
        },
        {
            page: `Edit Study : ${formData?.phs}`,
        },
    ];

    const dispatch = useDispatch();

    // DCC other field badges
    const [foa, setFoa] = useState(formData?.FOA_number || []);
    const [topics, setTopics] = useState(formData?.topics_other_specify || []);
    const [keywords, setKeywords] = useState(formData?.subject || []);
    const [publicationURLs, setPublicationURLs] = useState(formData?.publication_URL || []);
    const [sourceOtherSpecify, setSourceOtherSpecify] = useState(formData?.source_other_specify || []);

    // Curator Checkboxes
    const [hasIC, setHasIC] = useState(formData?.has_ic);
    const [dataSharingInfo, setDataSharingInfo] = useState(formData?.data_sharing_info);
    const [isMultiCenter, setIsMultiCenter] = useState(formData?.is_multi_center);

    // Curator other field badges
    const [otherDataAccessPoints, setOtherDataAccessPoints] = useState(formData?.data_access_points_other || []);
    const [grantNumber, setGrantNumber] = useState(formData?.grant_number || []);
    const [typesOtherSpecify, setTypesOtherSpecify] = useState(formData?.types_other_specify || []);
    const [dataGeneralTypesOtherSpecify, setDataGeneralTypesOtherSpecify] = useState(formData?.data_general_types_other_specify || []);
    const [dataGenomicOtherSpecify, setDataGenomicOtherSpecify] = useState(formData?.data_genomic_other_specify || []);
    const [dataPhenotypeOtherSpecify, setDataPhenotypeOtherSpecify] = useState(formData?.data_phenotype_other_specify || []);
    const [dataSampleTypesOtherSpecify, setDataSampleTypesOtherSpecify] = useState(formData?.data_sample_types_other_specify || []);
    const [dataGenotypeOtherSpecify, setDataGenotypeOtherSpecify] = useState(formData?.data_genotype_other_specify || []);
    const [dataSequencingOtherSpecify, setDataSequencingOtherSpecify] = useState(formData?.data_sequencing_other_specify || []);
    const [dataAnalysesOtherSpecify, setDataAnalysesOtherSpecify] = useState(formData?.data_analyses_other_specify || []);
    const [dataArrayDataOtherSpecify, setDataArrayDataOtherSpecify] = useState(formData?.data_array_data_other_specify || []);

    const dccStates = {
        foa,
        setFoa,
        topics,
        setTopics,
        keywords,
        setKeywords,
        publicationURLs,
        setPublicationURLs,
        sourceOtherSpecify,
        setSourceOtherSpecify,
    };
    const curatorStates = {
        setHasIC,
        hasIC,
        setDataSharingInfo,
        dataSharingInfo,
        setIsMultiCenter,
        isMultiCenter,
        setOtherDataAccessPoints,
        otherDataAccessPoints,
        setGrantNumber,
        grantNumber,
        setTypesOtherSpecify,
        typesOtherSpecify,
        setDataGeneralTypesOtherSpecify,
        dataGeneralTypesOtherSpecify,
        setDataGenomicOtherSpecify,
        dataGenomicOtherSpecify,
        setDataPhenotypeOtherSpecify,
        dataPhenotypeOtherSpecify,
        setDataSampleTypesOtherSpecify,
        dataSampleTypesOtherSpecify,
        setDataGenotypeOtherSpecify,
        dataGenotypeOtherSpecify,
        setDataSequencingOtherSpecify,
        dataSequencingOtherSpecify,
        setDataAnalysesOtherSpecify,
        dataAnalysesOtherSpecify,
        setDataArrayDataOtherSpecify,
        dataArrayDataOtherSpecify,
    };

    const router = useRouter();
    const { restPut } = useRest();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, dirtyFields },
        setValue,
        getValues,
        resetField,
        trigger,
        control,
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
    });

    const handleSubmitHelper = async (data, shouldSubmit) => {
        // Manually trigger validation so I can see errors before I do any data processing
        trigger();
        data.has_ic = hasIC;
        data.data_sharing_info = dataSharingInfo;
        data.is_multi_center = isMultiCenter;
        // if form isValid, process all of the array fields and do the calls
        if ((isValid && Object.keys(dirtyFields).length > 0) || (shouldSubmit && isValid)) {
            data.FOA_number = [...foa, data.FOA_number ? data.FOA_number : null];
            if (isEmpty(data.FOA_number[data.FOA_number.length - 1])) {
                data.FOA_number.pop();
            }
            data.topics_other_specify = [...topics, data.topics_other_specify ? data.topics_other_specify : null];
            if (isEmpty(data.topics_other_specify[data.topics_other_specify.length - 1])) {
                data.topics_other_specify.pop();
            }
            data.subject = [...keywords, data.subject ? data.subject : null];
            if (isEmpty(data.subject[data.subject.length - 1])) {
                data.subject.pop();
            }
            data.publication_URL = [...publicationURLs, data.publication_URL ? data.publication_URL : null];
            if (isEmpty(data.publication_URL[data.publication_URL.length - 1])) {
                data.publication_URL.pop();
            }
            data.source_other_specify = [...sourceOtherSpecify, data.source_other_specify ? data.source_other_specify : null];
            if (isEmpty(data.source_other_specify[data.source_other_specify.length - 1])) {
                data.source_other_specify.pop();
            }
            if (type === 'Curator') {
                data.data_access_points_other = [
                    ...otherDataAccessPoints,
                    data.data_access_points_other ? data.data_access_points_other : null,
                ];
                if (isEmpty(data.data_access_points_other[data.data_access_points_other.length - 1])) {
                    data.data_access_points_other.pop();
                }
                data.grant_number = [...grantNumber, data.grant_number ? data.grant_number : null];
                if (isEmpty(data.grant_number[data.grant_number.length - 1])) {
                    data.grant_number.pop();
                }
                data.types_other_specify = [...typesOtherSpecify, data.types_other_specify ? data.types_other_specify : null];
                if (isEmpty(data.types_other_specify[data.types_other_specify.length - 1])) {
                    data.types_other_specify.pop();
                }
                data.data_general_types_other_specify = [
                    ...dataGeneralTypesOtherSpecify,
                    data.data_general_types_other_specify ? data.data_general_types_other_specify : null,
                ];
                if (isEmpty(data.data_general_types_other_specify[data.data_general_types_other_specify.length - 1])) {
                    data.data_general_types_other_specify.pop();
                }
                data.data_genomic_other_specify = [
                    ...dataGenomicOtherSpecify,
                    data.data_genomic_other_specify ? data.data_genomic_other_specify : null,
                ];
                if (isEmpty(data.data_genomic_other_specify[data.data_genomic_other_specify.length - 1])) {
                    data.data_genomic_other_specify.pop();
                }
                data.data_phenotype_other_specify = [
                    ...dataPhenotypeOtherSpecify,
                    data.data_phenotype_other_specify ? data.data_phenotype_other_specify : null,
                ];
                if (isEmpty(data.data_phenotype_other_specify[data.data_phenotype_other_specify.length - 1])) {
                    data.data_phenotype_other_specify.pop();
                }
                data.data_sample_types_other_specify = [
                    ...dataSampleTypesOtherSpecify,
                    data.data_sample_types_other_specify ? data.data_sample_types_other_specify : null,
                ];
                if (isEmpty(data.data_sample_types_other_specify[data.data_sample_types_other_specify.length - 1])) {
                    data.data_sample_types_other_specify.pop();
                }
                data.data_genotype_other_specify = [
                    ...dataGenotypeOtherSpecify,
                    data.data_genotype_other_specify ? data.data_genotype_other_specify : null,
                ];
                if (isEmpty(data.data_genotype_other_specify[data.data_genotype_other_specify.length - 1])) {
                    data.data_genotype_other_specify.pop();
                }
                data.data_sequencing_other_specify = [
                    ...dataSequencingOtherSpecify,
                    data.data_sequencing_other_specify ? data.data_sequencing_other_specify : null,
                ];
                if (isEmpty(data.data_sequencing_other_specify[data.data_sequencing_other_specify.length - 1])) {
                    data.data_sequencing_other_specify.pop();
                }
                data.data_analyses_other_specify = [
                    ...dataAnalysesOtherSpecify,
                    data.data_analyses_other_specify ? data.data_analyses_other_specify : null,
                ];
                if (isEmpty(data.data_analyses_other_specify[data.data_analyses_other_specify.length - 1])) {
                    data.data_analyses_other_specify.pop();
                }
                data.data_array_data_other_specify = [
                    ...dataArrayDataOtherSpecify,
                    data.data_array_data_other_specify ? data.data_array_data_other_specify : null,
                ];
                if (isEmpty(data.data_array_data_other_specify[data.data_array_data_other_specify.length - 1])) {
                    data.data_array_data_other_specify.pop();
                }

                // send the data, along with dirty fields to the server to process and send to the backend since we need to update the
            }
            const updateResult = await restPut(
                `${UPDATE_STUDY_REGISTRATION.replace('[userType]', type.toLowerCase())}${shouldSubmit}`,
                { formFields: data, dirtyFields: dirtyFields, originalFields: studyInfo },
                {
                    showLoading: true,
                    successMessage: 'Study successfully updated',
                }
            );

            if (updateResult.request.status === 200 && updateResult?.data.success === true) {
                router.push(`/${type.toLowerCase()}/studyRegistration`);
            }
        } else {
            scrollToTop();
            const tempNotification = { ...BaseNotification };
            tempNotification.message = 'There were errors with your input fields.  Please review the outlined fields';
            tempNotification.type = NotificationType.ERROR;
            dispatch(addNotification(tempNotification));
        }
    };

    return (
        <>
            <Banner title="Study Registration" manualCrumbs={crumbs} variant="crystal" ariaLabel="Support Request Breadcrumb" />
            {Object.keys(errors).length > 0 && (
                <Alert variant="danger" dismissible className={classes.alert}>
                    <Container>
                        {Object.keys(errors).map((error, index) => {
                            return (
                                <Row key={index} className="py-1">
                                    <Col className={classes.errorText}>Error: {errors[error]?.message}</Col>
                                </Row>
                            );
                        })}
                    </Container>
                </Alert>
            )}
            <Container>
                <Row className="mb-2 mt-2">
                    <Col lg={3}>
                        <Row className="mb-2">
                            <Input value={formData?.dcc} controlId="dcc" label="RADx Data Program" disabled />
                        </Row>

                        <Row className="mb-2">
                            <Input value={formData?.phs} controlId="phs" label="PHS (dbGaP) ID" disabled />
                        </Row>
                    </Col>
                    <Col>
                        <TextArea
                            {...register('title', {
                                required: type === 'Curator' && 'Study Name is missing',
                                value: formData?.title,
                            })}
                            inline
                            required
                            error={errors.title}
                            className={classes.textArea}
                            controlId=""
                            label="Study Name"
                            disabled={type !== 'Curator'}
                        />
                    </Col>
                </Row>
            </Container>
            <div className={classes.divider}>
                <Container className={classes.topActionContainer}>
                    <Button
                        label="Return to Dashboard"
                        iconLeft={<ChevronLeft />}
                        className={classes.returnButton}
                        ariaLabel="Return to the Study Registration Dashboard"
                        size="auto"
                        variant="secondary"
                        handleClick={() => {
                            router.push(`/${type.toLowerCase()}/studyRegistration`);
                        }}
                    />
                    <span className={classes.shoveRight}>Please review and edit these fields if necessary.</span>
                    <div>
                        <Row className="mb-2">
                            <a href={`${PDF_URL}${Cookies.get('chocolateChip')}`} download suppressHydrationWarning={true}>
                                <Button
                                    label="Download Study PDF"
                                    iconLeft={<Download />}
                                    className={classes.downloadButton}
                                    ariaLabel="Return to the Study Registration Dashboard"
                                    size="none"
                                    variant="tertiary"
                                />
                            </a>
                        </Row>
                        {type === 'Curator' && (
                            <Row>
                                <Button
                                    label="Preview Study Page"
                                    iconRight={<ChevronRight />}
                                    ariaLabel="Preview the Study Page for this study"
                                    size="none"
                                    className={classes.downloadButton}
                                    variant="secondary"
                                    handleClick={() => {
                                        router.push(`/study/${studyInfo.studyId}`);
                                    }}
                                />
                            </Row>
                        )}
                    </div>
                </Container>
            </div>

            <Container>
                <Row className={classes.container}>
                    <Col className={classes.body}>
                        {type === 'Curator' && (
                            <CuratorForm
                                register={register}
                                formData={formData}
                                errors={errors}
                                getValues={getValues}
                                resetField={resetField}
                                curatorStates={curatorStates}
                                control={control}
                                codeListsValues={codeListsValues}
                                setValue={setValue}
                            />
                        )}
                        <DCCForm
                            type={type}
                            register={register}
                            formData={formData}
                            errors={errors}
                            control={control}
                            codeListsValues={codeListsValues}
                            getValues={getValues}
                            resetField={resetField}
                            dccStates={dccStates}
                            setValue={setValue}
                            trigger={trigger}
                        />
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col lg="3">
                        <Button
                            label="Return to Dashboard"
                            iconLeft={<ChevronLeft />}
                            ariaLabel="Return to the Study Registration Dashboard"
                            size="auto"
                            variant="secondary"
                            handleClick={() => {
                                router.push(`/${type.toLowerCase()}/studyRegistration`);
                            }}
                        />
                    </Col>
                    <Col lg={{ offset: 6 }}>
                        <Button
                            label="Save"
                            ariaLabel="Save Updates"
                            size="medium"
                            variant="tertiary"
                            handleClick={() => {
                                handleSubmit(handleSubmitHelper(getValues(), 'false'));
                            }}
                        />
                    </Col>
                    <Col>
                        <div className="pullRight">
                            <Button
                                label="Submit"
                                ariaLabel="Submit Updates"
                                size="medium"
                                variant="primary"
                                handleClick={() => {
                                    handleSubmit(handleSubmitHelper(getValues(), 'true'));
                                }}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

StudyRegistrationEdit.propTypes = {
    PDF_URL: PropTypes.string,
    codeListsValues: PropTypes.object,
    formData: PropTypes.shape({
        FOA_number: PropTypes.array,
        data_access_points_other: PropTypes.array,
        data_analyses_other_specify: PropTypes.array,
        data_array_data_other_specify: PropTypes.array,
        data_general_types_other_specify: PropTypes.array,
        data_genomic_other_specify: PropTypes.array,
        data_genotype_other_specify: PropTypes.array,
        data_phenotype_other_specify: PropTypes.array,
        data_sample_types_other_specify: PropTypes.array,
        data_sequencing_other_specify: PropTypes.array,
        data_sharing_info: PropTypes.string,
        dcc: PropTypes.string,
        grant_number: PropTypes.array,
        has_ic: PropTypes.string,
        is_multi_center: PropTypes.string,
        phs: PropTypes.string,
        publication_URL: PropTypes.array,
        source_other_specify: PropTypes.array,
        subject: PropTypes.array,
        title: PropTypes.string,
        topics_other_specify: PropTypes.array,
        types_other_specify: PropTypes.array,
    }),
    studyInfo: PropTypes.any,
    type: PropTypes.string,
};

export default StudyRegistrationEdit;
