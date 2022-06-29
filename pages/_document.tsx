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
            href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Merriweather:wght@300;400;700&display=swap"
            rel="stylesheet"
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
