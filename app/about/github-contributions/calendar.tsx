'use client';

import { Provider as TooltipProvider } from '@radix-ui/react-tooltip';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import ActivityTooltip from './activity-tooltip';
import { ContributionCalendar } from './github';

interface Props {
  contributions: ContributionCalendar;
}

export default function Calendar({ contributions }: Props) {
  const { weeks, months, colors } = contributions;

  return (
    <TooltipProvider delayDuration={400} skipDelayDuration={100}>
      <div className="relative flex flex-col space-y-2 w-[calc(100%-53px)] md:w-[640px] lg:w-[800px]">
        <ul className="flex justify-end gap-0.75 overflow-hidden text-xs dark:text-neutral-400 md:justify-start">
          {months.map((month) => (
            <li
              key={month.firstDay}
              className={classNames(`${month.totalWeeks < 2 ? 'invisible' : ''}`)}
              style={{ minWidth: 14.3 * month.totalWeeks }}
            >
              {month.name}
            </li>
          ))}
        </ul>

        <div className="flex justify-start gap-0.75 overflow-hidden">
          {weeks?.map((week) => (
            <div key={week.firstDay}>
              {week.contributionDays.map((contribution) => {
                const backgroundColor = contribution.contributionCount > 0 && contribution.color;

                const randomizedDelay = Math.random() * week.contributionDays.length * 0.2;

                return (
                  <ActivityTooltip
                    block={
                      <motion.span
                        key={contribution.date}
                        initial="initial"
                        animate="animate"
                        variants={{
                          initial: { opacity: 0, translateY: -20 },
                          animate: {
                            opacity: 1,
                            translateY: 0,
                            transition: { delay: randomizedDelay },
                          },
                        }}
                        className="my-0.5 block h-3 w-3 rounded-sm bg-neutral-200 dark:bg-[#161B22]"
                        style={backgroundColor ? { backgroundColor } : undefined}
                      />
                    }
                    count={contribution.contributionCount}
                    date={new Date(contribution.date)}
                    key={contribution.date}
                  />
                );
              })}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm">
            <span className="dark:text-neutral-400">Less</span>
            <ul className="flex gap-1">
              <motion.li className="h-2.5 w-2.5 rounded-sm bg-neutral-300 dark:bg-neutral-800" />
              {colors.map((item, index) => (
                <motion.li
                  key={item}
                  initial="initial"
                  animate="animate"
                  variants={{
                    initial: { opacity: 0 },
                    animate: {
                      opacity: 1,
                      transition: { delay: index * 0.5 },
                    },
                  }}
                  className="h-2.5 w-2.5 rounded-sm"
                  style={{ backgroundColor: item }}
                />
              ))}
            </ul>
            <span>More</span>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
