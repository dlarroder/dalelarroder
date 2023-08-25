const siteMetadata = {
  title: 'expertlaravel.com',
  author: 'Expert laravel2',
  headerTitle: 'Expert laravel3',
  description: 'Expert Laravel developer 4',
  language: 'en-us',
  theme: 'dark', // system, dark or light
  siteUrl: 'https://expertlaravel.com',
  siteRepo: 'https://github.com/tpjigar',
  siteLogo: '/static/images/logo.png',
  image: '/static/images/avatar.webp',
  socialBanner: '/static/images/twitter-card.png',
  email: 'tp.jigar@gmail.com',
  github: 'https://github.com/tpjigar',
  twitter: 'https://twitter.com/jigar24_patel',
  // facebook: 'https://facebook.com',
  linkedin: 'https://www.linkedin.com/in/jigar24patel',
  // spotify: 'https://spotify.com/',
  steam: '#',
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
};

module.exports = siteMetadata;
