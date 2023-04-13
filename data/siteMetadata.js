const siteMetadata = {
  title: 'Frank Omondi',
  author: 'Frank Omondi',
  headerTitle: 'FrankOmondi',
  description: 'Software Developer | Ethical AI',
  language: 'en-us',
  theme: 'dark', // system, dark or light
  siteUrl: 'https://crepant.com',
  siteRepo: 'https://github.com/dofften/dalelarroder-portfolio',
  siteLogo: '/static/images/logo.png',
  image: '/static/images/avatar.webp',
  socialBanner: '/static/images/twitter-card.png',
  email: 'frankomondi311@gmail.com',
  github: 'https://github.com/dofften',
  twitter: 'https://twitter.com/dofften',
  facebook: 'https://facebook.com/',
  linkedin: 'https://www.linkedin.com/in/frederick-omondi/',
  spotify: 'https://open.spotify.com/',
  steam: 'https://steamcommunity.com/',
  contactme: 'mailto:frankomondi311@gmail.com',
  locale: 'en-US',
  comment: {
    provider: 'giscus',
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO || '',
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID || '',
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY || '',
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || '',
      mapping: 'pathname',
      reactions: '1',
      metadata: '0',
      theme: 'light',
      darkTheme: 'transparent_dark',
      themeURL: '',
    },
  },
}

module.exports = siteMetadata
