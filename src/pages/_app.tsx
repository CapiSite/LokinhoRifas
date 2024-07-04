import type { AppProps } from 'next/app'
import '../styles/globals.css'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useState } from 'react'
import * as gtag from '../utils/gtag'
import Footer from '../components/Footer'
import { UserProvider } from '../contexts/UserContext'
import Header from '../components/Header'
import { TextProvider } from '../contexts/TextContext'
import { SidebarStateProvider } from '../contexts/SidebarContext'
import Credits from '../components/Credits'
import Sidebar from '../components/Sidebar'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      <Head>
        <title>Lokinho Skins</title>
      </Head>
      <SidebarStateProvider >
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
  )
}