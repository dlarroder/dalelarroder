import { format, secondsToMinutes } from 'date-fns';
import AnimatedNumber from '../animated-number';
import StatItem from '../stat-item';
import { extractHoursAndMinutes, secondsToHours } from './utils';
import { getAllTimeStats, getStatsThisWeek } from './wakatime';

export default async function WakaStats() {
  const allTimeStats = await getAllTimeStats();
  const thisWeekStats = await getStatsThisWeek();

  const { hours, minutes } = extractHoursAndMinutes(allTimeStats.text);

  return (
    <section className="space-y-4 mt-7">
      <div>
        <h2 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
          Wakatime
        </h2>
        <p className="text-gray-500 dark:text-gray-400 leading-4">
          Coding Stats
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatItem title="All time">
          <AnimatedNumber number={hours} /> <span>hours </span>
          <AnimatedNumber number={minutes} /> <span>minutes</span>
        </StatItem>
        <StatItem title="Best Day Coding">
          <span>{format(thisWeekStats.best_day.date, 'PP')} — </span>
          <AnimatedNumber
            number={secondsToHours(thisWeekStats.best_day.total_seconds)}
          />{' '}
          <span>hours</span>
        </StatItem>
        <StatItem title="Daily Average">
          <AnimatedNumber number={secondsToHours(allTimeStats.daily_average)} />{' '}
          <span>hours / </span>
          <AnimatedNumber
            number={secondsToMinutes(allTimeStats.daily_average)}
          />{' '}
          <span>minutes</span>
        </StatItem>
        <StatItem title="Weekly Average">
          <AnimatedNumber
            number={secondsToHours(thisWeekStats.daily_average)}
          />{' '}
          <span>hours / </span>
          <AnimatedNumber
            number={secondsToMinutes(thisWeekStats.daily_average)}
          />{' '}
          <span>minutes</span>
        </StatItem>
      </div>
    </section>
  );
}
