import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import PropTypes from 'prop-types';
import classes from './Modal.module.scss';
import { Col, Container, Row } from 'react-bootstrap';
import Modal from '../../../components/GeneralModal/GeneralModal';

/**
 * Modal for How to Request Access on Study Overview page
 *
 * @property {Boolean} visible - Flag to show/hide modal
 * @property {Function} closeModal - Function to close/hide modal
 * @property {Object} rapidsLink - Link for this study in the RAPIDS platform if it is a DHT study
 * @returns {Node} object rendering the Request Access Modal
 */
const RequestAccessModal = (props) => {
    const { visible, closeModal, rapidsLink, dbGapLink } = props;

    const studyLink = `https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=${dbGapLink?.propertyValue[0]}.v1.p1`;

    const note = rapidsLink
        ? (
            <p>
                <b>Note:</b> Data for this study is stored in a separate repository, RAPIDS. After you obtain dbGaP approval to access
                the data, navigate to the <a href={rapidsLink.propertyValue[0]} target="_blank" rel="noreferrer noopener">RAPIDS repository</a>{' '}
                to access the approved data.
            </p>
        )
        : (
            <p>
                <b>Note:</b> After you obtain dbGaP approval to access the RADx data, use the same eRA or NIH account used in dbGaP when
                logging into the RADx Data Hub to access the approved data.
            </p>
        );

    const bodyComp = (
        <div className={classes.modalBody}>
            <div>
                To request access to the data, navigate to the study's dbGaP page by clicking the{' '}
                <a href={studyLink} target="_blank" rel="noreferrer noopener">
                    dbGaP study overview page
                </a>
                {' '}link. Detailed instructions about the data request process in dbGaP can be found on the dbGaP page on{' '}
                <a
                    href="https://sharing.nih.gov/accessing-data/accessing-genomic-data/how-to-request-and-access-datasets-from-dbgap"
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    Scientific Data Sharing
                </a>
                .
            </div>
            <div>{note}</div>
        </div>
    );

    return (
        <>
            <Modal
                show={visible}
                onHide={() => {
                    closeModal();
                }}
                closable={true}
                title="How to Request Access"
                bodyChildren={bodyComp}
                dialogClassName={classes.modal}
            />
        </>
    );
};

RequestAccessModal.propTypes = {
    closeModal: PropTypes.func,
    rapidsLink: PropTypes.shape({
        label: PropTypes.string,
        propertyValue: PropTypes.arrayOf(PropTypes.string)
    }),
    visible: PropTypes.bool,
};

export default RequestAccessModal;
