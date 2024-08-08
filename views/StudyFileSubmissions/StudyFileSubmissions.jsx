/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/router';
import classes from './StudyFileSubmissions.module.scss';
import Banner from '../../components/Banner/Banner';
import Table from '../../components/Table/Table';
import { submissionsTableColumns } from './constants';
import Sidebar from '../../components/Sidebar/Sidebar';
import CollapsibleSideBar from '../../components/CollapsibleSideBar/CollapsibleSideBar';

/**
 * View for the Study File Submission Dashboard
 *
 * @property {Array} studyFileSubmissios - list of study file submissions
 * @returns {Node} object rendering the Study File Submission Dashboard
 */

const StudyFileSubmissions = (props) => {
    const { studyFileSubmissions } = props;
    const router = useRouter();

    // set active state
    const defaultState = {
        label: 'in_progress',
        value: 'in_progress',
    };
    const [selectedItem, setSelectedItem] = useState(defaultState);

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
    }, [selectedItem]);

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

    return (
        <>
            <Banner
                title="Study File Submissions"
                path={router.asPath}
                variant="virus4"
                ariaLabel="Study File Submissions"
                topic="Studies"
            />
            <Row className={classes.row}>
                <CollapsibleSideBar
                    isOpen={sidebarOpen}
                    toggleSidebar={handleViewSidebar}
                    title="Statuses"
                    titleClassName={classes.sidebarTitle}
                >
                    <Sidebar menuItems={menuItems} onSelectedMenuItem={setSelectedItem} selectedItem={selectedItem} />
                </CollapsibleSideBar>
                <Col lg={10} className={contentContainerClass}>
                    <Table
                        className={classes.tableContainer}
                        tableRows={studyFileSubmissions}
                        tableHeaders={submissionsTableColumns}
                        ariaCaption="Study File Submissions Table"
                        noHover
                        responsive={false}
                    ></Table>
                </Col>
            </Row>
        </>
    );
};

StudyFileSubmissions.propTypes = {
    studyFileSubmissions: PropTypes.array,
};

export default StudyFileSubmissions;
