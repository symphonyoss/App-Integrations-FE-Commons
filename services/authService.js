import {
  getUserSession
} from '../sagas/apiCalls';

let userInfoCache = {};
let MILLIS_TO_WAIT = 1000;
let MAX_NUM_OF_ATTEMPTS = 10;

export const openAuthorizationPopupWindow = (url) => {
  const popup = window.open(url, url, 'toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=800,height=600');
  if (!popup || popup.outerHeight === 0) {
    alert("Popup Blocker is enabled! Please add this site to your exception list and try again.");
    return false;
  }
  return true;
}

export const cacheUserInfo = (userInfo) => {
  userInfoCache = Object.assign({}, userInfo);
}

export const getUserJWT = () => {
  return Promise.resolve(userInfoCache.jwt);
}

export const pollUserInfo = (integrationUrl, token) => {
    var attempts = 0;
    var promise = new Promise(function(resolve) {
        var interval = setInterval(() => {
            getUserSession(integrationUrl, token, false)
            .then(() => {
                // 200 - OK, return to the previous flow
                clearInterval(interval);
                resolve({
                  success: success,
                  jwt: token,
                });
            })
            .catch((error) => {
                const response = error.response || {};
                if (response.status !== 401) {
                    clearInterval(interval);
                    throw error;
                }
                // 401, keep polling
                if (++attempts >= MAX_NUM_OF_ATTEMPTS) {
                    clearInterval(interval);
                    resolve(false);
                }
            })
        }, MILLIS_TO_WAIT);
    });
    return promise;
}

export const authorizeUser = (integrationUrl) => {
  let token;

  return getUserJWT()
    .then((data) => {
      token = data;
      return getUserSession(integrationUrl, token, true);
    })
    .then(() => {
      return Promise.resolve({
        success: true,
        jwt: token,
      });
    })
    .catch((error) => {
      const response = error.response || {};
      if (response.status == 401) {
        const userSession = response.data || {};
        const properties = userSession.properties || {};
        if (properties.authorizationUrl != undefined) {
          if (openAuthorizationPopupWindow(properties.authorizationUrl)) {
            // we are polling this until we get a 200 or reach MAX_NUM_OF_ATTEMPTS
            return pollUserInfo(integrationUrl, token);
          }
        }
        return Promise.resolve({
          success: false,
        });
      }

      throw error;
    });
};
