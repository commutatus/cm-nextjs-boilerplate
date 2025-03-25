"use client";

import { createContext, ReactNode, useContext, useMemo } from "react";
import useAuth from './useAuth';

type GlobalsContextType = Partial<{
  auth: ReturnType<typeof useAuth>;
}>;

const GlobalsContext = createContext<GlobalsContextType>({});

export const GlobalsProvider = ({ children }: { children: ReactNode }) => {
  const authContext = useAuth();

  const contextValue = useMemo(() => {
    return {
      auth: authContext,
    };
  }, [authContext]);

  return (
    <GlobalsContext.Provider value={contextValue}>
      {children}
    </GlobalsContext.Provider>
  );
};

export const useGlobals = () => {
  const contextValue = useContext(GlobalsContext);

  return contextValue;
};
