import {
  getUserSession
} from '../sagas/apiCalls';

let userInfoCache = {};

export const openAuthorizationPopupWindow = (url) => {
  window.open(url, url, 'toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=800,height=600');
};

export const cacheUserInfo = (userInfo) => {
  userInfoCache = Object.assign({}, userInfo);
}

export const getUserJWT = () => {
  return userInfoCache.jwt;
}

export const authorizeUser = (integrationUrl) => {
  const jwt = getUserJWT();
  
  getUserSession(integrationUrl, jwt)
    .then((userSession) => {
      if (userSession.status == 401 && userSession.data.properties != null && 
          userSession.data.properties.authorizationUrl != null) {
          const authorizationUrl = userSession.data.properties.authorizationUrl;
          openAuthorizationPopupWindow(authorizationUrl);
      }
  });
};
