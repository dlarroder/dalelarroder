import path from 'node:path';
import { Fragment } from 'react';
import Header from '../components/header';
import { CustomMDX } from '../components/mdx';
import { readMDXFile } from '../thoughts/utils';
import UsesTitle from './uses-title';

const contentPath = path.join(process.cwd(), 'app', 'uses', 'content.mdx');

export const metadata = {
	title: 'Uses',
	description: 'What I use',
};

export default function Page() {
	// Read per render (not at module load) so edits show up without a server restart
	const { content } = readMDXFile(contentPath);

	return (
		<Fragment>
			<Header title='Uses' />
			<UsesTitle />
			<CustomMDX source={content} />
		</Fragment>
	);
}
