import { Fragment, ReactNode } from 'react';
import ScrollProgressBar from './scroll-progress-bar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      <ScrollProgressBar />
      <main className="flex min-h-svh w-full max-w-5xl flex-col justify-center gap-4 border-gray-300/20 p-8 pt-16 md:p-24 xl:border-r 3xl:ml-auto 3xl:border-l">
        {children}
      </main>
    </Fragment>
  );
}
