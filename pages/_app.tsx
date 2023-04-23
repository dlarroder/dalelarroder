import '@/css/prism.css'
import '@/css/tailwind.css'
import '@fontsource/mukta'

import LogRocket from '@/components/Logrocket'
import ProgressBar from '@/components/ProgressBar'
import { ScrollObserver } from '@/components/ScrollObserver'
import siteMetadata from '@/data/siteMetadata'
import { Analytics } from '@vercel/analytics/react'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <AnimatePresence exitBeforeEnter initial={false}>
        <ScrollObserver>
          <LogRocket />
          <ProgressBar />
          <Component {...pageProps} />
          <Analytics />
        </ScrollObserver>
      </AnimatePresence>
    </ThemeProvider>
  )
}
