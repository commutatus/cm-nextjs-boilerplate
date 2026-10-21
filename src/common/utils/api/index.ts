import {
  ACCESS_TOKEN_KEY,
  getCookie,
  REFRESH_TOKEN_KEY,
  removeCookie,
  setCookie,
} from "@/common/utils/storage";

const AUTH_TOKEN_MAX_AGE_IN_SECONDS = 6 * 30 * 24 * 60 * 60; // ~6 months (180 days)

export const getAccessToken = () => {
  return getCookie(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = () => {
  return getCookie(REFRESH_TOKEN_KEY);
};

export const updateAccessToken = (accessToken: string) => {
  setCookie(ACCESS_TOKEN_KEY, accessToken, {
    maxAge: AUTH_TOKEN_MAX_AGE_IN_SECONDS,
  });
};

export const updateRefreshToken = (refreshToken: string) => {
  setCookie(REFRESH_TOKEN_KEY, refreshToken, {
    maxAge: AUTH_TOKEN_MAX_AGE_IN_SECONDS,
  });
};

export const removeApiTokens = () => {
  removeCookie(ACCESS_TOKEN_KEY);
  removeCookie(REFRESH_TOKEN_KEY);
};
