import React from 'react';
import Faq from '../../views/Faq/Faq';
import logger from '../../lib/logger';
import { GET_REQUEST_TYPES } from '../../constants/apiRoutes';
import axios from 'axios';

const FaqPage = (props) => <Faq {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'faq';
    const { req } = context;
    return {
        props: {},
    };
}

export default FaqPage;
