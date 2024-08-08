/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from 'react-bootstrap';
import classes from './FundingOpportunities.module.scss';
import Banner from '../../components/Banner/Banner';
import { useRouter } from 'next/router';
import Link from 'next/link';
import parse from 'html-react-parser';
import { regexReplace } from '../../lib/componentHelpers/ResourcePages/regexReplace';

/**
 * View for the Funding Opportunities Page
 * @property {Array<Object>} fundingOpportunities - List of all funding opportunities
 * @returns {Node} object rendering funding opportunities
 */

const FundingOpportunities = (props) => {
    const { fundingOpportunities } = props;
    const router = useRouter();

    const renderedFunding = fundingOpportunities.map((item) => {
        return (
            <div key={item.title} className={classes.section}>
                <h5 id={item.slug}>{item.title}</h5>
                <hr className={classes.separator} />
                <div>{parse(regexReplace(item.description, item.links))}</div>
            </div>
        );
    });

    return (
        <>
            <Banner title="Funding Opportunities" path={router.asPath} variant="virus4" ariaLabel="Funding Opportunities Breadcrumb" />

            <Container className={classes.Container}>
                <Row className={`${classes.Row} whiteTextBackground`}>{renderedFunding}</Row>
            </Container>
        </>
    );
};

FundingOpportunities.propTypes = {
    fundingOpportunities: PropTypes.array,
};

export default FundingOpportunities;
