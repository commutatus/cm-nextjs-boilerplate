"use client";

import {
  getAccessToken,
  getRefreshToken,
  removeApiTokens,
  updateAccessToken,
  updateRefreshToken,
} from "@/common/utils/api";
import { useEffect, useState } from "react";

export enum AuthStatesEnum {
  initial = "initial",
  loggedOut = "loggedOut",
  loggedIn = "loggedIn",
}

const useAuth = () => {
  const [authState, setAuthState] = useState(AuthStatesEnum.initial);

  useEffect(() => {
    let nextAuthState = AuthStatesEnum.loggedOut;

    const hasAccessToken = Boolean(getAccessToken());
    const hasRefreshToken = Boolean(getRefreshToken());
    if (hasAccessToken && hasRefreshToken) {
      nextAuthState = AuthStatesEnum.loggedIn;
    }

    setAuthState(nextAuthState);
  }, []);

  const onLoginSuccess = ({
    accessToken,
    refreshToken,
  }: {
    accessToken?: string | null;
    refreshToken?: string | null;
  }) => {
    if (!accessToken || !refreshToken) {
      return;
    }

    updateAccessToken(accessToken);
    updateRefreshToken(refreshToken);
    setAuthState(AuthStatesEnum.loggedIn);
  };

  const handleLogout = () => {
    removeApiTokens();
    setAuthState(AuthStatesEnum.loggedOut);
  };

  return {
    state: authState,
    logout: handleLogout,
    onLoginSuccess,
  };
};

export default useAuth;
