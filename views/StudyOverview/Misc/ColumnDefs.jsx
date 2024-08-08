/* eslint-disable multiline-ternary */
import PropTypes from 'prop-types';
import classes from '../StudyOverview.module.scss';
import DownloadIcon from '../../../components/Images/svg/DownloadIcon';
import Tooltip from '../../../components/Tooltip/Tooltip';
import Button from '../../../components/Button/Button';
import ChevronDownIcon from '../../../components/Images/svg/ChevronDownIcon';
import EyeballIcon from '../../../components/Images/svg/EyeballIcon';
import { getFileSize } from '../../../lib/componentHelpers/TableFunctions/getFileSize';
import { GET_DOCUMENT, GET_META_DICT_FILE, GET_METADATA } from '../../../constants/apiRoutes';

/**
 * Study Overview Study Documents Table Column Definitions
 * @property {String} studyId - ID of study
 * @property {String} baseUrl - base url for download link
 * @returns {Array} Table column array for Tanstack React tables
 */

// STUDY DOCUMENTS TABLE
export const documentsTable = (studyId, baseUrl) => {
    return [
        {
            id: 'document',
            accessorKey: 'document',
            cell: (info) => info.getValue(),
            header: 'Document',
            alignLeft: true,
        },
        {
            id: 'documentName',
            accessorKey: 'documentName',
            cell: (info) => info.getValue(),
            header: 'Document Name',
            alignLeft: true,
        },
        {
            id: 'documentSize',
            accessorKey: 'documentSize',
            cell: (info) => {
                const val = info.getValue();
                return getFileSize(val, 0);
            },
            header: 'File Size',
        },
        {
            id: 'id',
            accessorKey: 'id',
            cell: (info) => {
                const fileId = info.getValue();
                return (
                    <Tooltip id="downloadTooltip" title="Download Document">
                        <a href={`${baseUrl}${GET_DOCUMENT.replace('[fileID]', fileId).replace('[studyID]', studyId)}`} download>
                            <Button
                                className={classes.downloadIcon}
                                ariaLabel="Download Document"
                                variant="icon"
                                iconCenter={<DownloadIcon width="30" height="30" />}
                                size="icon"
                                handleClick={() => {}}
                            ></Button>
                        </a>
                    </Tooltip>
                );
            },
            header: 'Download',
        },
    ];
};

documentsTable.PropTypes = {
    studyId: PropTypes.string,
};

/**
 * Study Overview Study Datasets Table Column Definitions
 * @property {String} baseUrl - base url for download link
 * @property {Function} setMetadataModalVisible - function to open metadata visualizer modal
 * @property {Function} setMetadataFile - function to set metadata file for metadata visualizer modal
 * @property {Function} restGet - bring in hook to get metadata file content for metadata viewer
 * @returns {Array} Table column array for Tanstack React tables
 */

// STUDY DATASETS TABLE
export const datasetsTable = (baseUrl, setMetadataModalVisible, setMetadataFile, restGet) => {
    return [
        {
            id: 'sourceFileName',
            accessorKey: 'sourceFileName',
            cell: (info) => info.getValue(),
            header: 'File Name',
            alignLeft: true,
            size: 250,
        },
        {
            id: 'category',
            accessorKey: 'category',
            cell: (info) => info.getValue(),
            header: 'File Type',
            size: 160,
        },
        {
            id: 'fileFormat',
            accessorKey: 'fileFormat',
            cell: (info) => info.getValue(),
            header: 'File Format(s)',
            size: 130,
        },
        {
            id: 'sampleSize',
            accessorKey: 'sampleSize',
            cell: (info) => {
                return info.getValue() ? info.getValue() : 0;
            },
            header: '# of Records',
            size: 120,
        },
        {
            id: 'totalVariables',
            accessorKey: 'totalVariables',
            header: '# of Variables',
            cell: ({ row }) => {
                return row.getCanExpand() && row.original.totalVariables ? (
                    <Button
                        className={row.getIsExpanded() ? `${classes.variablesButton} ${classes.expanded}` : `${classes.variablesButton}`}
                        label={row.original.totalVariables.toString()}
                        ariaLabel={row.getIsExpanded() ? 'Hide Variables Table' : 'View Variables Table'}
                        iconRight={<ChevronDownIcon />}
                        variant="primary"
                        size="auto"
                        handleClick={row.getToggleExpandedHandler()}
                    ></Button>
                ) : (
                    0
                );
            },
            size: 130,
        },
        {
            id: 'metadataFileId',
            accessorKey: 'metadataFileId',
            cell: (info) => {
                const fileId = info.getValue();
                const fileExtension = info.row.original.metadataFileName?.split('.')[1];
                const fileSize = getFileSize(info.row.original.metadataFileSize, 0);
                let metadataFile, metadataViewerIcon, downloadIcon;

                const getMeta = async () => {
                    const metaResponse = await restGet(`${GET_METADATA}${fileId}`, {
                        showLoading: true,
                        errorMessage: 'Error with viewing metadata file',
                    });
                    if (metaResponse.status === 200) {
                        metadataFile = metaResponse.data.data;
                        setMetadataModalVisible(true);
                        setMetadataFile(metadataFile);
                    }
                };

                if (fileExtension == 'json') {
                    metadataViewerIcon = (
                        <Tooltip id="downloadTooltip" title={`Visualize Metadata File`}>
                            <a>
                                <Button
                                    className={classes.eyeball}
                                    ariaLabel={`Visualize Metadata File`}
                                    variant="icon"
                                    iconCenter={<EyeballIcon />}
                                    size="icon"
                                    handleClick={() => {
                                        getMeta();
                                    }}
                                ></Button>
                            </a>
                        </Tooltip>
                    );
                }
                if (fileId) {
                    downloadIcon = (
                        <Tooltip id="downloadTooltip" title={`Download Metadata File (${fileSize})`}>
                            <a href={`${baseUrl}${GET_META_DICT_FILE}${fileId}`} download>
                                <Button
                                    className={classes.downloadIcon}
                                    ariaLabel={`Download Metadata File (${fileSize})`}
                                    variant="icon"
                                    iconCenter={<DownloadIcon width="30" height="30" />}
                                    size="icon"
                                ></Button>
                            </a>
                        </Tooltip>
                    );
                }

                return (
                    <>
                        {metadataViewerIcon}
                        {downloadIcon}
                        {!metadataViewerIcon && !downloadIcon && <p aria-label="No metadata file"></p>}
                    </>
                );
            },
            header: 'Metadata',
            size: 140,
        },
        {
            id: 'dictionaryFileId',
            accessorKey: 'dictionaryFileId',
            cell: (info) => {
                const fileId = info.getValue();
                const fileSize = getFileSize(info.row.original.dictionaryFileSize, 0);
                if (fileId) {
                    return (
                        <Tooltip id="downloadTooltip" title={`Download Dictionary File (${fileSize})`}>
                            <a href={`${baseUrl}${GET_META_DICT_FILE}${fileId}`} download>
                                <Button
                                    className={classes.downloadIcon}
                                    ariaLabel={`Download Dictionary File (${fileSize})`}
                                    variant="icon"
                                    iconCenter={<DownloadIcon width="30" height="30" />}
                                    size="icon"
                                ></Button>
                            </a>
                        </Tooltip>
                    );
                } else {
                    return <p aria-label="No dictionary file"></p>;
                }
            },
            header: 'Dictionary',
            size: 145,
        },
    ];
};

datasetsTable.PropTypes = {
    baseUrl: PropTypes.string,
    setMetadataFile: PropTypes.func,
    setMetadataModalVisible: PropTypes.func,
};

// Variables Sub Table
export const variablesSubTable = [
    {
        id: 'dataVariables',
        accessorKey: 'dataVariables',
        header: 'Variable Names',
        cell: (info) => info.getValue().replace(/,/g, ', ').replace(/;/g, ', '),
        removeSort: true,
        alignLeft: true,
    },
];
