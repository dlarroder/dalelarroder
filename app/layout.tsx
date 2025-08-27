import '@/css/prism.css';
import '@/css/tailwind.css';
import '@fontsource/mukta';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { MobileNavProvider } from '@/components/MobileNavContext';
import MobileNavOverlay from '@/components/MobileNavOverlay';
import LenisProvider from '@/components/Providers/LenisProvider';
import ThemeProvider from '@/components/Providers/ThemeProvider';

export const metadata = {
  title: '莱',
  description: 'Exploring the frontiers of AI and the web.',
  metadataBase: new URL('https://laial.space'),
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
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body className="bg-white text-black antialiased dark:bg-black dark:text-white">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <MobileNavProvider>
            <Header />
            <MobileNavOverlay />
            <LenisProvider>
              <main>{children}</main>
            </LenisProvider>
            <Footer />
          </MobileNavProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
