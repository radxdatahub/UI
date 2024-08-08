import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Banner from '../../components/Banner/Banner';
import classes from './InternalDashboard.module.scss';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import bannerImage from '../../public/images/banner4.jpeg';
import Button from '../../components/Button/Button';
import Table from '../../components/Table/Table';
import { allSupportTracker } from './Columns';
import DownloadIcon from '../../components/Images/svg/DownloadIcon';

const InternalDashboard = (props) => {
    const { getSupportTracker, downloadCSV } = props;
    const { user } = useSelector((state) => state.userProfile);

    const crumbs = [
        {
            page: 'Home',
            pageLink: '/',
            ariaLabel: 'home',
        },
        {
            page: 'Support Dashboard',
        },
    ];

    return (
        <>
            <Banner title="Support Dashboard" manualCrumbs={crumbs} variant="virus4" ariaLabel="Support Dashboard" />
            <Row className={classes.container}>
                <Col lg="12" className="px-0">
                    <div className={`${classes.rowContainer}`}>
                        <a href={downloadCSV.replace('[sessionID]', user?.sessionID)} target="_blank" rel="noopener noreferrer">
                            <Button variant="secondary" label="Download CSV" className={`${classes.button}`} iconLeft={<DownloadIcon />} />
                        </a>
                    </div>
                    <Table
                        tableRows={getSupportTracker}
                        tableHeaders={allSupportTracker}
                        className={classes.tableContainer}
                        ariaCaption="Support Tracker View"
                        responsive={false}
                        allowSort={true}
                    />
                </Col>
            </Row>
        </>
    );
};

InternalDashboard.propTypes = {
    getSupportTracker: PropTypes.arrayOf(PropTypes.string),
};

export default InternalDashboard;
