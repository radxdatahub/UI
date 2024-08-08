/* eslint-disable max-len */
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import classes from './GettingStarted.module.scss';
import Banner from '../../components/Banner/Banner';
import Card from '../../components/Card/Card';
import CalloutBox from '../../components/CalloutBox/CalloutBox';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Person, QuestionLg, CameraVideo, Envelope } from 'react-bootstrap-icons';
/**
 * View for the GettingStarted Page
 * @returns {Node} object rendering GettingStarted
 */

const GettingStarted = () => {
    const router = useRouter();

    return (
        <>
            <Banner title="Getting Started" path={router.asPath} variant="virus3" ariaLabel="Getting Started Breadcrumb" />

            <Container className={classes.Container}>
                <CalloutBox
                    className={classes.infoText}
                    body={
                        <div>
                            This page contains step-by-step information on how to explore RADx<span className={classes.registered}>®</span>{' '}
                            studies or variables and access analytic software via the RADx Researcher Workbench. If you are a data
                            submitter, please visit our “For Submitters” section on the{' '}
                            <Link href="/resourceCenter">Resource Center page</Link>.
                        </div>
                    }
                />
                <Row className={`${classes.Row} whiteTextBackground`}>
                    <Col lg={12}>
                        <h2 className={classes.black}>Searching for Studies Using the Study Explorer</h2>
                        <ol>
                            <li>
                                Navigate to the <Link href="/studyExplorer?&sort=asc&prop=title&page=1&size=50">Study Explorer</Link>.
                            </li>
                            <li>
                                Enter your search term in the search bar. Use the <b>Filters</b> and <b>Advanced Search</b> features to
                                refine your search results.
                            </li>
                            <li>
                                Click on the <b>Study Name</b> to go to the <b>Study Overview</b> page with comprehensive study information.
                            </li>
                            <ol type="a">
                                <li>
                                    The <b>Study Information</b> section contains information to help users gain high-level study
                                    understanding, and the <b>dbGaP Study Accession</b> link to the <b>dbGaP Study Overview</b> page where
                                    users can request study-level access.
                                </li>
                                <li>
                                    The <b>Study Documents</b> section, when available, contains study-submitted documentation, such as
                                    README files.
                                </li>
                                <li>
                                    The <b>Data Files</b> ssection lists the most recent data files and includes downloadable metadata and
                                    data dictionary files. It also includes viewable variable information corresponding to each data file,
                                    so users can learn more about a study and its data before requesting access.
                                </li>
                            </ol>
                        </ol>
                        <br />
                        <h2 className={classes.black}>Searching for Variables Using the Variables Catalog</h2>
                        <ol>
                            <li>
                                Navigate to the <Link href="/variablesCatalog">Variables Catalog</Link>.
                            </li>
                            <li>You can view variables on this page, or download the Complete Data Variable Report to view it offline.</li>
                            <li>View variable information on the page in two ways:</li>
                            <ol type="a">
                                <li>
                                    <b>All Variables</b> lists all data file variables in a comma-separated list. Search specific variables
                                    in the search bar.
                                </li>
                                <li>
                                    <b>RADx Core Variables</b> contains RADx Common Data Elements (CDEs) harmonized across RADx studies. The
                                    variables are listed with labels in a tabular format.
                                </li>
                            </ol>
                            <li>
                                To download the information, download the Complete Data Variable Report, which comprehensively presents the
                                variables, allowing you to identify each variable, which variables are used by each (C)DCC, and which
                                variables are in each data file.
                            </li>
                            <li>Once you find a study you are interested in, click the following to learn more or request access.</li>
                            <ol type="a">
                                <li>
                                    <b>Study Name</b> links to the RADx Data Hub Study Overview page, where users can learn about study
                                    metadata.
                                </li>
                                <li>
                                    <b>dbGaP Study Accession</b> links to the dbGaP Study Overview page, where users can request study-level
                                    access.
                                </li>
                            </ol>
                        </ol>
                        <br />
                        <h2 className={classes.black}>
                            Accessing RADx Data in the NIH RADx<span className={classes.registered}>®</span> Data Hub
                        </h2>
                        <p>
                            The RADx Data Hub contains two types of data: Public access data (including synthetic data) and
                            controlled-access data. Users can access public data by logging in, then navigating to{' '}
                            <Link href="/publicData">Public Data</Link> in the <b>Data Access</b> tab. To access controlled-access data:
                        </p>
                        <ol>
                            <li>
                                Log into the <Link href="/">RADx Data Hub</Link> using the <b>same eRA</b> or <b>NIH Login</b> you use for
                                dbGaP.
                            </li>
                            <li>
                                Locate a study using the{' '}
                                <Link href="/studyExplorer?&sort=asc&prop=title&page=1&size=50">Study Explorer</Link> and click on the{' '}
                                <b>Study Name</b> to go to the <b>Study Overview</b> page.
                            </li>
                            <li>
                                Click on the <b>dbGaP Study Accession</b> in the Study Information section on the Study Overview page. This
                                will bring you to the <b>dbGaP Study Overview page</b>.
                            </li>
                            <li>
                                In dbGaP, submit a study <b>data access request</b>. Use dbGaP’s{' '}
                                <b>Important Links and Information section</b> for guidance to request study access.
                                <div className={classes.indented}>
                                    Note: You can request multiple studies in the dbGaP request process by searching for and adding the{' '}
                                    <b>dbGaP Study Accession IDs</b> of interest.
                                </div>
                            </li>
                            <li>
                                You will receive a study access confirmation email from dbGaP once access has been granted. To analyze data
                                in the RADx Data Hub, follow the steps below.
                            </li>
                        </ol>
                        <br />
                        <h2 className={classes.black}>Accessing Analytic Software in the RADx Researcher Workbench</h2>
                        <ol>
                            <li>
                                After receiving a dbGaP study access confirmation email, return to the <Link href="/">RADx Data Hub</Link>{' '}
                                and login using the <b>same eRA</b> or <b>NIH Login</b> as for dbGaP.
                            </li>
                            <li>
                                Navigate to <Link href="/myApprovedData">My Approved Data</Link> in the <b>Data Access</b> tab.
                            </li>
                            <li>
                                Click the <b>Create Workbench</b> button.
                            </li>
                            <li>
                                To add files to the <b>Workbench</b>, go back to the <b>My Approved Data</b>, select files for analysis, and
                                click <b>Add to Workbench</b>.
                                <div className={classes.indented}>
                                    Note: You can also add synthetic data from the <b>Public Data</b> option in the <b>Data Access</b> tab,
                                    or upload your own data files into the Workbench.
                                </div>
                            </li>
                            <li>
                                Read the <Link href={`/workbenchTutorial`}>Workbench User Tutorial</Link> and view our Getting Started
                                videos on{' '}
                                <a href="https://www.youtube.com/watch?v=Tq-8GBewoME" target="_blank" rel="noopener noreferrer">
                                    creating a workbench and adding files
                                </a>
                                , and{' '}
                                <a href="https://www.youtube.com/watch?v=wyH2mVLJ9ng" target="_blank" rel="noopener noreferrer">
                                    data analysis in the Workbench
                                </a>{' '}
                                for further guidance.
                            </li>
                        </ol>
                        <br />
                    </Col>
                    <Col>
                        <Card title="Resources" headerImg="/images/large1.png" variant="info" cardClassOverride={classes.resourcesCard}>
                            <Row>
                                <Col lg={6}>
                                    <ul className={classes.resourcesList}>
                                        <li>
                                            <div>
                                                <Person size={35} />
                                            </div>
                                            <div>
                                                Read the User Tutorial at:{' '}
                                                <Link href="/tutorial" legacyBehavior>
                                                    radxdatahub.nih.gov/tutorial
                                                </Link>
                                            </div>
                                        </li>
                                        <li>
                                            <div>
                                                <QuestionLg size={35} />
                                            </div>
                                            <div>
                                                Access RADx Data Hub FAQs at:{' '}
                                                <Link href="/faq" legacyBehavior>
                                                    radxdatahub.nih.gov/faq
                                                </Link>
                                            </div>
                                        </li>
                                    </ul>
                                </Col>
                                <Col lg={6}>
                                    <ul className={classes.resourcesList}>
                                        <li>
                                            <div>
                                                <CameraVideo size={35} />
                                            </div>
                                            <div>
                                                Check out our{' '}
                                                <a href="https://www.youtube.com/@NIHRADxDataHub" target="_blank" rel="noopener noreferrer">
                                                    YouTube channel
                                                </a>{' '}
                                                for tutorials and webinars
                                            </div>
                                        </li>
                                        <li>
                                            <div>
                                                <Envelope size={35} />
                                            </div>
                                            <div>
                                                Email the RADx Data Hub Partners at:{' '}
                                                <a href="mailto:RADx-DataHub@nih.gov">RADx-DataHub@nih.gov</a>
                                            </div>
                                        </li>
                                    </ul>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default GettingStarted;
