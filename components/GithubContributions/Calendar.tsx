'use client';

import ActivityCalendar, { Activity } from 'react-activity-calendar';

interface Props {
  data: Activity[];
}

export default function Calendar({ data }: Props) {
  return (
    <div className="flex flex-col space-y-4">
      <p className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
        Github Stats
      </p>
      <ActivityCalendar
        data={data}
        showWeekdayLabels
        labels={{
          totalCount: '{{count}} contributions within the last year',
          weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        }}
      />
    </div>
  );
}
