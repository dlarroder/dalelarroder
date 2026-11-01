import { usesPage } from 'content-collections';
import { Fragment } from 'react';
import Header from '../components/header';
import { MDX } from '../components/mdx';
import UsesTitle from './uses-title';

export const metadata = {
	title: 'Uses',
	description: 'What I use',
};

export default function Page() {
	return (
		<Fragment>
			<Header title='Uses' />
			<UsesTitle />
			{/* Like posts, so content spacing comes from MDX styles, not the page
			    gap; mt-2 keeps the intro 32px above the first section, as on /stats */}
			<article className='mt-2'>
				<MDX code={usesPage.mdx} />
			</article>
		</Fragment>
	);
}
