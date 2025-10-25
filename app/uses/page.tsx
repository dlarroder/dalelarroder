import path from 'node:path';
import { Fragment } from 'react';
import Header from '../components/header';
import { CustomMDX } from '../components/mdx';
import { readMDXFile } from '../thoughts/utils';
import UsesTitle from './uses-title';

const contentPath = path.join(process.cwd(), 'app', 'uses', 'content.mdx');
const { content } = readMDXFile(contentPath);

export const metadata = {
	title: 'Uses',
	description: 'What I use',
};

export default function Page() {
	return (
		<Fragment>
			<Header title='Uses' />
			<UsesTitle />
			<CustomMDX source={content} />
		</Fragment>
	);
}
