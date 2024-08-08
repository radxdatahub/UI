import React from 'react';
import Glossary from '../../views/Glossary/Glossary.jsx';
import logger from '../../lib/logger';

const GlossaryPage = (props) => <Glossary {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'Glossary';

    return {
        props: {},
    };
}

export default GlossaryPage;
