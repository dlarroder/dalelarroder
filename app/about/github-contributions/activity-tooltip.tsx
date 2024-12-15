'use client';
import * as Tooltip from '@radix-ui/react-tooltip';
import { Activity, BlockElement } from 'react-activity-calendar';

interface Props {
  block: BlockElement;
  activity: Activity;
}

export default function ActivityTooltip({ block, activity }: Props) {
  const date = new Date(activity.date);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{block}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="rounded-md z-50 px-3 py-1.5 text-sm text-white bg-black animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
            {`${activity.count} contributions on ${formattedDate}`}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
