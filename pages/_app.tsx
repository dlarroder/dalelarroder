import '@/css/prism.css'
import '@/css/tailwind.css'
import '@fontsource/dm-sans'
import '@fontsource/merriweather'

import { ScrollObserver } from '@/components/ScrollObserver'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import useLogRocket from './useLogRocket'

export default function App({ Component, pageProps }: AppProps) {
  useLogRocket()
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <ScrollObserver>
        <ScrollProgressBar />
        <Component {...pageProps} />
      </ScrollObserver>
    </ThemeProvider>
  )
}
