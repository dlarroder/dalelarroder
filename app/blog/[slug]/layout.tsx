import { Fragment, ReactNode } from 'react';
import MainLayout from '../../components/layouts/main-layout';
import ScrollProgressBar from './scroll-progress-bar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      <ScrollProgressBar />
      <MainLayout>{children}</MainLayout>
    </Fragment>
  );
}
