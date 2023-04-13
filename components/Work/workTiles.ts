export type WorkTile = {
  title: string
  description: string
  image: {
    src: string
    width: number
    height: number
  }
}

export const workTiles: WorkTile[] = [
  {
    description: `Here are things`,
    title: `I've worked on`,
    image: {
      src: '/static/images/dofften-apps.png',
      width: 600,
      height: 770,
    },
  },
  {
    description: 'I built',
    title: 'examGPT',
    image: {
      src: '/static/images/examgpt-app.png',
      width: 600,
      height: 554,
    },
  },
  {
    description: `I built a forecasting tool`,
    title: 'ILINAF',
    image: {
      src: '/static/images/ilinaf-app.png',
      width: 600,
      height: 717,
    },
  },
  {
    description: `I built an assessment system`,
    title: 'LOAS',
    image: {
      src: '/static/images/loas-app.png',
      width: 600,
      height: 717,
    },
  },
]
