import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/favicon.ico" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon.ico" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon.ico" />
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="theme-color" content="#000000" />
          <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            rel="preload"
            as="font"
            href="fonts/Merriweather/Merriweather-Black.ttf"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            as="font"
            href="fonts/Merriweather/Merriweather-Bold.ttf"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            as="font"
            href="fonts/Merriweather/Merriweather-Italic.ttf"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            as="font"
            href="fonts/Merriweather/Merriweather-Light.ttf"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            as="font"
            href="fonts/Merriweather/Merriweather-Regular.ttf"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            as="font"
            href="fonts/DMSans/DMSans-Bold.ttf"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            as="font"
            href="fonts/DMSans/DMSans-Italic.ttf"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            as="font"
            href="fonts/DMSans/DMSans-Medium.ttf"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            as="font"
            href="fonts/DMSans/DMSans-MediumItalic.ttf"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            as="font"
            href="fonts/DMSans/DMSans-Regular.ttf"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css"
            integrity="sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc"
            crossOrigin="anonymous"
          />
        </Head>
        <body className="antialiased text-black bg-white dark:bg-black dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
