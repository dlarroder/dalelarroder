import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getFileBySlug } from '@/lib/mdx'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { ActivityFrontMatter } from 'types/ActivityFrontMatter'

const DEFAULT_LAYOUT = 'ActivityLayout'

// @ts-ignore
export const getStaticProps: GetStaticProps<{
  activityDetails: { mdxSource: string; frontMatter: ActivityFrontMatter }
}> = async () => {
  const activityDetails = await getFileBySlug<ActivityFrontMatter>('activity', ['default'])
  const { mdxSource, frontMatter } = activityDetails
  return { props: { activityDetails: { mdxSource, frontMatter } } }
}

export default function Activity({
  activityDetails,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { mdxSource, frontMatter } = activityDetails

  return (
    <MDXLayoutRenderer
      layout={frontMatter.layout || DEFAULT_LAYOUT}
      mdxSource={mdxSource}
      frontMatter={frontMatter}
    />
  )
}
