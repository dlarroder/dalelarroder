import { Fragment, ReactNode } from 'react';
import PageContainer from '../../components/layouts/page-container';
import ScrollProgressBar from './scroll-progress-bar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      <ScrollProgressBar />
      <PageContainer>{children}</PageContainer>
    </Fragment>
  );
}
