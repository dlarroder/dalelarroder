import '@/css/locomotive.scss'
import '@/css/prism.scss'
import '@/css/tailwind.scss'
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
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import useLocomotiveScroll from '../components/useLocomotiveScroll'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const [locomotiveScrollRef] = useLocomotiveScroll({
    ref: scrollRef,
    smooth: true,
  })

  useEffect(() => {
    locomotiveScrollRef?.update()
  }, [router.route, router.asPath, router.isReady, router.reload])

  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <main ref={scrollRef} data-scroll-container>
        <AnimatePresence mode="wait" initial={false}>
          <ScrollObserver locomotiveScroll={locomotiveScrollRef}>
            <LogRocket />
            <ProgressBar />
            <Component {...pageProps} />
            <Analytics />
          </ScrollObserver>
        </AnimatePresence>
      </main>
    </ThemeProvider>
  )
}
