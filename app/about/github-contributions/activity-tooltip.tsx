import { Content, Portal, Root, Trigger } from '@radix-ui/react-tooltip';
import { ReactNode } from 'react';

interface Props {
  block: ReactNode;
  count: number;
  date: Date;
}

export default function ActivityTooltip({ block, date, count }: Props) {
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Root>
      <Trigger asChild>{block}</Trigger>
      <Portal>
        <Content className="rounded-md z-50 px-3 py-1.5 text-sm text-white bg-black animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
          {`${count} contributions on ${formattedDate}`}
        </Content>
      </Portal>
    </Root>
  );
}
