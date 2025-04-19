import React from 'react';
import PageContainer from '../components/layouts/page-container';

export default function layout({ children }: { children: React.ReactNode }) {
  return <PageContainer>{children}</PageContainer>;
}
