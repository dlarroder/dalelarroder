import classNames from 'classnames';
import React from 'react';

export default function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={classNames(
        'animate-pulse rounded-md bg-gray-100 dark:bg-gray-900',
        className,
      )}
      {...props}
    />
  );
}
