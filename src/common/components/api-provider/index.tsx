"use client";

import { ApolloProvider } from "@apollo/client";
import client from "@/apollo/apollo-client";
import { ReactNode } from "react";

export const ApiProvider = ({ children }: {children: ReactNode}) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
