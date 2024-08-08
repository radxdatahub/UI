const BASE_URL = process.env.DEV_URL;
const test = 'http://localhost:8080';
// RADX API URLS
/**
 * Search Calls -- RADX
 */

// HOMEPAGE API CALL
export const GET_FUNDING = `${BASE_URL}/api/entity/v1/getFunding`;
export const GET_NEWS = `${BASE_URL}/api/entity/v1/getNews`;
export const GET_EVENTS = `${BASE_URL}/api/entity/v1/getEvents`;
export const GET_STATS = `${BASE_URL}/api/entity/v1/getRadxDccStats`;
export const GET_CONTENT_UPDATES = `${BASE_URL}/api/entity/v1/getHomepageContent`;
export const GET_ALL_FUNDING = `${BASE_URL}/api/entity/v1/getAllFunding`;
export const GET_ALL_NEWS = `${BASE_URL}/api/entity/v1/getAllNews`;
export const GET_ALL_EVENTS = `${BASE_URL}/api/entity/v1/getAllEvents`;

// STUDY EXPLORER API CALLS
export const SEARCH_STUDIES = `${BASE_URL}/api/search/v1/studies`;
export const GET_STUDY = `${BASE_URL}/api/entity/v1/study/getStudy?studyId=`;
export const GET_STUDY_DOCUMENTS = `${BASE_URL}/api/entity/v1/study/getDocuments?studyId=`;
export const GET_STUDY_DATASETS = `${BASE_URL}/api/entity/v1/study/getDatasets?studyId=`;
export const GET_FACETS = `${BASE_URL}/api/entity/v1/search/getFacets`;
export const GET_PROPERTIES = `${BASE_URL}/api/entity/v1/search/getProps`;
export const GET_AUTOCOMPLETE = `${BASE_URL}/api/search/v1/studies/autocomplete?q=`;

// USER SUPPORT REQUEST FORM API CALL
export const POST_SUPPORT_REQUEST = `${BASE_URL}/api/user/v1/support-request/submit`;
export const GET_REQUEST_TYPES = `${BASE_URL}/api/user/v1/support-request/request-types`;

// SUPPORT DASHBOARD API CALL
export const GET_ALL_SUPPORT_REQUEST = `${BASE_URL}/api/user/v1/support-request/all-support-requests?status=`;
export const GET_SUPPORT_REQUEST_BY_ID = `${BASE_URL}/api/user/v1/support-request/`;

// INTERNAL DASHBOARD API CALL
export const GET_SUPPORT_REQUEST_BY_ID_INTERNAL = `${BASE_URL}/api/user/v1/support-request/officer/`;

// SUPPORT TICKET API CALL
export const GET_ALL_SUPPORT_STATUSES = `${BASE_URL}/api/user/v1/support-request/all-statuses`;
export const GET_ALL_SUPPORT_SEVERITY = `${BASE_URL}/api/user/v1/support-request/all-severity`;
export const GET_ALL_SUPPORT_RESOLUTION_TYPES = `${BASE_URL}/api/user/v1/support-request/all-resolution-types`;
export const UPDATE_DETAILED_SUPPORT_TICKET = `${BASE_URL}/api/user/v1/support-request/update-support-request/`;
export const GET_ALL_ASSIGNEES = `${BASE_URL}/api/user/v1/support-request/all-assignees`;

// SUBMITTER DASHBOARD API CALL
export const GET_SUBMITTER_SUBMISSIONS = `${BASE_URL}/api/submission-service/v1/getSubmissions`;
export const DELETE_SUBMISSION = `${BASE_URL}/api/submission-service/v1/deleteSubmission?submissionId=`;
export const DOWNLOAD_STUDY_UUIDS = `/api/download/v1/download/study-uuids?sessionId=`;

// DATA INGEST APIs
export const GET_STUDIES = `${BASE_URL}/api/submission-service/v1/getStudies`;
export const POST_DI_SUBMISSION = `${BASE_URL}/api/submission-service/v1/create-submission?studyId=`;
export const GET_CATEGORIES = `${BASE_URL}/api/submission-service/v1/getCategories`;
export const POST_DI_UPLOAD = `${BASE_URL}/api/submission-service/v1/uploadFiles/uploadFile?submissionId=`;
export const DELETE_DI_FILE = `${BASE_URL}/api/submission-service/v1/deleteFile?fileId=`;
export const GET_SUBMISSION_INFO = `${BASE_URL}/api/submission-service/v1/submissionInfo?submissionId=`;
export const GET_UPLOADED_FILES = `${BASE_URL}/api/submission-service/v1/uploadFiles/getFiles?submissionId=`;
export const POST_CREATE_BUNDLES = `${BASE_URL}/api/submission-service/v1/uploadFiles/createBundles?submissionId=`;
export const GET_BUNDLES = `${BASE_URL}/api/submission-service/v1/bundle/get?submissionId=`;
export const POST_BUNDLES = `${BASE_URL}/api/submission-service/v1/bundle/update`;
export const POST_VALIDATE_SUBMISSION = `${BASE_URL}/api/submission-service/v1/validateFiles/validate?submissionId=`;
export const GET_VALIDATION_RESULTS = `${BASE_URL}/api/submission-service/v1/validateFiles/getResults?submissionId=`;
export const PUT_REPLACE_FILE = `${BASE_URL}/api/submission-service/v1/replaceFile?fileId=`;
export const POST_SUBMIT_SUBMISSION = `${BASE_URL}/api/submission-service/v1/reviewAndSubmit/submit?submissionId=`;
export const GET_BUNDLE_FILES = `${BASE_URL}/api/submission-service/v1/bundle/getFiles?fileId=`;
export const DELETE_BUNDLE = `${BASE_URL}/api/submission-service/v1/bundle/delete?fileId=`;
export const POST_DI_ACKNOWLEDGEMENT = `${BASE_URL}/api/submission-service/v1/validateFiles/acknowledge`;
export const POST_DI_MULTI_UPLOAD = `${BASE_URL}/api/submission-service/v1/uploadFiles/multiple?submissionId=`;
export const GET_DOWNLOAD_BY_FILE = `/api/submission-service/v1/download/validationErrorsByFile?fileId=`;
export const GET_DOWNLOAD_BY_SUBMISSION = `/api/submission-service/v1/download/validationErrorsBySubmission?submissionId=`;
export const POST_SAVE_VALIDATION = `${BASE_URL}/api/submission-service/v1/validateFiles/user/acknowledge`;
export const POST_PREVIOUS_PAGE = `${BASE_URL}/api/submission-service/v1/bundle/previousPage?submissionId=`;
export const DELETE_MULTIPLE_DI = `${BASE_URL}/api/submission-service/v1/deleteFiles?fileIds=`;

// INTERNAL DASHBOARD
export const DOWNLOAD_SUPPORT_REQUEST_REPORT = `${BASE_URL}/api/user/v1/support-request/download-support-request-report`;

// METRICS REPORTS APIS
export const GET_HUB_CONTENT = `${BASE_URL}/api/report/v1/hubContent?aggBy=[aggBy]&reportId=[reportId]`;
export const GET_HUB_CONTENT_CSV = `${BASE_URL}/api/report/v1/download/hubContent?aggBy=[aggBy]&reportId=[reportId]`;
export const GET_REPORT_IDS = `${BASE_URL}/api/report/v1/hubContentReportDates`;
export const GET_HARMONIZATION_REPORT_IDS = `${BASE_URL}/api/report/v1/getDataHarmonizationReportIds`;
export const GET_HARMONIZATION_OUTCOMES = `${BASE_URL}/api/report/v1/getHarmonizationMetrics?aggBy=[aggBy]&reportId=[reportId]`;
export const GET_HARMONIZATION_OUTCOMES_CSV = `${BASE_URL}/api/report/v1/getHarmonizationMetricsCSV?aggBy=[aggBy]&reportId=[reportId]`;
export const GET_SUBMISSION_ACTIVITIES = `${BASE_URL}/api/report/v1/submissionMetricsByAggregate?aggBy=[aggBy]&startDate=[startDate]&endDate=[endDate]`;
export const GET_SUBMISSION_ACTIVITIES_CSV = `${BASE_URL}/api/report/v1/submissionMetricsCSV?aggBy=[aggBy]&startDate=[startDate]&endDate=[endDate]`;
export const GET_USER_POPULATION = `${BASE_URL}/api/report/v1/userMetricsByAggregate?aggBy=[aggBy]&startDate=[startDate]&endDate=[endDate]`;
export const GET_USER_POPULATION_CSV = `${BASE_URL}/api/report/v1/userMetricsCSV?aggBy=[aggBy]&startDate=[startDate]&endDate=[endDate]`;
export const GET_USER_ACTIVITIES = `${BASE_URL}/api/report/v1/userActivities?startDate=[startDate]&endDate=[endDate]`;
export const GET_USER_ACTIVITIES_CSV = `${BASE_URL}/api/report/v1/userActivitiesCSV?startDate=[startDate]&endDate=[endDate]`;

// USER REGISTRATION
export const GET_USER_RAS_INFO = `${BASE_URL}/api/user/v1/getRegistrationDetails?sessionId=[sessionId]`;
export const GET_RESEARCHER_LEVELS = `${BASE_URL}/api/user/v1/user/researcher-levels`;
export const GET_DCCS = `${BASE_URL}/api/user/v1/user/dccs`;
export const GET_APPROVED_INSTITUTIONS = `${BASE_URL}/api/user/v1/user/approved-institutions`;
export const POST_USER_REGISTRATION = `${BASE_URL}/api/user/v1/user/user-registration?sessionId=[sessionId]`;
export const POST_INSTITUTION = `${BASE_URL}/api/user/v1/user/create-institution`;
export const ALL_STATES = `${BASE_URL}/api/user/v1/user/states`;
export const ALL_COUNTRIES = `${BASE_URL}/api/user/v1/user/countries`;
export const GET_INSTITUTIONS_TYPES = `${BASE_URL}/api/user/v1/user/institution-types`;

// USER DASHBOARD
export const GET_ALL_USERS = `${BASE_URL}/api/user/v1/user/admin/users?status=`;
export const GET_ALL_USER_ROLES = `${BASE_URL}/api/user/v1/user/admin/roles`;
export const GET_USER_BY_ID = `${BASE_URL}/api/user/v1/user/admin/`;
export const UPDATE_USER_INFO_BY_ID = `${BASE_URL}/api/user/v1/user/admin/update/`;
export const GET_ALL_GENERAL_STATUSES = `${BASE_URL}/api/user/v1/user/admin/general-statuses`;

// STUDY REGISTRATION FORM
export const GET_CODELISTS = `${BASE_URL}/api/entity/v1/study/registrationCodelists`;
export const GET_STUDY_ENTITIES = `${BASE_URL}/api/entity/v1/study/getRegistrationProperties`;
export const GET_STUDY_VALUES = `${BASE_URL}/api/submission-service/v1/study/getValues?studyId=[studyId]`;
export const DOWNLOAD_STUDY_REG_PDF = `${BASE_URL}/api/download/v1/download/study/pdf?studyId=[studyId]&sessionId=`;
export const PUT_STUDY_REGISTRATION = `${BASE_URL}/api/submission-service/v1/study/[userType]/edit?shouldSubmit=`;

// STUDY REGISTRATION DASHBOARD
export const UPLOAD_STUDY_REG_DASH = `${BASE_URL}/api/submission-service/v1/study/create`;
export const DELETE_STUDY = `${BASE_URL}/api/submission-service/v1/study/delete?studyId=`;
export const GET_CURATOR_STUDIES = `${BASE_URL}/api/submission-service/v1/study/curator/studies`;
export const GET_DCC_STUDIES = `${BASE_URL}/api/submission-service/v1/study/dcc/studies`;

// USER AUTH
export const GET_INFO_BY_SESSION = `${BASE_URL}/api/user/v1/user/infoBySession?sessionId=`;
export const GET_INFO_BY_COOKIE = `${BASE_URL}/api/user/v1/user/info`;
export const UPDATE_SESSION_TOKEN = `${BASE_URL}/api/user/v1/refresh/token`;
export const USER_LOGOUT = `${BASE_URL}/api/user/v1/logout`;

// APPROVED DATA
export const GET_APPROVED_DATA = `${BASE_URL}/api/approved-data/v1/getApprovedData`;
export const PUT_TO_WORKBENCH = `${BASE_URL}/api/approved-data/v1/moveFilesToWorkbench?sasFiles=[sasFileIDs]&dataFiles=[dataFileIDs]`;
export const POST_ADDON_FORM = `${BASE_URL}/api/approved-data/v1/workbench/request`;
export const GET_WORKBENCH = `${BASE_URL}/api/approved-data/v1/workbench/create`;
export const GET_WORKBENCH_REQUESTS = `${BASE_URL}/api/approved-data/v1/workbench/request/all`;
export const GET_WORKBENCH_REQUEST = `${BASE_URL}/api/approved-data/v1/workbench/request/`;
export const PUT_WORKBENCH_REQUEST = `${BASE_URL}/api/approved-data/v1/workbench/request/update`;

// PUBLIC DATA
export const GET_PUBLIC_DATA = `${BASE_URL}/api/approved-data/v1/publicData`;
export const PUT_PUBLIC_TO_WORKBENCH = `${BASE_URL}/api/approved-data/v1/movePublicData?fileIds=[fileIDs]`;

// VARIABLES CATALOG
export const GET_CORE_VARIABLES_CATALOG_DATA = `${BASE_URL}/variables-explorer/core_variables_data_model.json`;
export const GET_ALL_VARIABLES_CATALOG_DATA = `${BASE_URL}/variables-explorer/all_variables_data_model.json`;

// CURATOR DASHBOARD
export const GET_STUDY_FILE_SUBMISSIONS = `${BASE_URL}/api/submission-service/v1/curator/getSubmissions`;
export const GET_STUDY_FILE_SUBMISSION_FILES = `${BASE_URL}/api/submission-service/v1/curator/getFilesBySubm?submissionId=`;
export const POST_STUDY_FILE_SUBMISSION_REVIEW = `${BASE_URL}/api/submission-service/v1/curator/processFiles`;
export const DOWNLOAD_STUDY_FILES = `/api/submission-service/v1/curator/all-submission-files?submissionId=`;

// STUDY OVERVIEW
export const GET_METADATA_FILE_CONTENT = `${BASE_URL}/api/download/v1/download/meta-dict?fileId=`;

// NEWS ARTICLES
export const GET_NEWS_ARTICLE = `${BASE_URL}/api/entity/v1/getNews/`;


/**
 * --------------------------------------------- NEXT JS -----------------------------------------
 */
export const SUPPORT = `/api/launch/Support/SupportForm`;
export const SUPPORTID = `/api/launch/Support/SupportId?id=[id]`;
export const DI_SUBMISSION = `/api/launch/DataIngest/DataIngestSubmission`;
export const DI_UPLOAD = `/api/launch/DataIngest/DataIngestUpload`;
export const DATA_FILE_DOWNLOAD = `/api/launch/StudyOverview/StudyOverviewDataFileDownload`;
export const DOCUMENT_DOWNLOAD = `/api/launch/StudyOverview/StudyOverviewDocumentDownload`;
export const DI_DELETE = `/api/launch/DataIngest/DataIngestDelete`;
export const DI_CREATE_BUNDLES = `/api/launch/DataIngest/DataIngestCreateBundles`;
export const DI_UPDATE_BUNDLES = `/api/launch/DataIngest/DataIngestUpdateBundles`;
export const DI_VALIDATE_SUBMISSION = `/api/launch/DataIngest/DataIngestValidateSubmission`;
export const DI_GET_VALIDATION = `/api/launch/DataIngest/DataIngestGetValidationResults`;
export const DI_REPLACE = `/api/launch/DataIngest/DataIngestReplaceFile`;
export const DI_SUBMIT = `/api/launch/DataIngest/DataIngestSubmit`;
export const SUPPORTASSIGNEE = `/api/launch/SupportAssignee`;
export const USER_REGISTRATION = '/api/launch/UserRegistration/UserRegistration?sessionId=[sessionId]';
export const ADD_INSTITUTION = '/api/launch/Institution/AddInstitution';
export const GET_USER_PROFILE = '/api/launch/GetUserProfile/GetUserProfile?session=[id]';
export const GET_USER_INFO = '/api/launch/UserDashboard/UserDashboard?id=[id]';
export const UPDATE_USER_INFO = '/api/launch/UserDashboard/PutUserDashboard?id=[id]';
export const UPDATE_STUDY_REGISTRATION = `/api/launch/StudyRegistration/UpdateStudyInfo?userType=[userType]&shouldSubmit=`;
export const UPLOAD_STUDY_REG = '/api/launch/StudyRegistrationDash/StudyRegistrationDashUpload';
export const DI_GET_BUNDLE_FILES = '/api/launch/DataIngest/DataIngestGetFiles';
export const DI_DELETE_BUNDLE = '/api/launch/DataIngest/DataIngestDeleteBundle';
export const DI_SEND_ACKNOWLEDGEMENT = '/api/launch/DataIngest/DataIngestAcknowledgement';
export const SUBMITTER_DELETE_SUBMISSION = '/api/launch/SubmitterDash/SubmitterDashDeleteSubmission';
export const PUT_FILES_TO_WORKBENCH = '/api/launch/ApprovedData/PutFilesToWorkbench?sasFiles=[sasFileIDs]&dataFiles=[dataFileIDs]';
export const MOVE_PUBLIC_TO_WORKBENCH = '/api/launch/PublicData/MovePublicToWorkbench?fileIds=[fileIDs]';
export const LOGIN = `/api/launch/Login/login`;
export const DI_MULTI_UPLOAD = '/api/launch/DataIngest/DataIngestMultiUpload';
export const REFRESH_TOKEN = '/api/launch/SessionToken/SessionToken';
export const DI_SAVE_VALIDATION = '/api/launch/DataIngest/DataIngestSaveValidation';
export const POST_WORKBENCH_ADDON_REQUEST = '/api/launch/ApprovedData/AddonRequest';
export const DI_PREVIOUS_PAGE = `/api/launch/DataIngest/DataIngestPreviousPage`;
export const SUBMIT_STUDY_FILE_REVIEW = `/api/launch/StudyFileSubmission/SubmitStudyFileReview`;
export const WORKBENCH_LINK = `/api/launch/ApprovedData/WorkbenchLink`;
export const GET_METADATA = '/api/launch/StudyOverview/getMetadata?fileId=';
export const UPDATE_WORKBENCH_REQUEST = `/api/launch/ApprovedData/UpdateWorkbenchRequest`;
export const DELETE_MULTIPLE_FILES = `/api/launch/DataIngest/DataIngestDeleteMultiple`;
export const EXPLORER_AUTOCOMPLETE = `/api/launch/StudyExplorer/StudyExplorerAutocomplete`;

// Downloads: baseURL + apiUrl
export const GET_DOCUMENT = `/api/download/v1/download/document?fileId=[fileID]&studyId=[studyID]`;
export const GET_META_DICT_FILE = `/api/download/v1/download/meta-dict?fileId=`;
export const GET_ALL_DOCUMENTS = `/api/download/v1/download/study-documents?studyId=[studyID]`;
export const GET_VARIABLE_REPORT = `/api/download/v1/download/variable-report`;
export const GET_RESOURCE_CENTER_BUCKET = `/radx-s3-resources/`;
export const GET_SELECTED_FILES = '/api/download/v1/download/selected-files?sessionId=[sessionID]&sasFiles=[sasFileIDs]&dataFiles=[dataFileIDs]';
export const GET_SELECTED_PUBLIC_DATA = '/api/download/v1/download/public-data?sessionId=[sessionID]&fileIds=[fileIDs]';
export const GET_INTERNAL_SUPPORT_REQUEST_REPORT = '/api/user/v1/support-request/download-support-request-report?sessionId=[sessionID]';

// Testing new auth errors
export const TESTINGAUTH = `api/launch/test`;
export const LOGOUT = `/api/launch/Logout/Logout`;
