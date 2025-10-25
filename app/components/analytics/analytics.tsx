'use client';

import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import LogRocket from 'app/components/analytics/log-rocket';
import Script from 'next/script';
import { Fragment } from 'react';

const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ?? '';

export default function Analytics() {
	return (
		<Fragment>
			<Script defer src='/umami.js' data-website-id={umamiWebsiteId} />
			<LogRocket />
			<VercelAnalytics />
			<SpeedInsights />
		</Fragment>
	);
}
