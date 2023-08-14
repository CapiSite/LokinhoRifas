import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
    return (
    <>
      <Head>
        <title>Lokinho Skins</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
        <link rel="icon" href="/favicon.ico" type="image/x-icon"/>
        </Head>
      <Component {...pageProps} />
    </>
  )
}
