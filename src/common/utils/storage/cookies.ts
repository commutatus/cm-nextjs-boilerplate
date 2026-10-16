import Cookies from "universal-cookie";

const cookies = new Cookies(null, { path: "/" });

export type CookieOptions = {
  maxAge?: number;
};

export const setCookie = (key: string, value: string, options?: CookieOptions) => {
  cookies.set(key, value, {
    path: "/",
    sameSite: "lax",
    secure: true,
    ...options,
  });
};

export const getCookie = (key: string) => {
  return cookies.get(key);
};

export const removeCookie = (key: string) => {
  cookies.remove(key, { path: "/" });
};
