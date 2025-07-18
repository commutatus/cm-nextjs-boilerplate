import "@ant-design/v5-patch-for-react-19";
import "@/common/styles/globals.css";
import type { AppProps } from "next/app";
import { MockedProvider } from "@apollo/client/testing";
import { mocks } from "@/common/graphql/mock-data";

export default function App({ Component, pageProps }: AppProps) {
  return (
    // TODO: Replace the MockedProvider with ApolloProvider
    <MockedProvider mocks={mocks}>
      <Component {...pageProps} />
    </MockedProvider>
  );
}
