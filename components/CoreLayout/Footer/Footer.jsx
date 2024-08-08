import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import classes from './Footer.module.scss';
import ExternalLinkIcon from '../../ExternalLinkIcon/ExternalLinkIcon';
import YoutubeIcon from '../../Images/svg/YoutubeIcon';
import MailIcon from '../../Images/svg/MailIcon';
import Link from 'next/link';
import { GET_RESOURCE_CENTER_BUCKET } from '../../../constants/apiRoutes';
import HHSLogo from '../../Images/svg/hhsLogo';

/**
 * Page Footer
 * Note: Footer uses some external icons that are geared with ARIA labels to indicate external links like the HHS website
 * @param {Boolean} useColorfulVariant - flag from CoreLayout to determine use of colorful version vs simple version
 *
 * @returns {JSX} Page Footer Component
 */

export default function Footer({ useColorfulVariant, siteUrl }) {
    return (
        <>
            <footer className={classes.footer}>
                <div className={`${classes.footerBackground} ${useColorfulVariant ? classes.colorful : classes.thin} `}></div>
                {!useColorfulVariant && <div className={classes.whitebg} />}
                <div className={classes.content}>
                    <Container>
                        <Row className="mb-2">
                            <Col sm={4} className={`${classes.column} ${classes.multiRow} `}>
                                <p className={`${classes.columnTitle} ${classes.gray}`}>RADx Data Hub</p>
                                <Link href="/support">Contact Us</Link>
                                <Link href="/about">About</Link>
                                <Link href="/faq">Frequently Asked Questions</Link>
                                <Link href="/studyExplorer">Study Explorer</Link>
                                <Link href="/siteMap">Site Map</Link>
                                <Link href="/news">News</Link>
                                <Link href="/resourceCenter">Resource Center</Link>
                            </Col>
                            <Col sm={4} className={classes.column}>
                                <p className={`${classes.columnTitle} ${classes.teal}`}>Related Websites</p>
                                <a
                                    href="https://www.nih.gov/research-training/medical-research-initiatives/radx"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    RADx Initiative
                                </a>
                                <a
                                    href="https://www.nih.gov/research-training/medical-research-initiatives/radx/radx-programs"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    RADx Programs
                                </a>
                                <a href="https://datascience.nih.gov/" target="_blank" rel="noopener noreferrer">
                                    Office of Data Science Strategy
                                </a>
                                <div>
                                    <a href="https://clinicaltrials.gov/" target="_blank" rel="noopener noreferrer">
                                        ClinicalTrials.gov
                                    </a>
                                    <ExternalLinkIcon />
                                </div>
                                <a href="https://www.ncbi.nlm.nih.gov/gap/" target="_blank" rel="noopener noreferrer">
                                    dbGaP
                                </a>
                            </Col>
                            <Col sm={4} className={classes.column}>
                                <p className={`${classes.columnTitle} ${classes.blue}`}>Website Policies</p>
                                <a href={`${siteUrl}${GET_RESOURCE_CENTER_BUCKET}RADxDataHubCodeOfConduct.pdf`}>User Code of Conduct</a>
                                <a href="https://www.nih.gov/accessibility" target="_blank" rel="noopener noreferrer">
                                    Accessibility
                                </a>
                                <a href="https://www.nih.gov/privacy-policy" target="_blank" rel="noopener noreferrer">
                                    Privacy Policy
                                </a>
                                <div>
                                    <a
                                        href="https://www.hhs.gov/vulnerability-disclosure-policy/index.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        HHS Vulnerability Disclosure
                                    </a>
                                    <ExternalLinkIcon />
                                </div>
                                <a href="https://www.nih.gov/disclaimers" target="_blank" rel="noopener noreferrer">
                                    Disclaimers
                                </a>
                                <a href="https://www.edi.nih.gov/" target="_blank" rel="noopener noreferrer">
                                    No Fear Act
                                </a>
                                <a
                                    href="https://www.nih.gov/institutes-nih/nih-office-director/office-communications-public-liaison/freedom-information-act-office"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Freedom of Information Act
                                </a>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className={classes.blackFooter}>
                    <Container className={classes.blackFooterContainer}>
                        <Row className={classes.govLinks}>
                            <Col className={classes.desktop}>
                                <a
                                    href="https://www.nih.gov/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Link to National Institutes of Health"
                                >
                                    <img src="/images/nihLogo.png" alt="Link to National Institutes of Health" className={classes.nih} />
                                </a>
                            </Col>
                            <Col className={classes.mobile}>
                                <a
                                    href="https://www.nih.gov/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Link to National Institutes of Health"
                                >
                                    <img
                                        src="/images/mobile_NIH_logo.png"
                                        alt="Link to National Institutes of Health"
                                        className={classes.nih}
                                    />
                                </a>
                            </Col>
                            <Col className={classes.desktop}>
                                <a
                                    href="https://www.hhs.gov/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Link to U.S. Department of Health and Human Services"
                                >
                                    <HHSLogo />
                                </a>
                            </Col>
                            <Col className={classes.mobile}>
                                <a
                                    href="https://www.hhs.gov/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Link to U.S. Department of Health and Human Services"
                                >
                                    <img
                                        src="/images/mobile_hhs_logo.png"
                                        className={classes.hhs}
                                        alt="Link to U.S. Department of Health and Human Services"
                                    />
                                </a>
                            </Col>
                            <Col>
                                <a href="https://www.usa.gov/" target="_blank" rel="noopener noreferrer" aria-label="Link to UUSAGov">
                                    <img src="/images/USAGOV_B&W.png" className={classes.usa} alt="Link to UUSAGov" />
                                </a>
                            </Col>
                        </Row>
                        <Row className={classes.socialText}>
                            <div>Connect with Us:</div>
                            <a
                                href="https://www.youtube.com/@NIHRADxDataHub"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Link to Youtube"
                            >
                                <YoutubeIcon />
                            </a>
                            <a
                                href="http://eepurl.com/ifHHM9"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`px-2`}
                                aria-label="Link to Sign Up for Newsletter"
                            >
                                <MailIcon />
                            </a>
                        </Row>
                    </Container>
                </div>
            </footer>
        </>
    );
}

Footer.propTypes = {
    useColorfulVariant: PropTypes.bool,
};
