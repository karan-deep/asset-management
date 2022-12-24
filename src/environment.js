export const environment = {
  apiBasePath: !!window.REACT_APP_SERVER_PORT
    ? `${window.REACT_APP_SERVER_BASE_URL}:${window.REACT_APP_SERVER_PORT}/api`
    : `${window.REACT_APP_SERVER_BASE_URL}/api`,
};
