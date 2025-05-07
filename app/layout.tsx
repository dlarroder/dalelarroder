import '@/css/prism.css';
import '@/css/tailwind.css';
import '@fontsource/mukta';

import Analytics from '@/components/Analytics';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LenisProvider from '@/components/Providers/LenisProvider';
import ThemeProvider from '@/components/Providers/ThemeProvider';

export const metadata = {
  title: 'Xoco Café',
  description: 'Sabor ancestral, placer eterno',
  metadataBase: new URL('https://xococafe.netlify.app'),
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/CafeIcon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/CafeIcon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/CafeIcon.png" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-black antialiased dark:bg-black dark:text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          themes={['dark', 'light']}
        >
          <Header />
          <LenisProvider>
            <main>{children}</main>
          </LenisProvider>
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
