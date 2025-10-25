import { Tile } from '../tiles/tile';
import TileBackground from '../tiles/tile-background';
import { TileContent } from '../tiles/tile-content';
import TileWrapper from '../tiles/tile-wrapper';
import { WorkBackground } from './work-background';
import WorkContent from './work-content';
import { workTiles } from './workTiles';

export default function Works() {
	return (
		<TileWrapper numOfPages={workTiles.length}>
			<TileBackground>
				<WorkBackground />
			</TileBackground>
			<TileContent>
				{workTiles.map((work, i) => (
					<Tile page={i} key={work.title}>
						<WorkContent work={work} />
					</Tile>
				))}
			</TileContent>
		</TileWrapper>
	);
}
