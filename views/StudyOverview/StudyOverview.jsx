/* eslint-disable max-len */
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import classes from './StudyOverview.module.scss';
import Banner from '../../components/Banner/Banner';
import Button from '../../components/Button/Button';
import InfoIcon from '../../components/Images/svg/InfoIcon';
import Table from '../../components/Table/Table';
import RequestAccessModal from './Components/RequestAccessModal';
import MetadataVisualizerModal from './Components/MetadataVisualizerModal';
import NoticeBox from '../../components/NoticeBox/NoticeBox';
import useRest from '../../lib/hooks/useRest';
import { GET_ALL_DOCUMENTS } from '../../constants/apiRoutes';
import { combineDuplicates, renderList } from './Misc/HelperFunctions';
import { documentsTable, datasetsTable, variablesSubTable } from './Misc/ColumnDefs';

/**
 * View for the Study Overview
 *
 * @property {String} studyId - ID of study
 * @property {Array<Object>} studyData - Study's metadata like Title, Detail, and Representative
 * @property {Array<Object>} studyDocuments - List of study's documents
 * @property {Array<Object>} studyDatasets - List of study's datasets
 * @property {String} baseUrl - base URL used for downloads
 * @returns {Node} object rendering the Study Overview
 */

const StudyOverview = (props) => {
    const { studyId, studyData, studyDocuments, studyDatasets, baseUrl } = props;
    const { restGet } = useRest();

    // Request Access Modal
    const [requestAccessModalVisible, setRequestAccessModalVisible] = useState(false);
    const closeRequestAccessModal = () => {
        setRequestAccessModalVisible(false);
    };

    // Metadata Visualizer Modal
    const [metadataModalVisible, setMetadataModalVisible] = useState(false);
    const closeMetadataModal = () => {
        setMetadataModalVisible(false);
    };
    const [metadataFile, setMetadataFile] = useState('');

    const crumbs = [
        {
            page: 'Home',
            pageLink: '/',
            ariaLabel: 'Link to Homepage',
        },
        {
            page: 'Study Explorer',
            pageLink: '/studyExplorer',
            ariaLabel: 'Study Explorer',
        },
        {
            page: 'Study Overview',
            ariaLabel: 'Study Overview',
        },
    ];

    const { Title, Detail, Representative } = studyData;
    const representativeData = renderList(Representative);
    const detailData = renderList(combineDuplicates(Detail));

    let studyName = Title.find((x) => x.label === 'Study Name');
    let studySize = Title.find((x) => x.label === 'Study Size (MB)');
    let rapidsLink = Representative.find((x) => x.label === 'RAPIDS Link');
    let phsLink = Representative.find((x) => x.label === 'dbGaP Study Accession');

    // Not all studies have a Study Size (ex: DHT studies). This is to assign the banner variables properly even with missing data
    const pageTitle = studySize ? `${studyName.propertyValue[0]} (${studySize.propertyValue[0]} MB)` : `${studyName.propertyValue[0]}`;

    // STUDY DOCUMENTS TABLE
    const documentsTableColumns = documentsTable(studyId, baseUrl);

    // STUDY DATASETS TABLE
    const datasetsTableColumns = datasetsTable(baseUrl, setMetadataModalVisible, setMetadataFile, restGet);

    let totalFiles, dataFiles, metaFiles, dictFiles;
    totalFiles = dataFiles = metaFiles = dictFiles = 0;

    studyDatasets.forEach((dataFile) => {
        totalFiles++;
        dataFiles++;
        if (dataFile.dictionaryFileId) {
            totalFiles++;
            dictFiles++;
        }
        if (dataFile.metadataFileId) {
            totalFiles++;
            metaFiles++;
        }
    });

    const renderSubComponent = ({ row }) => {
        return (
            <Table
                className={classes.variablesTable}
                tableRows={[row.original]}
                tableHeaders={variablesSubTable}
                ariaCaption="Variables Table"
                noHover
                responsive={false}
            ></Table>
        );
    };

    return (
        <>
            <Banner title={pageTitle} manualCrumbs={crumbs} variant="virus4" ariaLabel="Study Overview Breadcrumb" topic="Studies" />
            <div className={classes.studyOverview}>
                <div className={`${classes.divider} ${classes.firstDivider}`}>
                    <Container>Study Information</Container>
                </div>
                <div className={classes.section}>
                    <Container className={classes.Container}>
                        <div className={classes.data}>{representativeData}</div>
                        <div className={classes.data}>{detailData}</div>
                    </Container>
                </div>

                {studyDocuments.length > 0 && (
                    <>
                        <div className={classes.divider}>
                            <Container>Study Documents</Container>
                        </div>
                        <div className={classes.section}>
                            <Container className={classes.Container}>
                                <div className={`pullRight ${classes.buttonSection}`}>
                                    <a href={`${baseUrl}${GET_ALL_DOCUMENTS.replace('[studyID]', studyId)}`} download>
                                        <Button label="Download All" variant="primary" size="auto" handleClick={() => {}}></Button>
                                    </a>
                                </div>
                                <Table
                                    className={classes.tableContainer}
                                    tableRows={studyDocuments}
                                    tableHeaders={documentsTableColumns}
                                    ariaCaption="Study Documents Table"
                                    noHover
                                    responsive={false}
                                    modification="offWhite"
                                ></Table>
                            </Container>
                        </div>
                    </>
                )}

                <div className={classes.divider}>
                    <Container>Data Files</Container>
                </div>
                <div className={classes.section}>
                    <Container className={classes.Container}>
                        {rapidsLink && (
                            <>
                                <div className={`pullRight ${classes.buttonSection}`}>
                                    <Button
                                        className={classes.reqAccessBtn}
                                        label="How to Request Access"
                                        variant="primary"
                                        iconLeft={<InfoIcon />}
                                        size="auto"
                                        handleClick={() => setRequestAccessModalVisible(true)}
                                    ></Button>
                                </div>
                                <NoticeBox
                                    className={classes.noticeBox}
                                    body={
                                        <div>
                                            The data from this study is owned by the Digital Health Technologies (DHT) program which hosts
                                            its data on the RAPIDS platform. Open the "How to Request Access" modal to find the link to the
                                            corresponding study page in RAPIDS.
                                        </div>
                                    }
                                />
                            </>
                        )}
                        {!rapidsLink && studyDatasets.length === 0 && (
                            <NoticeBox
                                className={classes.noticeBox}
                                body={<div>This study currently has no data files. Please check back at a later date.</div>}
                            />
                        )}
                        {studyDatasets.length > 0 && (
                            <>
                                <div className={`pullRight ${classes.buttonSection}`}>
                                    <Button
                                        className={classes.reqAccessBtn}
                                        label="How to Request Access"
                                        variant="primary"
                                        iconLeft={<InfoIcon />}
                                        size="auto"
                                        handleClick={() => setRequestAccessModalVisible(true)}
                                    ></Button>
                                </div>
                                <div className={classes.datasetStats}>
                                    <div>
                                        <span>Total Files:</span> {totalFiles}
                                    </div>
                                    <div className={classes.fileStats}>
                                        <div>
                                            <span>Data Files:</span> {dataFiles}
                                        </div>
                                        <div>
                                            <span>Metadata Files:</span> {metaFiles}
                                        </div>
                                        <div>
                                            <span>Dictionary Files:</span> {dictFiles}
                                        </div>
                                    </div>
                                </div>
                                <Table
                                    className={classes.tableContainer}
                                    tableRows={studyDatasets}
                                    tableHeaders={datasetsTableColumns}
                                    ariaCaption="Study Datasets Table"
                                    noHover
                                    allowSort
                                    responsive={false}
                                    getRowCanExpand={() => true}
                                    renderSubComponent={renderSubComponent}
                                    modification="offWhite"
                                ></Table>
                            </>
                        )}
                    </Container>
                </div>
            </div>

            <RequestAccessModal
                visible={requestAccessModalVisible}
                closeModal={closeRequestAccessModal}
                rapidsLink={rapidsLink}
                dbGapLink={phsLink}
            />
            <MetadataVisualizerModal visible={metadataModalVisible} closeModal={closeMetadataModal} metadataFile={metadataFile} />
        </>
    );
};

StudyOverview.propTypes = {
    baseUrl: PropTypes.string,
    studyData: PropTypes.object,
    studyDatasets: PropTypes.array,
    studyDocuments: PropTypes.array,
    studyId: PropTypes.string,
};

export default StudyOverview;
