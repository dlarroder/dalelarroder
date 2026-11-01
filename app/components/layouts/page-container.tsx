import type React from 'react';

export default function PageContainer({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className='flex w-full flex-col items-center justify-center'>
			<main className='flex min-h-svh w-full max-w-2xl flex-col gap-4 p-8 pt-16 md:px-8 md:py-18'>
				{children}
			</main>
		</div>
	);
}
