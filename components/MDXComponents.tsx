/* eslint-disable react/display-name */
import { coreContent } from '@/lib/utils/contentlayer'
import { LinkButton } from '@dlarroder/playground'
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
  const Layout = require(`../layouts/MDX/${layout}`).default
  return <Layout content={content} {...rest} />
}

export const MDXComponents: ComponentMap = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  wrapper: Wrapper,
  LinkButton,
}

export const MDXLayoutRenderer = ({ layout, content, ...rest }: MDXLayout) => {
  const MDXLayout = useMDXComponent(content.body.code)
  const mainContent = coreContent(content)

  return <MDXLayout layout={layout} content={mainContent} components={MDXComponents} {...rest} />
}
