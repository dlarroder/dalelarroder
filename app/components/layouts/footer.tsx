import Link from 'next/link';
import { Suspense } from 'react';
import NowPlaying from '../spotify/now-playing';
import { GithubIcon } from './icons/github-icon';
import { InstagramIcon } from './icons/instagram-icon';
import { LinkedinIcon } from './icons/linkedin-icon';
import { XIcon } from './icons/x-icon';
import SectionContainer from './section-container';

export default function Footer() {
	return (
		<SectionContainer>
			<footer>
				<div className='mb-0 flex flex-col justify-start space-y-1.5 space-x-0 py-10 text-gray-500 dark:text-gray-400'>
					<Suspense fallback={<div className='h-6' />}>
						<NowPlaying />
					</Suspense>
					<div className='flex flex-col items-center space-y-2 text-sm sm:flex-row sm:justify-between sm:text-base'>
						<ul className='flex space-x-2'>
							<li>{`© ${new Date().getFullYear()}`}</li>
							<li>{` • `}</li>
							<li>
								<Link href='/'>Dale Larroder</Link>
							</li>
						</ul>
						<ul className='flex cursor-pointer items-center'>
							<li>
								<Link
									href='https://www.linkedin.com/in/dale-larroder/'
									target='_blank'
									rel='noreferrer'
									aria-label='linkedin'
								>
									<LinkedinIcon className='h-9 w-9' />
								</Link>
							</li>
							<li>
								<Link
									href='https://github.com/dlarroder'
									target='_blank'
									rel='noreferrer'
									aria-label='github'
								>
									<GithubIcon className='h-9 w-9' />
								</Link>
							</li>
							<li>
								<Link
									href='https://x.com/dalelarroder'
									target='_blank'
									rel='noreferrer'
									aria-label='twitter'
								>
									<XIcon className='h-9 w-9' />
								</Link>
							</li>
							<li>
								<Link
									href='https://www.instagram.com/dalelarroder/'
									target='_blank'
									rel='noreferrer'
									aria-label='instagram'
								>
									<InstagramIcon className='h-9 w-9' />
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</footer>
		</SectionContainer>
	);
}
