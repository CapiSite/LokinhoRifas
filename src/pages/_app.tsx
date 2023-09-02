import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Analytics from '@/Components/Analytics'
import * as gtag from '../lib/gtag'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    function handleRouteChange(url: any) {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
    return (
    <>
      <Head>
        <title>Lokinho Skins</title>
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
