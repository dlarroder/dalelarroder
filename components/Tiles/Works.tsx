import { Tile, TileContent, TileWrapper } from './Tile'

export default function Works() {
  return (
    <TileWrapper numOfPages={3}>
      <TileContent>
        <Tile
          page={0}
          renderContent={({ progress }) => <span className="text-9xl">Foo {progress}</span>}
        />
      </TileContent>
      <TileContent>
        <Tile
          page={1}
          renderContent={({ progress }) => <span className="text-9xl">Bar {progress}</span>}
        />
      </TileContent>
      <TileContent>
        <Tile
          page={2}
          renderContent={({ progress }) => <span className="text-9xl">Zoo {progress}</span>}
        />
      </TileContent>
    </TileWrapper>
  )
}
