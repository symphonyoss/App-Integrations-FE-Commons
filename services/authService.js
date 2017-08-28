let userInfoCache = {};

export const cacheUserInfo = (userInfo) => {
  userInfoCache = Object.assign({}, userInfo);
}

export const getUserJWT = () => {
  return userInfoCache.jwt;
}