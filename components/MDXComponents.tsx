/* eslint-disable react/display-name */
import { coreContent } from '@/lib/utils/contentlayer'
import type { Authors, Blog } from 'contentlayer/generated'
import { ComponentMap } from 'mdx-bundler/client'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Image from './Image'
import CustomLink from './Link'
import Pre from './Pre'
import TOCInline from './TOCInline'

interface MDXLayout {
  layout: string
  content: Blog | Authors
  [key: string]: unknown
}

interface Wrapper {
  layout: string
  [key: string]: unknown
}

const Wrapper = ({ layout, content, ...rest }: MDXLayout) => {
  const Layout = require(`../layouts/${layout}`).default
  return <Layout content={content} {...rest} />
}

export const MDXComponents: ComponentMap = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  wrapper: Wrapper,
}

export const MDXLayoutRenderer = ({ layout, content, ...rest }: MDXLayout) => {
  const MDXLayout = useMDXComponent(content.body.code)
  const mainContent = coreContent(content)

  return <MDXLayout layout={layout} content={mainContent} components={MDXComponents} {...rest} />
}
