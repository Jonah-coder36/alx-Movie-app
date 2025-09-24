import type { AppProps } from "next/app";
import { FavoritesProvider } from "../context/FavoritesContext";
import { AuthProvider } from "../context/AuthContext";
import Head from "next/head";
import GlobalStyles from "../styles/GlobalStyles";
import Header from "../components/Header";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Alx Movies</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AuthProvider>
        <FavoritesProvider>
          <GlobalStyles />
          <Header />
          <Component {...pageProps} />
        </FavoritesProvider>
      </AuthProvider>
    </>
  );
}

