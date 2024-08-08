import React from 'react';
import SiteMap from '../../views/SiteMap/SiteMap';
// import logger from '../../lib/logger';
import { GET_REQUEST_TYPES } from '../../constants/apiRoutes';
import axios from 'axios';

const SiteMapPage = (props) => <SiteMap {...props} />;

// export async function getServerSideProps(context) {}

export default SiteMapPage;
