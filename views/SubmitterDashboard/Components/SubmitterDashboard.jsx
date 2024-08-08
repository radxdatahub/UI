/* eslint-disable multiline-ternary */
import React, { useState, useEffect } from 'react';
import Table from '../../../components/Table/Table';
import classes from '../SubmitterDashboard.module.scss';
import { Container, Row, Col } from 'react-bootstrap';
import Button from '../../../components/Button/Button';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Link from 'next/link';
import SftpModal from '../../DataIngest/Components/SftpModal';
import DeleteSubmissionModal from './DeleteSubmissionModal';
import _ from 'lodash';
import DownloadIcon from '../../../components/Images/svg/DownloadIcon';
import { DOWNLOAD_STUDY_UUIDS } from '../../../constants/apiRoutes';
import Cookies from 'js-cookie';
import { Plus } from 'react-bootstrap-icons';
import CollapsibleSideBar from '../../../components/CollapsibleSideBar/CollapsibleSideBar';
import Sidebar from '../../../components/Sidebar/Sidebar';
import Banner from '../../../components/Banner/Banner';

/**
 * Dashboard of all submissions for the user that is currently using the system
 * @param {Array(Object)} props - Object with all of the properties used within the react component, listed below.
 * @property {Array(Object)} submissionsData - Array of all submissions for the particular user
 * @property {String} baseUrl - The URL used to download
 * @property {String} fileUploadSOP - The URL for the File Upload SOP.
 * @returns {JSX} SubmitterDashboard component
 */

const SubmitterDashboard = (props) => {
    const { submissionsData, fileUploadSOP, baseUrl } = props;
    const [userSubmissions, setUserSubmissions] = useState(false);
    // set active state
    const defaultState = {
        label: 'in_progress',
        value: 'in_progress',
    };
    const [selectedItem, setSelectedItem] = useState(defaultState);

    const crumbs = [
        {
            page: 'Home',
            pageLink: '/',
            ariaLabel: 'home',
        },
        {
            page: 'Submitter Dashboard',
            pageLink: '/submitterDashboard',
            ariaLabel: 'submitter dashboard',
        },
    ];

    const [sidebarOpen, setSideBarOpen] = useState(true);
    const handleViewSidebar = () => {
        setSideBarOpen(!sidebarOpen);
    };

    const contentContainerClass = sidebarOpen ? classes.body : `${classes.body} ${classes.sidebarClosed}`;

    useEffect(() => {
        router.push(
            {
                pathname: router.pathname,
                query: { status: selectedItem.value },
            },
            undefined,
            { scroll: false }
        );
    }, [selectedItem, userSubmissions]);

    const menuItems = [
        {
            label: 'In Progress',
            value: 'in_progress',
        },
        {
            label: 'Submitted',
            value: 'submitted',
        },
        {
            label: 'Completed',
            value: 'completed',
        },
    ];

    const router = useRouter();

    const submitterDashColumns = [
        {
            accessorKey: 'id',
            cell: (info) => {
                if (_.startCase(info.row.original.status) === 'In Progress') {
                    return (
                        <Link href={`/dataIngest/${info.getValue()}`} legacyBehavior>
                            {info.getValue()}
                        </Link>
                    );
                } else {
                    return <span>{info.getValue()}</span>;
                }
            },
            header: 'ID',
            size: 80,
        },
        {
            accessorKey: 'studyName',
            cell: (info) => info.getValue(),
            header: 'Study',
            size: 300,
        },
        {
            accessorKey: 'status',
            cell: (info) => _.startCase(info.getValue()),
            header: 'Status',
            size: 150,
        },
        {
            accessorKey: 'createdDate',
            cell: (info) => (info.getValue() ? new Date(info.getValue()).toLocaleString() : '-'),
            header: 'Modified Date',
            size: 150,
        },
        {
            accessorKey: 'submittedDate',
            cell: (info) => (info.getValue() ? new Date(info.getValue()).toLocaleString() : '-'),
            header: 'Submitted Date',
            size: 150,
        },
        {
            accessorKey: '',
            cell: (info) => {
                if (_.startCase(info.row.original.status) === 'In Progress') {
                    return (
                        <DeleteSubmissionModal
                            submissionId={info.row.original.id}
                            userSubmissions={submissionsData}
                            setUserSubmissions={setUserSubmissions}
                        />
                    );
                } else {
                    return '-';
                }
            },
            header: 'Delete',
            size: 80,
        },
    ];

    return (
        <Row className={`${classes.container} ${classes.row}`}>
            <Banner title="Submitter Dashboard" manualCrumbs={crumbs} variant="virus1" ariaLabel="Submitter Dashboard Breadcrumb" />
            <CollapsibleSideBar
                isOpen={sidebarOpen}
                toggleSidebar={handleViewSidebar}
                title="Statuses"
                titleClassName={classes.sidebarTitle}
            >
                <Sidebar menuItems={menuItems} onSelectedMenuItem={setSelectedItem} selectedItem={selectedItem} />
            </CollapsibleSideBar>
            <Col lg={10} className={contentContainerClass}>
                <Row className={`${classes.buttonContainer} ${classes.row}`}>
                    <Col lg={8} md={12} className={classes.sftpGrouping}>
                        <a href={`${baseUrl}${DOWNLOAD_STUDY_UUIDS}${Cookies.get('chocolateChip')}`} download>
                            <Button
                                label="Download Study Keys"
                                ariaLabel="Download Study Key"
                                size="auto"
                                variant="secondary"
                                iconLeft={<DownloadIcon />}
                                handleClick={() => ({})}
                                className={classes.downloadStudySheet}
                            />
                        </a>
                        <SftpModal variant="multi" title="Multi Study sFTP Upload Notice" fileUploadSOP={fileUploadSOP} />
                    </Col>
                    <Col lg={4} md={12} className={classes.buttonGroup}>
                        <Button
                            label="New Submission"
                            ariaLabel="New submission"
                            size="auto"
                            variant="primary"
                            iconLeft={<Plus size={30} />}
                            handleClick={() => router.push('dataIngest/')}
                            className={classes.newSubmission}
                        />
                    </Col>
                </Row>
                <Row className={classes.row}>
                    <div className={classes.submitterContainer}>
                        {submissionsData.length > 0 ? (
                            <Table tableRows={submissionsData} tableHeaders={submitterDashColumns} ariaCaption="Submitter Dashboard" />
                        ) : (
                            <div className={classes.noSubmissions}>
                                You currently have no submission records in our system. Please click the 'New Submission' button above to
                                begin your submission.
                            </div>
                        )}
                    </div>
                </Row>
            </Col>
        </Row>
    );
};

SubmitterDashboard.propTypes = {
    baseUrl: PropTypes.string,
    fileUploadSOP: PropTypes.string.isRequired,
    submissionsData: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            studyName: PropTypes.string,
            status: PropTypes.string,
            createdDate: PropTypes.instanceOf(Date),
        })
    ),
};

export default SubmitterDashboard;
