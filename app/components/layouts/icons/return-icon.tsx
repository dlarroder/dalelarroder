import type { SVGProps } from 'react';

// A curved "return" arrow, sized to sit inline with small link text
export function ReturnIcon({
	size = 14,
	...props
}: SVGProps<SVGSVGElement> & { size?: number }) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={size}
			height={size}
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
			aria-hidden
			{...props}
		>
			<path d='M9 14 4 9l5-5' />
			<path d='M4 9h10.5a5.5 5.5 0 0 1 0 11H11' />
		</svg>
	);
}
