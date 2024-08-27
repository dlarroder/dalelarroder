'use client';

import { useTheme } from 'next-themes';
import ActivityCalendar, { Activity, ThemeInput } from 'react-activity-calendar';
import ActivityTooltip from './ActivityTooltip';

export const GITHUB_THEME: ThemeInput = {
  light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
};

interface Props {
  data: Activity[];
}

export default function Calendar({ data }: Props) {
  const { theme = 'dark' } = useTheme();

  return (
    <div className="flex flex-col space-y-4">
      <p className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
        Github Contributions
      </p>
      <ActivityCalendar
        colorScheme={theme as any}
        data={data}
        theme={GITHUB_THEME}
        showWeekdayLabels
        labels={{
          totalCount: '{{count}} contributions within the last year',
          weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        }}
        renderBlock={(block, activity) => <ActivityTooltip block={block} activity={activity} />}
      />
    </div>
  );
}
