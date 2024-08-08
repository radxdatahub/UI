import React from 'react';
import Banner from '../../components/Banner/Banner';
import classes from './SiteMap.module.scss';
import { Container, Row } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Button from '../../components/Button/Button';
import DownloadIcon from '../../components/Images/svg/DownloadIcon';
import Image from "next/legacy/image";
import siteMapImage from '../../public/images/site_map.png';
import siteMapDownloadImage from '../../public/images/site_map.pdf';

const SiteMap = (props) => {
    const router = useRouter();

    return (
        <>
            <Banner title="Site Map" variant="virus3" ariaLabel="site map" path={router.asPath} />
            <Container>
                <Row className={classes.titleGap}>
                    <span className={classes.title}>RADx Data Hub Site Map</span>
                    <span className={`${classes.body} narrowTextBackground`}>
                        The NIH Rapid Acceleration of Diagnostics Data Hub (RADx Data Hub) supports researchers in accessing curated and
                        de-identified COVID-19 data, allowing them to find, aggregate, and perform data analyses in a cloud-enabled
                        platform.
                    </span>
                </Row>
                <Row className={classes.buttonGap}>
                    <span className={classes.buttonText}>Available for download as a PDF:</span>
                    <a href={siteMapDownloadImage} target="_blank" rel="noopener noreferrer" download="RADx_Data_Hub_SiteMap.pdf">
                        <Button
                            label="Download PDF [502 KB]"
                            ariaLabel="Download PDF [502 KB]"
                            size="medium"
                            type="submit"
                            variant="siteMap"
                            iconLeft={<DownloadIcon />}
                            handleClick={() => {}}
                            className={classes.downloadPdfButton}
                        />
                    </a>
                </Row>
                <Row className={classes.imageGap}>
                    <div className="narrowTextBackground">
                        <Image priority src={siteMapImage} />
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default SiteMap;
