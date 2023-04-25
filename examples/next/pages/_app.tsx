import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../global.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>React & Next.js Example</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
