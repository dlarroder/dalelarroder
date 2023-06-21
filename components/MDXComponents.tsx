/* eslint-disable react/display-name */
import { coreContent } from '@/lib/utils/contentlayer';
// import { LinkButton } from '@dlarroder/playground';
import type { Authors, Blog } from 'contentlayer/generated';
import { ComponentMap } from 'mdx-bundler/client';
import { useMDXComponent } from 'next-contentlayer/hooks';
import Image from './Image';
import CustomLink from './Link';
import LinkButton from './LinkButton';
import Pre from './Pre';
import TOCInline from './TOCInline';

interface MDXLayout {
  content: Blog | Authors;
  [key: string]: unknown;
}

export const MDXComponents: ComponentMap = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  LinkButton,
};

export const MDXLayoutRenderer = ({ content, ...rest }: MDXLayout) => {
  const MDXLayout = useMDXComponent(content.body.code);
  const mainContent = coreContent(content);

  return <MDXLayout content={mainContent} components={MDXComponents} {...rest} />;
};
