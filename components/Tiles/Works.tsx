import { WorkBackground } from '../Work/works'
import Content from './Content'
import { Tile, TileBackground, TileContent, TileWrapper } from './Tile'

export type WorkTile = {
  title: string
  description: string
  image: {
    src: string
    width: number
    height: number
  }
}

export default function Works() {
  const workTiles: WorkTile[] = [
    {
      title: `Here is what I've been up to`,
      description: ``,
      image: {
        src: '/static/images/aphex-apps.png',
        width: 600,
        height: 900,
      },
    },
    {
      title: 'Aphex Field',
      description: 'I helped build',
      image: {
        src: '/static/images/field_app.png',
        width: 400,
        height: 400,
      },
    },
    {
      title: 'Aphex Planner',
      description: 'I helped maintain',
      image: {
        src: '/static/images/field_app.png',
        width: 400,
        height: 900,
      },
    },
    {
      title: 'Aphex Publication',
      description: 'I am currently building',
      image: {
        src: '/static/images/field_app.png',
        width: 400,
        height: 900,
      },
    },
  ]

  return (
    <TileWrapper numOfPages={workTiles.length}>
      <TileBackground>
        <WorkBackground />
      </TileBackground>
      <TileContent>
        {workTiles.map((work, i) => (
          <Tile page={i} key={i}>
            <Content work={work} />
          </Tile>
        ))}
      </TileContent>
    </TileWrapper>
  )
}
