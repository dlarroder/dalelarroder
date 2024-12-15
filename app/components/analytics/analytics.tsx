'use client';

import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import LogRocket from 'app/components/analytics/log-rocket';

export default function Analytics() {
  return (
    <>
      <LogRocket />
      <VercelAnalytics />
      <SpeedInsights />
    </>
  );
}
