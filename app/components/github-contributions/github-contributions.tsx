import Contributions from './contributions';

export default function GithubContributions() {
	return (
		<section className='space-y-4'>
			<div>
				<p className='text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100'>
					Github
				</p>
				<p className='text-gray-500 dark:text-gray-400 leading-4'>
					Contributions Stats
				</p>
			</div>
			<Contributions />
		</section>
	);
}
