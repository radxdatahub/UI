import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Button from '../../../components/Button/Button';
import ExternalIcon from '../../../components/Images/svg/ExternalIcon';
import DownloadIcon from '../../../components/Images/svg/DownloadIcon';
import classes from '../ResourceCenter.module.scss';
import { GET_RESOURCE_CENTER_BUCKET } from '../../../constants/apiRoutes';
import { sendGAEvent } from '@next/third-parties/google';

/**
 * For Submitters Resource Cards
 * @property {Object} router - Next router to be used for button handleClick functions
 * @returns {Array} Array of Objects for Card data
 */

const moreButtonClasses = `${classes.moreButton} ${classes.darkBlue}`;
const downloadButtonClasses = `${classes.downloadButton} ${classes.darkBlue}`;

export const forSubmittersCards = (router, baseUrl) => {
    return [
        {
            title: 'File Upload SOP',
            type: 'forSubmitters',
            children: (
                <>
                    <p>Read our guidelines for preparing datasets and associated documentation to deposit in the RADx Data Hub.</p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    <div className={classes.footerEnd}>
                        <a
                            href={`${baseUrl}${GET_RESOURCE_CENTER_BUCKET}RADx_Data_Hub-File_Upload_SOP.pdf`}
                            download
                            onClick={() =>
                                sendGAEvent('event', 'resourceCenter', {
                                    value: 'Download',
                                    file: 'RADx_Data_Hub-File_Upload_SOP.pdf',
                                })
                            }
                        >
                            <Button
                                className={downloadButtonClasses}
                                label="PDF (1.5MB)"
                                iconLeft={<DownloadIcon />}
                                variant="primary"
                                size="auto"
                                rounded="lite"
                            />
                        </a>
                    </div>
                </span>
            ),
        },
        {
            title: 'Study Registration SOP',
            type: 'forSubmitters',
            children: (
                <>
                    <p>
                        Learn how to register your study in the RADx Data Hub and make your research available to the COVID-19 research
                        community.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    <div className={classes.footerEnd}>
                        <a
                            href={`${baseUrl}${GET_RESOURCE_CENTER_BUCKET}RADx_Data_Hub-Study_Registration_SOP.pdf`}
                            download
                            onClick={() =>
                                sendGAEvent('event', 'resourceCenter', {
                                    value: 'Download',
                                    file: 'RADx_Data_Hub-Study_Registration_SOP.pdf',
                                })
                            }
                        >
                            <Button
                                className={downloadButtonClasses}
                                label="PDF (298KB)"
                                iconLeft={<DownloadIcon />}
                                variant="primary"
                                size="auto"
                                rounded="lite"
                            />
                        </a>
                    </div>
                </span>
            ),
        },
        {
            title: 'Global Codebook',
            type: 'forSubmitters',
            children: (
                <>
                    <p>
                        Ensure your data files comply with NIH data standards by viewing the Global Codebook, a data dictionary that oulines
                        the standards for the Tier 1 Common Data Elements (CDEs).
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    <div className={classes.footerEnd}>
                        <a
                            href={`${baseUrl}${GET_RESOURCE_CENTER_BUCKET}RADx_Data_Hub-Global_Codebook.xlsx`}
                            download
                            onClick={() =>
                                sendGAEvent('event', 'resourceCenter', {
                                    value: 'Download',
                                    file: 'RADx_Data_Hub-Global_Codebook.xlsx',
                                })
                            }
                        >
                            <Button
                                className={downloadButtonClasses}
                                label="XLSX (1.1MB)"
                                iconLeft={<DownloadIcon />}
                                variant="primary"
                                size="auto"
                                rounded="lite"
                            />
                        </a>
                    </div>
                </span>
            ),
        },
        {
            title: 'De-Identification Guidance',
            type: 'forSubmitters',
            children: (
                <>
                    <p>
                        Follow our De-Identification Guidance to correctly de-identify your data and ensure your data files pass the
                        system&apos;s validation checks during the file submission process.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    <div className={classes.footerEnd}>
                        <a
                            href={`${baseUrl}${GET_RESOURCE_CENTER_BUCKET}RADx_Data_Hub-DeIdentification_Guidance.pdf`}
                            download
                            onClick={() =>
                                sendGAEvent('event', 'resourceCenter', {
                                    value: 'Download',
                                    file: 'RADx_Data_Hub-DeIdentification_Guidance.pdf',
                                })
                            }
                        >
                            <Button
                                className={downloadButtonClasses}
                                label="PDF (176KB)"
                                iconLeft={<DownloadIcon />}
                                variant="primary"
                                size="auto"
                                rounded="lite"
                            />
                        </a>
                    </div>
                </span>
            ),
        },
        {
            title: 'De-Identification Webinar',
            type: 'forSubmitters',
            children: (
                <>
                    <p>Listen to our experts talk about best practices for data de-identification.</p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    <Link href="https://www.youtube.com/watch?v=Ivo55f_DZ1E&ab_channel=NIHRADxDataHub">
                        <Button
                            className={moreButtonClasses}
                            label="More"
                            variant="primary"
                            iconRight={<ExternalIcon />}
                            size="auto"
                            rounded="lite"
                        />
                    </Link>
                </span>
            ),
        },
        {
            title: 'Webinar - Making Datasets Findable and Accessible',
            type: 'forSubmitters',
            children: (
                <>
                    <p>
                        Listen to our experts discuss how to make datasets more findable and accessible by using things like Digitable
                        Object Identifiers (DOI), Compact URIs (CURIEs), and other identifiers.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    <Link href="https://www.youtube.com/watch?v=ds5sUex0Qy8&ab_channel=NIHRADxDataHub">
                        <Button
                            className={moreButtonClasses}
                            label="More"
                            variant="primary"
                            iconRight={<ExternalIcon />}
                            size="auto"
                            rounded="lite"
                        />
                    </Link>
                </span>
            ),
        },
        // {
        //     title: 'File Organization in the RADx Data Hub',
        //     children: (
        //         <>
        //             <p>Understand the relationships between different file types and how they are organized within the RADx Data Hub.</p>
        //         </>
        //     ),
        //     footer: (
        //         <span className={classes.resourceCardFooter}>
        //             <div className={classes.footerEnd}>
        //                 <a href={``} download>
        //                     <Button
        //                         className={downloadButtonClasses}
        //                         label="PDF (-1KB)"
        //                         iconLeft={<DownloadIcon />}
        //                         variant="primary"
        //                         size="auto"
        //                         rounded="lite"
        //                     />
        //                 </a>
        //             </div>
        //         </span>
        //     ),
        // },
        {
            title: 'Data File Naming Convention Guidance',
            type: 'forSubmitters',
            children: (
                <>
                    <p>
                        Learn about the types of data files, their naming conventions, and content rules when preparing data files to be
                        submitted to the RADx Data Hub
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    <div className={classes.footerEnd}>
                        <a
                            href={`${baseUrl}${GET_RESOURCE_CENTER_BUCKET}RADx_Data_Hub-Data_File_Naming_Convention_Guidance.pdf`}
                            download
                            onClick={() =>
                                sendGAEvent('event', 'resourceCenter', {
                                    value: 'Download',
                                    file: 'RADx_Data_Hub-Data_File_Naming_Convention_Guidance.pdf',
                                })
                            }
                        >
                            <Button
                                className={downloadButtonClasses}
                                label="PDF (150KB)"
                                iconLeft={<DownloadIcon />}
                                variant="primary"
                                size="auto"
                                rounded="lite"
                            />
                        </a>
                    </div>
                </span>
            ),
        },
    ];
};

forSubmittersCards.PropTypes = {
    router: PropTypes.object,
};
