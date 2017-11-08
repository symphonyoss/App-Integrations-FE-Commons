import {
  getUserSession
} from '../sagas/apiCalls';

let userInfoCache = {};
let MILLIS_TO_WAIT = 2000;
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

export const sleep = (ms) => {
  let start = new Date().getTime(), expire = start + ms;
  while (new Date().getTime() < expire) { }
  return;
}

export const pollUserInfo = (attempts, integrationUrl, token) => {
  return getUserSession(integrationUrl, token, false)
    .then(() => {
      // 200 - OK, return to the previous flow
      console.log('Returning true...');
      return true;
    })
    .catch((error) => {
      const response = error.response || {};
      // 401, keep polling
      if (response.status != 401) {
        throw error;
      }
      // Setup the next poll recursively
      if (++attempts < MAX_NUM_OF_ATTEMPTS) {
        console.log('Attempt number ' + attempts);
        sleep(MILLIS_TO_WAIT);
        return pollUserInfo(attempts, integrationUrl, token);
      } else {
        console.log('Returning false...');
        return false;
      }
    });
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
      console.log('Error handling inside authorizeUser');
      const response = error.response || {};
      if (response.status == 401) {
        console.log('Response 401');
        const userSession = response.data || {};
        const properties = userSession.properties || {};
        if (properties.authorizationUrl != undefined) {
          console.log('There is a valid auth URL');
          if (openAuthorizationPopupWindow(properties.authorizationUrl)) {
            console.log('Opening window');
            // we are polling this until we get a 200 or reach MAX_NUM_OF_ATTEMPTS
            return pollUserInfo(0, integrationUrl, token).then((success) => {
              console.log('Returning success: ' + success + ' and jwt: ' + token);
              return Promise.resolve({
                success: success,
                jwt: token,
              });
            });
          }
        }
        console.log('Returning sucess == false');
        return Promise.resolve({
          success: false,
        });
      }

      throw error;
    });
};
