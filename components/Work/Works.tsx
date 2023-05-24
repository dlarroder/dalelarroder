import { Tile } from '../Tiles/Tile'
import TileBackground from '../Tiles/TileBackground'
import TileWrapper from '../Tiles/TileWrapper'
import { WorkBackground } from './WorkBackground'
import WorkContent from './WorkContent'
import { workTiles } from './workTiles'

export default function Works() {
  return (
    <TileWrapper numOfPages={workTiles.length}>
      <div data-scroll data-scroll-sticky data-scroll-target="#about">
        <TileBackground>
          <WorkBackground />
        </TileBackground>
        {workTiles.map((work, i) => (
          <Tile page={i} key={work.title}>
            <WorkContent work={work} />
          </Tile>
        ))}
      </div>
    </TileWrapper>
  )
}
