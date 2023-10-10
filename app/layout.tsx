import '@/css/prism.css';
import '@/css/tailwind.css';
import '@fontsource/mukta';

import Analytics from '@/components/Analytics';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
// import LogRocket from '@/components/LogRocket';
import LenisProvider from '@/components/Providers/LenisProvider';
import ThemeProvider from '@/components/Providers/ThemeProvider';

export const metadata = {
  title: 'Expert Laravel',
  description: 'Coding the Future: Empowering Innovation as a Full Stack Developer',
  canonical: 'https://expertlaravel.com',
  images: ['https://picsum.photos/200/300'],
  authors: 'Jigar Patel',
  openGraph: {
    locale: 'en_US',
    type: 'website',
    url: 'https://www.expertlaravel.com/',
    title: 'Expert Laravel',
    description: 'Expert Laravel Portfolio Website',
    siteName: 'Expert Laravel',

    images: [
      {
        url: 'https://example.com/og.png',
        width: '800',
        height: '600',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expert Laravel',
    site: '@jbcodeapp',
    description: 'Expert Laravel Portfolio Website',
    image: 'https://example.com/twitter-card.png',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon.ico" />
        <link rel="profile" href="https://gmpg.org/xfn/11" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />

        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body className="bg-white text-black antialiased dark:bg-black dark:text-white">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Header />
          <LenisProvider>
            <main>{children}</main>
          </LenisProvider>
          <Footer />
          {/* <LogRocket /> */}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
