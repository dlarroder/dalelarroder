import type { MDXComponents } from 'mdx/types';
import { CodeBlock } from 'renoun';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    CodeBlock,
    pre: CodeBlock,
  };
}
