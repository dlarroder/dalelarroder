import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { ComponentPropsWithoutRef } from 'react';

type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ol'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const components = {
  h1: ({ children, ...props }: HeadingProps) => (
    <h1
      className="text-2xl md:text-4xl font-bold py-3 text-gray-900 dark:text-gray-100"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: HeadingProps) => {
    const id = typeof children === 'string' ? slugify(children) : undefined;
    return (
      <h2
        id={id}
        className="text-xl md:text-3xl font-bold py-3 text-gray-900 dark:text-gray-100 scroll-mt-20"
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }: HeadingProps) => {
    const id = typeof children === 'string' ? slugify(children) : undefined;
    return (
      <h3
        id={id}
        className="text-base md:text-2xl font-bold py-3 text-gray-900 dark:text-gray-100 scroll-mt-20"
        {...props}
      >
        {children}
      </h3>
    );
  },
  h4: ({ children, ...props }: HeadingProps) => (
    <h4
      className="text-sm md:text-xl font-bold py-3 text-gray-900 dark:text-gray-100"
      {...props}
    >
      {children}
    </h4>
  ),
  ol: (props: ListProps) => (
    <ol
      className="list-decimal pl-5 text-gray-900 dark:text-gray-100"
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul
      className="list-disc pl-5 text-gray-900 dark:text-gray-100"
      {...props}
    />
  ),
  li: (props: ListItemProps) => (
    <li className="text-gray-900 dark:text-gray-100" {...props} />
  ),
  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className="font-medium" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-bold text-gray-900 dark:text-gray-100" {...props} />
  ),
  p: ({ children, ...props }: ParagraphProps) => (
    <p
      className="leading-snug text-gray-900 dark:text-gray-100 py-4"
      {...props}
    >
      {children}
    </p>
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className = `text-gray-900 dark:text-gray-100 no-underline cursor-pointer bg-no-repeat bg-linear-to-r  from-primary-500 to-primary-500 [background-position:0_100%] [background-size:100%_0.2em] hover:[background-size:100%_100%] hover:text-white focus:[background-size:100%_100%] motion-safe:transition-all motion-safe:duration-300 dark:from-primary-500 dark:to-primary-500`;

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
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },
  code: (props: ComponentPropsWithoutRef<'code'>) => {
    return (
      <code
        className="bg-transparent before:content-none after:content-none text-green-500 text-sm"
        {...props}
      />
    );
  },
  pre: (props: ComponentPropsWithoutRef<'pre'>) => (
    <pre
      className="bg-gray-800 p-4 rounded-md overflow-x-auto text-sm"
      {...props}
    />
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="ml-[0.075em] border-l-3 border-gray-300 pl-4 text-gray-700"
      {...props}
    />
  ),
};

export function CustomMDX(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
