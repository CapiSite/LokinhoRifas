import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useState } from 'react'
import * as gtag from '../utils/gtag'
import TopHeader from './about/components/TopHeader'
import Footer from './about/components/Footer'
import NavBar from './about/components/NavBar'
import { UserProvider } from '../utils/contextUser'
import Header from './about/components/Header'
import PopUpChangeInformation from '../components/pop-up-change-information'
import { TextProvider } from '../utils/contextText'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [popUpInfo,setPopUpInfo] = useState(false);

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
      <UserProvider>
        <TextProvider>
        <TopHeader />
        <NavBar setPopUpInfo={setPopUpInfo}/>
        <Component {...pageProps} />
        <Footer />
         {popUpInfo && <PopUpChangeInformation setPopUpInfo={setPopUpInfo} />}  
         </TextProvider>
      </UserProvider>
    
    </>
  )
}