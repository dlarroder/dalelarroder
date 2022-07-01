import LayoutWrapper from '@/components/LayoutWrapper'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { allAuthors } from 'contentlayer/generated'
import { InferGetStaticPropsType } from 'next'

const DEFAULT_LAYOUT = 'ActivityLayout'

export const getStaticProps = async () => {
  const author = allAuthors.find((p) => p.slug === 'activity')
  return { props: { author } }
}
export default function About({ author }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <LayoutWrapper>
      <MDXLayoutRenderer layout={author.layout || DEFAULT_LAYOUT} content={author} />
    </LayoutWrapper>
  )
}
