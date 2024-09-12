import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import Head from "next/head";
import { useRouter } from "next/router";
import * as gtag from "../utils/gtag";
import Footer from "../components/Footer";
import { UserProvider } from "../contexts/UserContext";
import Header from "../components/Header";
import { TextProvider } from "../contexts/TextContext";
import { SidebarStateProvider } from "../contexts/SidebarContext";
import Credits from "../components/Credits";
import Sidebar from "../components/Sidebar";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    const script = document.createElement("script");
    // script.onload = () => {
    //   // console.log('MercadoPago script loaded');
    //   // console.log('window.MercadoPago:', window.MercadoPago); // Verificar se o objeto MercadoPago está disponível
    // };

    script.src = "https://sdk.mercadopago.com/js/v2";
    script.className = "mercado-pago-sdk";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Lokinho Skins</title>
      </Head>
      <SidebarStateProvider>
        <UserProvider>
          <TextProvider>
            <Header />
            <Component {...pageProps} />
            <Footer />
            <Credits />
            <Sidebar />
          </TextProvider>
        </UserProvider>
      </SidebarStateProvider>
    </>
  );
}
