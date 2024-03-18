import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import * as gtag from '../utils/gtag'
import TopHeader from './about/components/TopHeader'
import Footer from './about/components/Footer'

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
      <TopHeader/>
      <Component {...pageProps}/>
      <Footer/>
    </>
  )
}
