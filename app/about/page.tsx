import path from 'path';
import { Fragment, Suspense } from 'react';
import GithubContributions from '../../components/GithubContributions/GithubContributions';
import TopTracks from '../../components/Spotify/TopTracks';
import { readMDXFile } from '../blog/utils';
import { CustomMDX } from '../components/mdx';
import Occupation from './occupation';

const contentPath = path.join(process.cwd(), 'app', 'about', 'content.mdx');
const { content } = readMDXFile(contentPath);

export default function Page() {
  return (
    <Fragment>
      <Occupation />
      <CustomMDX source={content} />
      <GithubContributions />

      <Suspense fallback="loading..">
        <TopTracks />
      </Suspense>
    </Fragment>
  );
}
