import {
  ACCESS_TOKEN_KEY,
  getCookie,
  REFRESH_TOKEN_KEY,
  removeCookie,
  setCookie,
} from "@/common/utils/storage";

const ACCESS_TOKEN_MAX_AGE_IN_SECONDS = 2 * 60 * 60; // 2 hours
const REFRESH_TOKEN_MAX_AGE_IN_SECONDS = 180 * 24 * 60 * 60; // ~6 months (180 days)

export const getAccessToken = () => {
  return getCookie(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = () => {
  return getCookie(REFRESH_TOKEN_KEY);
};

export const updateAccessToken = (accessToken: string) => {
  setCookie(ACCESS_TOKEN_KEY, accessToken, {
    maxAge: ACCESS_TOKEN_MAX_AGE_IN_SECONDS,
  });
};

export const updateRefreshToken = (refreshToken: string) => {
  setCookie(REFRESH_TOKEN_KEY, refreshToken, {
    maxAge: REFRESH_TOKEN_MAX_AGE_IN_SECONDS,
  });
};

export const removeApiTokens = () => {
  removeCookie(ACCESS_TOKEN_KEY);
  removeCookie(REFRESH_TOKEN_KEY);
};
