import {
  getUserSession
} from '../sagas/apiCalls';

export const openAuthorizationPopupWindow = (url) => {
    window.open(url, url, 'toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=800,height=600');
};

export const authorizeUser = (integrationUrl) => {
  // receive Robson's JWT here
  const jwt = '';
  const us = getUserSession(integrationUrl, jwt);
  if (us.status == 401) {
      if (us.data.properties != null && us.data.properties.authorizationUrl != null) {
          const authorizationUrl = us.data.properties.authorizationUrl;
          openAuthorizationPopupWindow(authorizationUrl);
      }
  }
};