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
					    stays put when moving between Home and the inner pages. The
					    extra bottom padding lifts it a little above dead centre. */}
					<div className='flex w-full max-w-2xl flex-col justify-center space-y-4 p-8 pb-[20svh] md:px-8 md:pb-[35svh]'>
						<h1 className='text-2xl font-medium md:mr-4 md:text-[30px]'>
							welcome to my{' '}
							<span className='font-bold'>personal portfolio</span> — or, as i
							like to call it, my{' '}
							<span className='italic border-b border-b-primary-500'>
								playground
							</span>{' '}
							on the web.
						</h1>
						<section className='relative z-10 space-y-4'>
							<p className='text-base'>
								i&apos;m dale larroder, a software engineer from the philippines{' '}
								<span role='img' aria-label='Philippine flag'>
									🇵🇭
								</span>
							</p>
							<p className='text-base'>
								i work mostly with react and typescript, in the space where
								product meets platform. i care less about the stack and more
								about software that stays fast and easy to work on as it grows.
							</p>
							<p className='text-base'>
								right now i&apos;m making cool things at{' '}
								<CompanyLink href='https://www.aphex.co/'>aphex</CompanyLink>,
								prev{' '}
								<CompanyLink href='https://anything.com/'>anything</CompanyLink>{' '}
								&amp;{' '}
								<CompanyLink href='https://www.codeandtheory.com/'>
									codeandtheory
								</CompanyLink>
								.
							</p>
							<p className='text-base'>
								when i&apos;m not shipping, i&apos;m usually tinkering or deep
								in some rabbit hole.
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
