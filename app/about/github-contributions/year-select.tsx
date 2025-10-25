import classNames from 'classnames';

interface Props {
	selectedYear: number;
	onYearChange: (year: number) => void;
}

export default function YearSelect({ selectedYear, onYearChange }: Props) {
	const thisYear = new Date().getFullYear();

	const yearOptions = Array.from({ length: 5 }, (_, i) => thisYear - i);

	return (
		<div className='flex flex-col space-y-2 text-sm'>
			{yearOptions.map((year) => (
				<button
					type='button'
					onClick={() => {
						onYearChange(year);
					}}
					key={year}
					className={classNames('border-b-2 cursor-pointer', {
						'border-transparent': selectedYear !== year,
						'border-primary-500': selectedYear === year,
					})}
				>
					{year}
				</button>
			))}
		</div>
	);
}
