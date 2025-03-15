import { format } from 'date-fns';
import AnimatedNumber from '../../components/animated-number';
import StatItem from '../../components/stat-item';
import {
  ContributionCalendar,
  getBestDay,
  getDaysFromContribution,
  getThisWeeksContributions,
} from './github';

interface Props {
  contributions: ContributionCalendar;
}

export default function GithubStats({ contributions }: Props) {
  const { weeks, totalContributions } = contributions;

  const bestDay = getBestDay(weeks);
  const thisWeeksContributions = getThisWeeksContributions(weeks);
  const daysFromContribution = getDaysFromContribution(weeks);
  const averageContribution = totalContributions / daysFromContribution;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <StatItem title="This year">
        <AnimatedNumber number={totalContributions} />
        <span> contributions</span>
      </StatItem>
      <StatItem title="This week">
        <AnimatedNumber number={thisWeeksContributions} />
        <span> contributions</span>
      </StatItem>
      <StatItem title="Best day">
        <span>{format(bestDay.day, 'PP')} — </span>
        <AnimatedNumber number={bestDay.count} />
        <span> contributions</span>
      </StatItem>
      <StatItem title="Average">
        <AnimatedNumber number={averageContribution} />
        <span> contributions / day</span>
      </StatItem>
    </div>
  );
}
