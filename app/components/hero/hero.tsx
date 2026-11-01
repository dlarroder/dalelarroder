import Link from 'next/link';
import type { ReactNode } from 'react';
import { AtSignIcon } from '../layouts/icons/at-sign-icon';
import { GithubIcon } from '../layouts/icons/github-icon';
import { LinkedinIcon } from '../layouts/icons/linkedin-icon';
import { XIcon } from '../layouts/icons/x-icon';
import SplashCursor from '../splash-cursor';

const pages = ['projects', 'thoughts', 'uses', 'stats'];

const socials = [
	{
		label: 'linkedin',
		href: 'https://www.linkedin.com/in/dale-larroder/',
		Icon: LinkedinIcon,
	},
	{ label: 'github', href: 'https://github.com/dlarroder', Icon: GithubIcon },
	{ label: 'twitter', href: 'https://x.com/dalelarroder', Icon: XIcon },
	{ label: 'email', href: 'mailto:hi@dalelarroder.com', Icon: AtSignIcon },
];

function CompanyLink({
	href,
	children,
}: {
	href: string;
	children: ReactNode;
}) {
	return (
		<a
			href={href}
			className='underline-magical'
			target='_blank'
			rel='noreferrer'
			data-skip-splash-cursor
		>
			{children}
		</a>
	);
}

export default function Hero() {
	return (
		<main className='relative min-h-svh w-screen overflow-hidden'>
			<SplashCursor
				containerClassName='min-h-svh w-screen'
				usePrimaryColors={true}
			>
				<div className='relative flex min-h-svh justify-center'>
					{/* Same 672px column and side padding as PageContainer, so text
					    stays put when moving between Home and the inner pages */}
					<div className='flex w-full max-w-2xl flex-col justify-center space-y-4 p-8 md:px-8'>
						<h1 className='text-2xl font-medium md:mr-4 md:text-[30px]'>
							Welcome to my{' '}
							<span className='font-bold'>personal portfolio</span> — or, as I
							like to call it, my{' '}
							<span className='italic border-b border-b-primary-500'>
								playground
							</span>{' '}
							on the web.
						</h1>
						<section className='relative z-10'>
							<p className='text-base'>
								I&apos;m Dale Larroder, a software engineer and forever a
								student of the craft. Most days you&apos;ll find me shipping,
								tinkering, or falling down a rabbit hole. Right now I&apos;m
								making cool things at{' '}
								<CompanyLink href='https://www.aphex.co/'>aphex</CompanyLink>,
								prev{' '}
								<CompanyLink href='https://anything.com/'>anything</CompanyLink>{' '}
								&amp;{' '}
								<CompanyLink href='https://www.codeandtheory.com/'>
									codeandtheory
								</CompanyLink>
								.
							</p>
						</section>
						{/* Small grey links, matching the inner pages' header and Back links */}
						<section className='relative z-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400'>
							<nav className='flex gap-4' data-skip-splash-cursor>
								{pages.map((page) => (
									<Link
										key={page}
										href={`/${page}`}
										className='hover:text-gray-900 dark:hover:text-gray-100 motion-safe:transition-colors'
									>
										/{page}
									</Link>
								))}
							</nav>
							<div className='-mx-2 flex'>
								{socials.map(({ label, href, Icon }) => (
									<Link
										key={label}
										href={href}
										target={href.startsWith('mailto:') ? undefined : '_blank'}
										rel='noreferrer'
										aria-label={label}
										className='hover:text-gray-900 dark:hover:text-gray-100 motion-safe:transition-colors'
										data-skip-splash-cursor
									>
										<Icon size={16} />
									</Link>
								))}
							</div>
						</section>
					</div>
				</div>
			</SplashCursor>
		</main>
	);
}
