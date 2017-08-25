import {
  getUserSession
} from '../sagas/apiCalls';

export const openAuthorizationPopupWindow = (url) => {
  window.open(url, url, 'toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=800,height=600');
};

export const getUserJWT = () => {
  // Robson will work here...
  return '';
};

export const authorizeUser = (integrationUrl) => {
  getUserJWT()
  .then((jwt) => {
    getUserSession(integrationUrl, jwt)
    .then((userSession) => {
        if (userSession.status == 401) {
            if (userSession.data.properties != null && userSession.data.properties.authorizationUrl != null) {
                const authorizationUrl = userSession.data.properties.authorizationUrl;
                openAuthorizationPopupWindow(authorizationUrl);
            }
        }
    });
  });
};
