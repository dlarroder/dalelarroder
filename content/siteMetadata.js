const siteMetadata = {
  title: '莱',
  author: '莱',
  headerTitle: '莱',
  description: 'Frontend & LLM Engineer',
  language: 'en-us',
  theme: 'dark', // system, dark or light
  siteUrl: 'https://laial.space/',
  siteRepo: 'https://github.com/alcu1n/',
  siteLogo: '/static/images/logo.png',
  image: '/static/images/l3.svg',
  socialBanner: '/static/images/twitter-card.png',
  email: 'alcuin.ch@gmail.com',
  github: 'https://github.com/alcu1n',
  twitter: 'https://twitter.com/https://x.com/Nonametoregist',
  facebook: 'https://facebook.com/',
  linkedin: 'https://www.linkedin.com/in/',
  spotify: 'https://open.spotify.com/user/ybol7447wsahmmuu51a3f21iv',
  instagram: 'https://www.instagram.com/alcuin.ch/',
  steam: 'https://steamcommunity.com/',
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

export default siteMetadata;
