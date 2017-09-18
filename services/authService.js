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
  let token;

  return getUserJWT()
    .then((data) => {
      token = data;
      return getUserSession(integrationUrl, token);
    })
    .then(() => {
      return Promise.resolve({
        success: true,
        jwt: token,
      });
    })
    .catch((error) => {
      const response = error.response || {};
      if (response.status === 401) {
        const userSession = response.data || {};
        const properties = userSession.properties || {};
        if (properties.authorizationUrl != undefined) {
          openAuthorizationPopupWindow(properties.authorizationUrl);

          return Promise.resolve({
            success: false,
          });
        }

        throw error;
      }

      throw error;
    });
};
