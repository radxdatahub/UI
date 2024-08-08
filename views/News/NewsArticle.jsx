/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from 'react-bootstrap';
import classes from './News.module.scss';
import Banner from '../../components/Banner/Banner';
import Link from 'next/link';
import parse from 'html-react-parser';
import { regexReplace } from '../../lib/componentHelpers/ResourcePages/regexReplace';

/**
 * View for the News Article Page
 * @property {Object} newsArticleData - data for the news article
 * @returns {Node} object rendering News Article
 */

const NewsArticle = (props) => {
    const { newsArticleData } = props;

    const crumbs = [
        {
            page: 'Home',
            pageLink: '/',
            ariaLabel: 'home',
        },
        {
            page: 'News',
            pageLink: '/news',
            ariaLabel: 'news',
        },
        {
            page: newsArticleData.title,
        },
    ];

    return (
        <>
            <Banner
                title={newsArticleData.title ? newsArticleData.title : 'Page Not Found'}
                manualCrumbs={crumbs}
                variant="virus4"
                ariaLabel="News Article Breadcrumb"
            />

            <Container className={classes.Container}>
                <Row className={`${classes.Row} whiteTextBackground`}>
                    {Object.keys(newsArticleData).length > 0 && (
                        <div key={newsArticleData.title} className={classes.section}>
                            <div>{parse(regexReplace(newsArticleData.description, newsArticleData.links))}</div>
                        </div>
                    )}
                    {Object.keys(newsArticleData).length === 0 && (
                        <div>
                            Sorry, we can’t find the page you’re looking for. Please contact the{' '}
                            <Link href={`/support`} legacyBehavior>
                                RADx Data Hub Support Team.
                            </Link>
                        </div>
                    )}
                </Row>
            </Container>
        </>
    );
};

NewsArticle.propTypes = {
    newsArticleData: PropTypes.object,
};

export default NewsArticle;
