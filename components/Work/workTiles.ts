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
    description: `Here is`,
    title: `what I've been up to`,
    image: {
      src: '/static/images/aphex-apps.webp',
      width: 600,
      height: 770,
    },
  },
  {
    description: 'I helped build',
    title: 'Aphex Field',
    image: {
      src: '/static/images/field-app.webp',
      width: 600,
      height: 554,
    },
  },
  {
    description: 'I helped maintain',
    title: 'Aphex Planner',
    image: {
      src: '/static/images/planner-app.webp',
      width: 600,
      height: 717,
    },
  },
  {
    description: `I'm currently building`,
    title: 'Aphex Publication',
    image: {
      src: '/static/images/publication-app.webp',
      width: 600,
      height: 717,
    },
  },
]
