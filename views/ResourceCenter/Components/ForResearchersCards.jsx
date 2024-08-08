import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Button from '../../../components/Button/Button';
import DownloadIcon from '../../../components/Images/svg/DownloadIcon';
import classes from '../ResourceCenter.module.scss';
import { GET_RESOURCE_CENTER_BUCKET } from '../../../constants/apiRoutes';
import { sendGAEvent } from '@next/third-parties/google';

/**
 * For Researcher Resource Cards
 * @property {Object} router - Next router to be used for button handleClick functions
 * @returns {Array} Array of Objects for Card data
 */

const moreButtonClasses = `${classes.moreButton} ${classes.teal}`;
const downloadButtonClasses = `${classes.downloadButton} ${classes.teal}`;

export const forResearchersCards = (router, baseUrl) => {
    return [
        {
            title: 'Data Access Request Quick Start Guide',
            type: 'forResearchers',
            children: (
                <>
                    <p>
                        Read this one-pager on the key steps you will need to follow to gain access to studies in dbGaP. Note: You must gain
                        access to studies in dbGaP before being able to transfer data files into your workbench instance.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    <div className={classes.footerEnd}>
                        <a
                            href={`${baseUrl}${GET_RESOURCE_CENTER_BUCKET}Quick_Start-Accessing_RADx_Data_in_the_RADx_Data_Hub_2024.pdf`}
                            download
                            onClick={() =>
                                sendGAEvent('event', 'resourceCenter', {
                                    value: 'Download',
                                    file: 'Quick_Start-Accessing_RADx_Data_in_the_RADx_Data_Hub_2024.pdf',
                                })
                            }
                        >
                            <Button
                                className={downloadButtonClasses}
                                label="PDF (118KB)"
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
            title: 'How to Request Access in dbGaP',
            type: 'forResearchers',
            children: (
                <>
                    <p>
                        Learn how to request study-level access to data files in dbGaP. Once you gain access to data files, you can use the
                        &quot;Approved Data&quot; and &quot;Analytics Workbench&quot; features.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    <a
                        href="https://sharing.nih.gov/accessing-data/accessing-genomic-data/how-to-request-and-access-datasets-from-dbgap"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Button className={moreButtonClasses} label="More" variant="primary" size="auto" rounded="lite" />
                    </a>
                </span>
            ),
        },
        {
            title: 'User Tutorial',
            type: 'forResearchers',
            children: (
                <>
                    <p>
                        Learn how to make the most of the RADx Data Hub by reading our User Tutorial. The tutorial covers key activities for
                        researchers, such as searching for studies, requesting access to data, and more.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    <Link href="/tutorial">
                        <Button className={moreButtonClasses} label="More" variant="primary" size="auto" rounded="lite" />
                    </Link>
                    <a
                        href={`${baseUrl}${GET_RESOURCE_CENTER_BUCKET}RADx_Data_Hub-User_Guide.pdf`}
                        download
                        onClick={() =>
                            sendGAEvent('event', 'resourceCenter', {
                                value: 'Download',
                                file: 'RADx_Data_Hub-User_Guide.pdf',
                            })
                        }
                    >
                        <Button
                            className={downloadButtonClasses}
                            label="PDF (3.2MB)"
                            iconLeft={<DownloadIcon />}
                            variant="primary"
                            size="auto"
                            rounded="lite"
                        />
                    </a>
                </span>
            ),
        },
        {
            title: 'RADx Data Hub Data Use Agreement',
            type: 'forResearchers',
            children: (
                <>
                    <p>Take a look at the RADx Data Use Agreement to understand how data should be handled when using the RADx Data Hub.</p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    <div className={classes.footerEnd}>
                        <a
                            href={`${baseUrl}${GET_RESOURCE_CENTER_BUCKET}RADx_Data_Hub-Data_Use_Agreement.pdf`}
                            download
                            onClick={() =>
                                sendGAEvent('event', 'resourceCenter', {
                                    value: 'Download',
                                    file: 'RADx_Data_Hub-Data_Use_Agreement.pdf',
                                })
                            }
                        >
                            <Button
                                className={downloadButtonClasses}
                                label="PDF (439KB)"
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
            title: 'Best Practices for Computer Security and Data Control',
            type: 'forResearchers',
            children: (
                <>
                    <p>
                        Learn about NIH&apos;s expectations for the management and protection of NIH controlled access data transferred to
                        and maintained by institutions whether in their own institutional data storage systems or in cloud computing
                        systems.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    <a
                        href={`https://sharing.nih.gov/sites/default/files/flmngr/NIH_Best_Practices_for_Controlled-Access_Data_Subject_to_the_NIH_GDS_Policy.pdf`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Button className={moreButtonClasses} label="More" variant="primary" size="auto" rounded="lite" />
                    </a>
                </span>
            ),
        },
        {
            title: 'Workbench Tutorial',
            type: 'forResearchers',
            children: (
                <>
                    <p>Learn how to take advantage of the various tools for performing analyses on the Analytics Workbench platform.</p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    <Link href="/workbenchTutorial">
                        <Button className={moreButtonClasses} label="More" variant="primary" size="auto" rounded="lite" />
                    </Link>
                    <a
                        href={`${baseUrl}${GET_RESOURCE_CENTER_BUCKET}RADx_Data_Hub-Workbench_User_Guide.pdf`}
                        download
                        onClick={() =>
                            sendGAEvent('event', 'resourceCenter', {
                                value: 'Download',
                                file: 'RADx_Data_Hub-Workbench_User_Guide.pdf',
                            })
                        }
                    >
                        <Button
                            className={downloadButtonClasses}
                            label="PDF (553KB)"
                            iconLeft={<DownloadIcon />}
                            variant="primary"
                            size="auto"
                            rounded="lite"
                        />
                    </a>
                </span>
            ),
        },
        {
            title: 'Workbench Terms of Service',
            type: 'forResearchers',
            children: (
                <>
                    <p>
                        Read our Workbench Terms of Service outlining terms and conditions you must comply with when using the Analytics
                        Workbench platform.
                    </p>
                </>
            ),
            footer: (
                <span className={classes.resourceCardFooter}>
                    <div className={classes.footerEnd}>
                        <a
                            href={`${baseUrl}${GET_RESOURCE_CENTER_BUCKET}RADx_Data_Hub-Workbench_Term_of_Service.pdf`}
                            download
                            onClick={() =>
                                sendGAEvent('event', 'resourceCenter', {
                                    value: 'Download',
                                    file: 'RADx_Data_Hub-Workbench_Term_of_Service.pdf',
                                })
                            }
                        >
                            <Button
                                className={downloadButtonClasses}
                                label="PDF (792KB)"
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

forResearchersCards.PropTypes = {
    router: PropTypes.object,
};
