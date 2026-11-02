import Contributions from './contributions';

export default function GithubContributions() {
	return (
		<section className='space-y-2'>
			<div>
				<h2 className='text-xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100'>
					GitHub
				</h2>
				<p className='text-gray-500 dark:text-gray-400 leading-4'>
					Contributions Stats
				</p>
			</div>
			<Contributions />
		</section>
	);
}
