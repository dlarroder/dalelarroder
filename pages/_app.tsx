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
import Scroll from 'locomotive-scroll'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { LocomotiveScrollProvider } from 'react-locomotive-scroll'
import Preloader from '../components/Preloader'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <LocomotiveScrollProvider
        options={{
          smooth: true,
          lerp: 0.07,
          smartphone: {
            smooth: true,
          },
          tablet: {
            smooth: true,
            breakpoint: 1024,
          },
        }}
        watch={[]}
        location={router.asPath}
        containerRef={scrollRef}
        onLocationChange={(scroll: Scroll) => {
          scroll.scrollTo(0, { duration: 250, disableLerp: true })
        }}
        onUpdate={() => undefined}
      >
        <main data-scroll-container ref={scrollRef}>
          <AnimatePresence mode="wait">
            {loading && <Preloader setLoading={setLoading} />}
          </AnimatePresence>
          <AnimatePresence mode="wait" initial={false}>
            <ScrollObserver>
              <LogRocket />
              <ProgressBar />
              <Component {...pageProps} />
              <Analytics />
            </ScrollObserver>
          </AnimatePresence>
        </main>
      </LocomotiveScrollProvider>
    </ThemeProvider>
  )
}
