import {
  getUserSession
} from '../sagas/apiCalls';

let userInfoCache = {};

export const openAuthorizationPopupWindow = (url) => {
  const popup = window.open(url, url, 'toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=800,height=600');
  setTimeout(() => {
    if(!popup || popup.outerHeight === 0) {
      alert("Popup Blocker is enabled! Please add this site to your exception list and try again.");
    }
  }, 25);
};

export const cacheUserInfo = (userInfo) => {
  userInfoCache = Object.assign({}, userInfo);
}

export const getUserJWT = () => {
  return Promise.resolve(userInfoCache.jwt);
}

export const authorizeUser = (integrationUrl) => {
  getUserJWT()
  .then((jwt) => {
    getUserSession(integrationUrl, jwt)
    .then(() => {
      return Promise.resolve(true);
    })
    .catch((err) => {
      if (err.response.status == 401) {
        const userSession = err.response;
        if (userSession.data.properties != null && userSession.data.properties.authorizationUrl != null) {
          const authorizationUrl = userSession.data.properties.authorizationUrl;
          openAuthorizationPopupWindow(authorizationUrl);
          return Promise.resolve(false);
        }
      } else {
        throw err;
      }      
    });
  });
};
