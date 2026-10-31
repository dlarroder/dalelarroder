import { getContributions } from 'app/components/github-contributions/fetch-contributions';
import { GITHUB_USERNAME } from 'app/components/github-contributions/github';
import { type NextRequest, NextResponse } from 'next/server';

const FIRST_YEAR = 2015;

export async function GET(request: NextRequest) {
	const year = Number(request.nextUrl.searchParams.get('year'));

	if (
		!Number.isInteger(year) ||
		year < FIRST_YEAR ||
		year > new Date().getFullYear()
	) {
		return NextResponse.json({ error: 'Invalid year' }, { status: 400 });
	}

	try {
		const contributions = await getContributions(GITHUB_USERNAME, year);

		return NextResponse.json(contributions, {
			headers: {
				// Cache at the edge so visitors don't each hit the GitHub API
				'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
			},
		});
	} catch (e) {
		console.error(e instanceof Error ? e.message : e);
		return NextResponse.json(
			{ error: 'Failed to load contributions' },
			{ status: 502 },
		);
	}
}
