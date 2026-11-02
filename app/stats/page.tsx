import { Fragment, Suspense } from 'react';
import GithubContributions from '../components/github-contributions/github-contributions';
import Header from '../components/header';
import NowPlaying from '../components/spotify/now-playing';
import SpotifySkeleton from '../components/spotify/spotify-skeleton';
import TopTracks from '../components/spotify/top-tracks';
import WakaStats from '../components/wakatime/wakastats';
import WakatimeSkeleton from '../components/wakatime/wakatime-skeleton';

export const metadata = {
	title: 'Stats',
	description: 'My Stats - Dale Larroder',
};

export default function StatsPage() {
	return (
		<Fragment>
			<Header title='Stats' />
			<p className='text-lg leading-7 text-gray-500 dark:text-gray-400'>
				A few numbers on how I spend my days: commits, keystrokes and songs on
				repeat.
			</p>

			{/* Spacing lives here rather than in each section: the page gap plus
			    mt-4 above the first section, then gap-4 between sections */}
			<section className='mt-4 flex flex-col gap-4'>
				<GithubContributions />
				<Suspense
					fallback={
						<Fragment>
							<WakatimeSkeleton />
							<SpotifySkeleton />
						</Fragment>
					}
				>
					<WakaStats />
					<TopTracks />
				</Suspense>
				<NowPlaying />
			</section>
		</Fragment>
	);
}
