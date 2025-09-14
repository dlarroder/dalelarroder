'use client';

import GoogleAnalytics from '@/components/GoogleAnalytics';
import LogRocket from '@/components/LogRocket';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function Analytics() {
  return (
    <>
      <GoogleAnalytics />
      <LogRocket />
      <VercelAnalytics />
      <SpeedInsights />
    </>
  );
}
