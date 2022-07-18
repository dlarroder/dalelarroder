import '@/css/prism.css'
import '@/css/tailwind.css'
import '@fontsource/dm-sans'
import '@fontsource/merriweather'

import { ScrollObserver } from '@/components/ScrollObserver'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import useLogRocket from '../lib/hooks/useLogRocket'

export default function App({ Component, pageProps }: AppProps) {
  const ProgressBar = dynamic(() => import('@/components/ProgressBar/ProgressBar'), { ssr: false })

  useLogRocket()

  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <ScrollObserver>
        <ScrollProgressBar />
        <ProgressBar />
        <Component {...pageProps} />
      </ScrollObserver>
    </ThemeProvider>
  )
}
