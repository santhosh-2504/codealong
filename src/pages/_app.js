// import "@/styles/globals.css";
// import ErrorBoundary from "@/components/ErrorBoundary";
// export default function App({ Component, pageProps }) {
//   return (
//     <ErrorBoundary>
//       <Component {...pageProps} />
//     </ErrorBoundary>
//   );
// }

import "@/styles/globals.css";
import ErrorBoundary from "@/components/ErrorBoundary";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/codealong.ico" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </>
  );
}
