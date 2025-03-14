import { Fragment, ReactNode } from 'react';
import SectionContainer from '../../components/layouts/section-container';
import ScrollProgressBar from './scroll-progress-bar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      <ScrollProgressBar />
      <SectionContainer>{children}</SectionContainer>
    </Fragment>
  );
}
