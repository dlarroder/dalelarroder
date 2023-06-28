import { Suspense } from 'react';
import Line from '../../components/Line';
import SectionContainer from '../../components/SectionContainer';
import TopTracks from '../../components/Spotify/TopTracks';

export default function Page() {
  return (
    <div>
      {/* <HeroV2 /> */}
      <Line />
      <SectionContainer>
        <Suspense fallback="loading..">
          <TopTracks />
        </Suspense>
      </SectionContainer>
    </div>
  );
}
