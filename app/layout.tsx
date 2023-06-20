import '@/css/prism.css';
import '@/css/tailwind.css';
import '@fontsource/mukta';

import Header from '@/components/Header';
import SectionContainer from '@/components/SectionContainer';
import ThemeProvider from 'app/components/ThemeProvider';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Dale Larroder',
  description: 'I build things for the web.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
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
          <SectionContainer>
            <Header />
          </SectionContainer>
          <main>{children}</main>
          <SectionContainer>
            <Footer />
          </SectionContainer>
        </ThemeProvider>
      </body>
    </html>
  );
}
