import useMSClarity from "@/common/hooks/useMSClarity";
import "@/common/styles/globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  useMSClarity();
  return (
    <>
      {process.env.NEXT_PUBLIC_GTM_CONTAINER_ID ? (
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_CONTAINER_ID} />
      ) : null}
      <Component {...pageProps} />
    </>
  );
}
