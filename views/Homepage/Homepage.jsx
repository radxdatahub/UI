/* eslint-disable max-len */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import Card from '../../components/Card/Card';
import classes from './Homepage.module.scss';
import Button from '../../components/Button/Button';
import SearchBar from '../../components/SearchComponents/SearchBar/SearchBar';
import Link from 'next/link';
import ChevronRightIcon from '../../components/Images/svg/ChevronRightIcon';
import ExternalLinkIcon from '../../components/ExternalLinkIcon/ExternalLinkIcon';
import NewStudiesIcon from '../../components/Images/svg/NewStudiesIcon';
import NewFilesIcon from '../../components/Images/svg/NewFilesIcon';
import UpdatedFilesIcon from '../../components/Images/svg/UpdatedFilesIcon';
import RADxUpStatIcon from '../../components/Images/svg/RADxUpStatIcon';
import RADxRadStatIcon from '../../components/Images/svg/RADxRadStatIcon';
import RADxTechStatIcon from '../../components/Images/svg/RADxTechStatIcon';
import RADxDHTStatIcon from '../../components/Images/svg/RADxDHTStatIcon';
import { getTypeIcon } from '../../lib/componentHelpers/EventsFunctions/getTypeIcon';
import { useRouter } from 'next/router';
import parse from 'html-react-parser';
import { ParallaxBanner } from 'react-scroll-parallax';
import { regexReplace } from '../../lib/componentHelpers/ResourcePages/regexReplace';
import { getStudyLabel } from '../../lib/utils/getStudyLabel';
import { buildSearchQuery } from '../../lib/utils/searchQueryBuilder';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../store/notifications/notificationsSlice';
import { BaseNotification, NotificationType, ErrorMessage } from '../../store/notifications/notificationConstants';
import { useSearchParams } from 'next/navigation';
import { sendGAEvent } from '@next/third-parties/google';

/**
 * View for the Homepage
 * @property {Array<Object>} funding - List of upcoming funding opportunities
 * @property {Array<Object>} news - List of latest news
 * @property {Array<Object>} events - List of upcoming events
 * @property {Object} stats - Statistics to show for hub and each DCC
 * @property {Object} contentUpdates - Lists of content updates for new studies, files, and updated files
 * @returns {Node} object rendering the Homepage
 */

const Homepage = (props) => {
    const { funding, news, events, stats, contentUpdates } = props;
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch();

    // Show toast for error redirect
    const errorRedirect = searchParams.get('e');

    if (errorRedirect) {
        const tempNotification = { ...BaseNotification };
        tempNotification.autoHide = false;
        tempNotification.type = NotificationType.ERROR;
        tempNotification.delay = 8000;
        tempNotification.message = ErrorMessage[errorRedirect];
        dispatch(addNotification(tempNotification));
    }

    // Search Bar
    const [query, setQuery] = useState('');

    const handleSearch = (query) => {
        sendGAEvent('event', 'homePage', { value: 'Home Page Search Made', query: JSON.stringify(query) });
        const searchQuery = buildSearchQuery({ query, pagination: { size: 50, page: 1 } });
        router.push(`/studyExplorer?${searchQuery}`);
    };

    // STATS

    const getStat = (dcc) => {
        return stats.dtos.find((obj) => {
            return obj.name === dcc;
        });
    };

    const up = getStat('RADx-UP');
    const rad = getStat('RADx-rad');
    const tech = getStat('RADx Tech');
    const dht = getStat('RADx DHT');

    // FUNDING, NEWS, EVENTS

    const renderedFunding = funding.map((item) => {
        return (
            <div key={item.title}>
                <h6>
                    <Link href={`fundingOpportunities#${item.slug}`} legacyBehavior>
                        {item.title}
                    </Link>
                </h6>
                <div>{parse(regexReplace(item.description, item.links))}</div>
            </div>
        );
    });

    const renderedNews = news.map((item) => {
        return (
            <div key={item.title}>
                <h6>
                    <Link href={`news/${item.slug}`} legacyBehavior>
                        {item.title}
                    </Link>
                </h6>
                <div>{parse(regexReplace(item.description, item.links))}</div>
            </div>
        );
    });

    const renderedEvents = events.map((item) => {
        const date = format(new Date(item.eventDate), 'Pp');

        return (
            <div key={item.title} className={classes.event}>
                <h6>
                    <Link href={`events#${item.slug}`} legacyBehavior>
                        <a>
                            {getTypeIcon(item.type, '23', '20', '#a8e7ff')}
                            {item.title}
                        </a>
                    </Link>{' '}
                    | {date} ET
                </h6>
                <div>{parse(regexReplace(item.description, item.links))}</div>
            </div>
        );
    });

    // CONTENT UPDATES

    const newStudies = contentUpdates.newStudies;
    const newFiles = contentUpdates.newFiles;
    const updatedFiles = contentUpdates.updatedFiles;

    // get number of categories that have a non-empty list
    const numOfContentCategories = Object.values(contentUpdates).filter((v) => v.length > 0).length;

    const renderedRegisteredStudies = (list) => {
        return list.map((study) => {
            return (
                <li key={`${study.studyName}-${study.studyId}`}>
                    <div>
                        {study.dcc} | {study.date}
                    </div>
                    <Link href={`/study/${study.studyId}`} legacyBehavior>
                        {study.studyName}
                    </Link>
                </li>
            );
        });
    };

    const renderedNewOrUpdatedFiles = (list) => {
        return list.map((study) => {
            let fileStr = 'files';
            if (study.files === 1) {
                fileStr = 'file';
            }
            return (
                <li key={`${study.studyName}${study.date}`}>
                    <div>
                        {study.dcc} | {study.date} |{' '}
                        <span className={classes.lightTeal}>
                            {study.files} New {fileStr}
                        </span>
                    </div>
                    <Link href={`/study/${study.studyId}`} legacyBehavior>
                        {study.studyName}
                    </Link>
                </li>
            );
        });
    };

    return (
        <>
            <ParallaxBanner layers={[{ image: '/images/Homepage_Hero_Img.jpeg', speed: -30 }]} className={`${classes.heroParallax}`}>
                <div className={classes.heroContent}>
                    <div className={classes.heroText}>
                        <h1>
                            RADx<span className={classes.registered}>®</span> Data Hub
                        </h1>
                        <div>
                            The NIH Rapid Acceleration of Diagnostics Data Hub (RADx Data Hub) is a centralized data repository that
                            provides access to analytic tools and de-identified COVID-19 data from the RADx Initiative. The RADx Data Hub
                            supports scientific efforts to better understand COVID-19 and factors associated with disparities in morbidity
                            and mortality in underserved and vulnerable populations, by allowing researchers to discover, access, and
                            perform analyses of COVID-19 datasets in a cloud-enabled platform.
                        </div>
                    </div>
                    <div className={classes.searchBarContainer}>
                        <div className={classes.searchBar}>
                            <SearchBar topic="Studies" query={query} setQuery={setQuery} handleClick={handleSearch} homePage={true} />
                        </div>
                    </div>
                </div>
            </ParallaxBanner>

            <Container className={classes.Container}>
                <Row className={classes.blogCards}>
                    <Col lg={4} md={12} className={classes.blogCardContainer}>
                        <Link href="/about">
                            <Card
                                cardClassOverride={classes.blogCard}
                                title="About the RADx Data Hub"
                                subtitle="Learn more about the RADx Data Hub"
                                footer={
                                    <div>
                                        Read More <ChevronRightIcon />
                                    </div>
                                }
                                variant="blog"
                                image={{
                                    src: '/images/about_collage.png',
                                    alt: 'This is a caption for the Image',
                                    width: '320px',
                                    height: '170px',
                                }}
                            />
                        </Link>
                    </Col>
                    <Col lg={4} md={12} className={classes.blogCardContainer}>
                        <Link href="/tutorial">
                            <Card
                                cardClassOverride={classes.blogCard}
                                title="User Tutorial"
                                subtitle="For those who are new to the RADx Data Hub, we highly recommend taking a moment to explore the comprehensive RADx Data Hub Tutorial"
                                footer={
                                    <div>
                                        Read More <ChevronRightIcon />
                                    </div>
                                }
                                variant="blog"
                                image={{
                                    src: '/images/New_RADx_Img.jpeg',
                                    alt: 'This is a caption for the Image',
                                    width: '320px',
                                    height: '170px',
                                }}
                            />
                        </Link>
                    </Col>
                    <Col lg={4} md={12} className={classes.blogCardContainer}>
                        <Link href="/faq">
                            <Card
                                cardClassOverride={classes.blogCard}
                                title="Frequently Asked Questions (FAQ)"
                                subtitle="Browse the collection of answers to frequently asked questions about the RADx Data Hub"
                                footer={
                                    <div>
                                        Read More <ChevronRightIcon />
                                    </div>
                                }
                                variant="blog"
                                image={{
                                    src: '/images/FAQ_Img.jpeg',
                                    alt: 'This is a caption for the Image',
                                    width: '320px',
                                    height: '170px',
                                }}
                            />
                        </Link>
                    </Col>
                </Row>
                <Row className={classes.Row}>
                    <Col md={12} lg={5}>
                        <Card
                            cardClassOverride={classes.infoCard}
                            title="Funding Opportunities"
                            footer={
                                <Link href="/fundingOpportunities">
                                    <Button label="View All" variant="homepage" size="auto" iconRight={<ChevronRightIcon />} />
                                </Link>
                            }
                            headerImg="/images/med2.png"
                            variant="info"
                            bodyHeight="170px"
                            scroll={true}
                        >
                            {funding.length === 0 && (
                                <div className={classes.noContentContainer}>
                                    <div className={`${classes.noContent} ${classes.lightBox}`}>
                                        There are currently no available funding opportunities.
                                    </div>
                                </div>
                            )}
                            {renderedFunding}
                        </Card>
                    </Col>
                    <Col md={12} lg={7}>
                        <Card
                            cardClassOverride={classes.infoCard}
                            title="Save the Date"
                            footer={
                                <Link href="/events">
                                    <Button
                                        label="View All"
                                        variant="homepage"
                                        modification="whiteText"
                                        size="auto"
                                        iconRight={<ChevronRightIcon />}
                                    />
                                </Link>
                            }
                            headerImg="/images/sml1.png"
                            modification="colored"
                            bkgdColor="#003E70"
                            variant="info"
                            bodyHeight="170px"
                            scroll={true}
                        >
                            {events.length === 0 && (
                                <div className={classes.noContentContainer}>
                                    <div className={`${classes.noContent} ${classes.darkBox}`}>
                                        There are currently no upcoming events. View our <Link href="/events">Events</Link> page to review
                                        past events and access event materials.
                                    </div>
                                </div>
                            )}
                            {renderedEvents}
                        </Card>
                    </Col>
                </Row>
                <Row className={classes.Row}>
                    <Col md={12} lg={12}>
                        <Card
                            cardClassOverride={classes.infoCard}
                            title="News"
                            footer={
                                <Link href="/news">
                                    <Button label="View All" variant="homepage" size="auto" iconRight={<ChevronRightIcon />} />
                                </Link>
                            }
                            headerImg="/images/large2.png"
                            variant="info"
                            bodyHeight="200px"
                            scroll={true}
                        >
                            {renderedNews}
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Row className={classes.customRow}>
                <Col className={classes.section}>
                    <div className={classes.statsBanner}>
                        <Container className={classes.Container}>
                            <h2>RADx Data Hub Content</h2>
                            <div className={classes.statsSummary}>
                                <p>{stats.totalFiles} Total Files</p>
                                <p>{stats.totalStudies} Total Studies</p>
                            </div>
                        </Container>
                    </div>
                    <div className={classes.roundSummaries}>
                        <span className={classes.roundSummary}>
                            <div className={classes.number}>{stats.totalFiles}</div>
                            <div>Total Files</div>
                        </span>
                        <span className={classes.roundSummary}>
                            <div className={classes.number}>{stats.totalStudies}</div>
                            <div>Total Studies</div>
                        </span>
                    </div>
                    <Container className={classes.Container}>
                        <Row>
                            <div className={classes.stats}>
                                <Col xl={6} lg={12} className={classes.col}>
                                    <Col md={6} sm={12}>
                                        <div className={classes.stat}>
                                            <h1 className={`${classes.statTitle} ${classes.pink}`}>
                                                <a href="https://radx-up.org/" target="_blank" rel="noopener noreferrer">
                                                    {up.name}
                                                </a>
                                                <ExternalLinkIcon width="15" height="15" />
                                            </h1>
                                            <div className={`${classes.dccDescription} ${classes.gray}`}>
                                                Studying COVID-19 testing patterns in underserved populations.
                                            </div>
                                            <div className={classes.statMiddleContent}>
                                                <RADxUpStatIcon />
                                                <div className={classes.statMiddleContentText}>
                                                    <p className={classes.gray} data-testid="UP-dataFiles">
                                                        {up.dataFileCount} Data Files{' '}
                                                    </p>
                                                    <p className={classes.gray} data-testid="UP-documents">
                                                        {up.documentCount} Documents
                                                    </p>
                                                </div>
                                            </div>
                                            <h1 className={`${classes.statBottomContent}`} data-testid="UP-studies">
                                                {up.studyCount} Studies
                                            </h1>
                                        </div>
                                    </Col>
                                    <div className={`${classes.vl} ${classes.firstVl}`}></div>
                                    <Col md={6} sm={12}>
                                        <div className={classes.stat}>
                                            <h1 className={`${classes.statTitle} ${classes.blue}`}>
                                                <a href="https://www.radxrad.org/" target="_blank" rel="noopener noreferrer">
                                                    {rad.name}
                                                </a>
                                                <ExternalLinkIcon width="15" height="15" />
                                            </h1>
                                            <div className={`${classes.dccDescription} ${classes.gray}`}>
                                                Supporting innovative, non-traditional (radical) COVID-19 diagnostic approaches.
                                            </div>
                                            <div className={classes.statMiddleContent}>
                                                <RADxRadStatIcon />
                                                <div className={classes.statMiddleContentText}>
                                                    <p className={classes.gray} data-testid="Rad-dataFiles">
                                                        {rad.dataFileCount} Data Files{' '}
                                                    </p>
                                                    <p className={classes.gray} data-testid="Rad-documents">
                                                        {rad.documentCount} Documents
                                                    </p>
                                                </div>
                                            </div>
                                            <h1 className={`${classes.statBottomContent}`} data-testid="Rad-studies">
                                                {rad.studyCount} Studies
                                            </h1>
                                        </div>
                                    </Col>
                                </Col>
                                <div className={`${classes.vl} ${classes.secondVl}`}></div>
                                <Col xl={6} lg={12} className={classes.col}>
                                    <Col md={6} sm={12}>
                                        <div className={classes.stat}>
                                            <h1 className={`${classes.statTitle} ${classes.purple}`}>
                                                <a
                                                    href="https://www.nibib.nih.gov/covid-19/radx-tech-program"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {tech.name}
                                                </a>
                                                <ExternalLinkIcon width="15" height="15" />
                                            </h1>
                                            <div className={`${classes.dccDescription} ${classes.gray}`}>
                                                Speeding the development, validation, and commercialization of COVID-19 tests.
                                            </div>
                                            <div className={classes.statMiddleContent}>
                                                <RADxTechStatIcon />
                                                <div className={classes.statMiddleContentText}>
                                                    <p className={classes.gray} data-testid="Tech-dataFiles">
                                                        {tech.dataFileCount} Data Files{' '}
                                                    </p>
                                                    <p className={classes.gray} data-testid="Tech-documents">
                                                        {tech.documentCount} Documents
                                                    </p>
                                                </div>
                                            </div>
                                            <h1 className={`${classes.statBottomContent}`} data-testid="Tech-studies">
                                                {tech.studyCount} Studies
                                            </h1>
                                        </div>
                                    </Col>
                                    <div className={`${classes.vl} ${classes.thirdVl}`}></div>
                                    <Col md={6} sm={12}>
                                        <div className={classes.stat}>
                                            <h1 className={`${classes.statTitle} ${classes.darkBlue}`}>
                                                <a href="https://rapids.ll.mit.edu/" target="_blank" rel="noopener noreferrer">
                                                    {dht.name}
                                                </a>
                                                <ExternalLinkIcon width="15" height="15" />
                                            </h1>
                                            <div className={`${classes.dccDescription} ${classes.gray}`}>
                                                Developing digital health solutions to identify, trace, and monitor infected individuals.
                                            </div>
                                            <div className={classes.statMiddleContent}>
                                                <RADxDHTStatIcon />
                                                <div className={classes.statMiddleContentText}>
                                                    <p className={classes.gray} style={{ width: '155px' }}>
                                                        Stored in RAPIDS Repository
                                                    </p>
                                                </div>
                                            </div>
                                            <h1 className={`${classes.statBottomContent}`} data-testid="DHT-studies">
                                                {dht.studyCount} {getStudyLabel(dht.studyCount)}
                                            </h1>
                                        </div>
                                    </Col>
                                </Col>
                            </div>
                        </Row>
                    </Container>
                </Col>
            </Row>
            <Container>
                <Col lg={12}>
                    <Card title="RADx Study Updates" headerImg="/images/large1.png" variant="info" bkgdColor="#E6E6E6">
                        <Row className={classes.contentUpdates}>
                            {newStudies.length > 0 && (
                                <Col md={12} lg={12 / numOfContentCategories}>
                                    <Card
                                        cardClassOverride={classes.contentCard}
                                        title={
                                            <span className={classes.contentIcon}>
                                                <NewStudiesIcon /> Newly Registered Studies
                                            </span>
                                        }
                                        headerColor="#14617A"
                                        variant="info"
                                        bodyHeight="250px"
                                        scroll={true}
                                    >
                                        <ul className={classes.contentList}>{renderedRegisteredStudies(newStudies)}</ul>
                                    </Card>
                                </Col>
                            )}
                            {newFiles.length > 0 && (
                                <Col md={12} lg={12 / numOfContentCategories}>
                                    <Card
                                        cardClassOverride={classes.contentCard}
                                        title={
                                            <span className={classes.contentIcon}>
                                                <NewFilesIcon />
                                                Studies with New Files
                                            </span>
                                        }
                                        headerColor="#298CA3"
                                        variant="info"
                                        bodyHeight="250px"
                                        scroll={true}
                                    >
                                        <ul className={classes.contentList}>{renderedNewOrUpdatedFiles(newFiles)}</ul>
                                    </Card>
                                </Col>
                            )}
                            {updatedFiles.length > 0 && (
                                <Col md={12} lg={12 / numOfContentCategories}>
                                    <Card
                                        cardClassOverride={classes.contentCard}
                                        title={
                                            <span className={classes.contentIcon}>
                                                <UpdatedFilesIcon />
                                                Studies with Updated Files
                                            </span>
                                        }
                                        headerColor="#004A70"
                                        variant="info"
                                        bodyHeight="250px"
                                        scroll={true}
                                    >
                                        <ul className={classes.contentList}>{renderedNewOrUpdatedFiles(updatedFiles)}</ul>
                                    </Card>
                                </Col>
                            )}
                        </Row>
                    </Card>
                </Col>
            </Container>
        </>
    );
};

Homepage.propTypes = {
    contentUpdates: PropTypes.object,
    events: PropTypes.array,
    funding: PropTypes.array,
    news: PropTypes.array,
    stats: PropTypes.object,
};

export default Homepage;
