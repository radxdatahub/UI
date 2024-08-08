const userReg = {
    main: 'userReg',
    mainTitle: 'User Registration',
    dropdown: [
        {
            name: 'Create An Account',
            id: '#create-an-account',
        },
        {
            name: 'Login to the RADx Data Hub',
            id: '#login-to-your-account',
        },
    ],
};

const approvedData = {
    main: 'approvedData',
    mainTitle: 'My Approved Data',
    dropdown: [
        {
            name: 'General',
            id: '#my-approved-data',
        },
        {
            name: 'Download Files',
            id: '#download-files-ad',
        },
        {
            name: 'Apply For Add-ons',
            id: '#apply-for-add-ons',
        },
        {
            name: 'Create a Workbench',
            id: '#create-workbench',
        },
        {
            name: 'Add File to Workbench',
            id: '#add-files-workbench',
        },
    ],
};

const studyExplorer = {
    main: 'studyExplorer',
    mainTitle: 'Study Explorer',
    dropdown: [
        {
            name: 'General',
            id: '#general-se',
        },
        {
            name: 'View Available RADx Data Hub Studies',
            id: '#view-studies-se',
        },
        {
            name: 'Perform Free-Text Searches & View Search Results',
            id: '#perform-search-se',
        },
        {
            name: 'Navigate Through Search Results',
            id: '#navigate-search-results-se',
        },
        {
            name: 'Refine Results Through Sorting & Filtering',
            id: '#refining-results-se',
        },
    ],
};

const studyOverview = {
    main: 'studyOverview',
    mainTitle: 'Study Overview',
    dropdown: [
        {
            name: 'General',
            id: '#general-so',
        },
        {
            name: 'View Study Information',
            id: '#view-study-info',
        },
        {
            name: 'Request Access to Studies',
            id: '#request-access-so',
        },
        {
            name: 'Download Documents',
            id: '#download-documents-so',
        },
        {
            name: 'Learn About Data Files & Download Resources',
            id: '#learn-about-so',
        },
    ],
};

const variablesCatalog = {
    main: 'variablesCatalog',
    mainTitle: 'Variables Catalog',
    dropdown: [
        {
            name: 'General',
            id: '#general-vc',
        },
        {
            name: 'View Variable Information',
            id: '#view-variable-info',
        },
        {
            name: 'Navigate to RADx and dbGaP Study Overview Pages',
            id: '#navigate-to-study-overview',
        },
        {
            name: 'Download Report',
            id: '#download-reports-vc',
        },
    ],
};

const homePage = {
    main: 'homePage',
    mainTitle: 'Home Page',
    dropdown: [
        {
            name: 'General',
            id: '#general-hp',
        },
        {
            name: 'Search for Studies',
            id: '#search-for-studies',
        },
        {
            name: 'Access Quick Links',
            id: '#access-quick-links',
        },
        {
            name: 'Find Events, Funding Opportunities, and Recent News',
            id: '#events-opportunities-news',
        },
        {
            name: 'View Statistics',
            id: '#view-statistics',
        },
        {
            name: 'Learn About Recent Content Updates',
            id: '#learn-about-content-updates',
        },
    ],
};

const userSupport = {
    main: 'userSupport',
    mainTitle: 'User Support',
    id: '#userSupport',
    dropdown: [{ name: 'General', id: '#general-us' }],
};

const overviewIntro = {
    main: 'overviewIntro',
    mainTitle: 'RADx Data Hub Tutorial Introduction and Overview',
    id: '#intro',
    dropdown: [
        {
            name: 'Overview',
            id: '#intro-overview',
        },
        {
            name: 'Introduction',
            id: '#intro-intro',
        },
        {
            name: 'Target Audience',
            id: '#target-audience',
        },
        {
            name: 'The Features of the RADx Data Hub',
            id: '#radx-features',
        },
    ],
};

const publicData = {
    main: 'publicData',
    mainTitle: 'Public Data',
    dropdown: [
        {
            name: 'General',
            id: '#general-pd',
        },
        {
            name: 'Download Files',
            id: '#download-files-pd',
        },
        {
            name: 'Create and Launch Workbench',
            id: '#create-launch-workbench',
        },
        {
            name: 'Transition Files to Workbench',
            id: '#transition-files-workbench',
        },
    ],
};

const advancedSearch = {
    main: 'advancedSearch',
    mainTitle: 'Advanced Search Tool',
    dropdown: [
        {
            name: 'General',
            id: '#general-advs',
        },
        {
            name: 'Run a Single Query',
            id: '#running-single-query',
        },
        {
            name: 'Run Additional Queries and Subqueries',
            id: '#running-additional-queries',
        },
    ],
};

const analyticsWorkbench = {
    main: 'analyticsWorkbench',
    mainTitle: 'The Analytics Workbench',
    dropdown: [
        {
            name: 'General',
            id: '#general-workbench',
        },
    ],
};

const jupyterLab = {
    main: 'jupyterLab',
    mainTitle: 'JupyterLab',
    dropdown: [
        {
            name: 'General',
            id: '#general-jupyter',
        },
        {
            name: 'Create and Launch a JupyterLab Space',
            id: '#create-space',
        },
        {
            name: 'Upload and Download Files',
            id: '#upload-download',
        },
        {
            name: 'Clone a Git Repository',
            id: '#clone-git',
        },
        {
            name: 'Create a Persistent Conda Environment',
            id: '#conda-environment',
        },
        {
            name: 'Access Public Data',
            id: '#access-public-data',
        },
        {
            name: 'Change Environment',
            id: '#change-environment',
        },
        {
            name: 'File Sync',
            id: '#file-sync',
        },
    ],
};

const dataWrangler = {
    main: 'dataWrangler',
    mainTitle: 'Data Wrangler',
    dropdown: [
        {
            name: 'General',
            id: '#general-data-wrangler',
        },
    ],
};

const sasViya = {
    main: 'sasViya',
    mainTitle: 'SAS Viya',
    dropdown: [
        {
            name: 'General',
            id: '#general-sas',
        },
    ],
};

const sidebarOptions = [];
sidebarOptions.push(overviewIntro);
sidebarOptions.push(studyExplorer);
sidebarOptions.push(advancedSearch);
sidebarOptions.push(studyOverview);
sidebarOptions.push(variablesCatalog);
sidebarOptions.push(userSupport);
sidebarOptions.push(userReg);
sidebarOptions.push(approvedData);
sidebarOptions.push(publicData);

export default sidebarOptions;
