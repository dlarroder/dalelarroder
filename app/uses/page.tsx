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
			<MDX code={usesPage.mdx} />
		</Fragment>
	);
}
