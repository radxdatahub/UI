export const NotificationType = {
    ERROR: 'ERROR',
    WARNING: 'WARNING',
    NORMAL: 'NORMAL',
    SUCCESS: 'SUCCESS',
};

export const BaseNotification = {
    type: NotificationType.NORMAL,
    message: '',
    delay: 8000,
};

export const ErrorMessage = {
    400: 'To access this information, please log in using your RAS credentials.',
    401: 'Your current session has expired. To continue using features, such as My Approved Data and the Analytics Workbench, please log in with your RAS credentials.',
    // eslint-disable-next-line max-len
    403: `You do not have the right permissions to access this resource. If you believe you need to change your permissions, please contact the RADx Data Hub Support Team by using the 'Contact Us' link in the navigation bar.`,
    500: 'Your request failed due to a system error. Please try again. If you continue to experience problems, please reach out to the RADx Data Hub Support Team.',
};
