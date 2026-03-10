"use client";

import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react";
import useAuth from "./useAuth";
import { notification } from "antd";
// import { useApolloClient } from "@apollo/client";
import { AuthPageStates } from "@/modules/auth";
import useCurrentUser from "./useCurrentUser";
import { NotificationInstance } from "antd/es/notification/interface";

type GlobalsContextType = Partial<{
  auth: ReturnType<typeof useAuth>;
  currentUser: ReturnType<typeof useCurrentUser>;
  authPageState: AuthPageStates;
  showVerifyOtp: () => void;
  showLogin: () => void;
  toggleSidebarCollapse: () => void;
  isSidebarCollapsed: boolean;
  handleLogout: () => void;
  notificationApi: NotificationInstance;
}>;

const GlobalsContext = createContext<GlobalsContextType>({});

export const GlobalsProvider = ({ children }: { children: ReactNode }) => {
  // const apolloClient = useApolloClient();
  const authContext = useAuth();
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();

  const [authPageState, setAuthPageState] = useState<AuthPageStates>(
    AuthPageStates.login
  );

  const showVerifyOtp = useCallback(() => {
    setAuthPageState?.(AuthPageStates.verifyOtp);
  }, []);

  const showLogin = useCallback(() => {
    setAuthPageState?.(AuthPageStates.login);
  }, []);

  // const currentUser = useCurrentUser({
  //   authState: authContext.state,
  // });

  const currentUser = undefined;

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebarCollapse = useCallback(() => {
    setIsSidebarCollapsed((prev) => !prev);
  }, []);

  const handleLogout = useCallback(() => {
    authContext.logout();
    // apolloClient.resetStore(); // Clear Apollo cache on logout
    setAuthPageState?.(AuthPageStates.login);
  }, [
    authContext, 
    // apolloClient, 
    setAuthPageState
  ]);

  const contextValue = useMemo(() => {
    return {
      auth: authContext,
      notificationApi,
      currentUser,
      authPageState,
      showVerifyOtp,
      showLogin,
      toggleSidebarCollapse,
      isSidebarCollapsed,
      handleLogout,
    };
  }, [authContext, notificationApi, currentUser, authPageState, showVerifyOtp, showLogin, toggleSidebarCollapse, isSidebarCollapsed, handleLogout]);

  return (
    <GlobalsContext.Provider value={contextValue}>
      {notificationContextHolder}
      {children}
    </GlobalsContext.Provider>
  );
};

export const useGlobals = () => {
  const contextValue = useContext(GlobalsContext);

  return contextValue;
};
