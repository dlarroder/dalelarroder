import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import { ComponentPropsWithoutRef } from 'react';

type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ol'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;

const components: MDXComponents = {
  h1: ({ children, ...props }: HeadingProps) => (
    <h1 className="font-medium pt-12 mb-0 fade-in" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: HeadingProps) => (
    <h2 className="text-gray-900 dark:text-gray-100 font-medium mt-8 mb-3" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: HeadingProps) => (
    <h3 className="text-gray-900 dark:text-gray-100 font-medium mt-8 mb-3" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: HeadingProps) => (
    <h4 className="font-medium" {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }: ParagraphProps) => (
    <p className="text-gray-900 dark:text-gray-100 leading-snug" {...props}>
      {children}
    </p>
  ),
  ol: (props: ListProps) => (
    <ol className="text-gray-900 dark:text-gray-100 list-decimal pl-5 space-y-2" {...props} />
  ),
  ul: (props: ListProps) => (
    <ul className="text-gray-900 dark:text-gray-100 list-disc pl-5 space-y-1" {...props} />
  ),
  li: (props: ListItemProps) => <li className="pl-1" {...props} />,
  em: (props: ComponentPropsWithoutRef<'em'>) => <em className="font-medium" {...props} />,
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-medium" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className = 'text-blue-500 hover:text-blue-700';
    if (href?.startsWith('/')) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith('#')) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...props}>
        {children}
      </a>
    );
  },
  code: (props: ComponentPropsWithoutRef<'code'>) => {
    return <code {...props} />;
  },
  blockquote: (props: BlockquoteProps) => (
    <blockquote className="ml-[0.075em] border-l-3 border-gray-300 pl-4 text-gray-700" {...props} />
  ),
};

export function useMDXComponents(_components: MDXComponents): MDXComponents {
  return {
    ..._components,
    ...components,
  };
}
