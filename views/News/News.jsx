/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from 'react-bootstrap';
import classes from './News.module.scss';
import Banner from '../../components/Banner/Banner';
import { useRouter } from 'next/router';
import Link from 'next/link';
import parse from 'html-react-parser';
import { regexReplace } from '../../lib/componentHelpers/ResourcePages/regexReplace';

/**
 * View for the News Page
 * @property {Array<Object>} news - List of all news
 * @returns {Node} object rendering news
 */

const News = (props) => {
    const { news } = props;
    const router = useRouter();

    const renderedNews = news.map((item) => {
        return (
            <div key={item.title} className={classes.section}>
                <h5>
                    <Link href={`news/${item.slug}`} legacyBehavior>
                        {item.title}
                    </Link>
                </h5>
                <hr className={classes.separator} />
                <div>{parse(regexReplace(item.description, item.links))}</div>
            </div>
        );
    });

    return (
        <>
            <Banner title="News" path={router.asPath} variant="virus4" ariaLabel="News Breadcrumb" />

            <Container className={classes.Container}>
                <Row className={`${classes.Row} whiteTextBackground`}>{renderedNews}</Row>
            </Container>
        </>
    );
};

News.propTypes = {
    news: PropTypes.array,
};

export default News;
