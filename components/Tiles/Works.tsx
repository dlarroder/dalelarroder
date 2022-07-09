import Content from './Content'
import { Tile, TileContent, TileWrapper } from './Tile'

export default function Works() {
  return (
    <TileWrapper numOfPages={3}>
      <TileContent>
        <Tile page={0}>
          <Content />
        </Tile>
      </TileContent>
      <TileContent>
        <Tile page={1}>
          <Content />
        </Tile>
      </TileContent>
      <TileContent>
        <Tile page={2}>
          <Content />
        </Tile>
      </TileContent>
    </TileWrapper>
  )
}
