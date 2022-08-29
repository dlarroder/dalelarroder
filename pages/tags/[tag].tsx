import { TagSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import MainLayout from '@/layouts/MainLayout'
import ListLayout from '@/layouts/MDX/ListLayout'
import { allCoreContent, getAllTags } from '@/lib/utils/contentlayer'
import kebabCase from '@/lib/utils/kebabCase'
import { allBlogs, Blog } from 'contentlayer/generated'

interface TagProps {
  posts: Omit<Blog, 'body' | '_raw' | '_id'>[]
  tag: string
}

export async function getStaticPaths() {
  const tags = await getAllTags(allBlogs)

  return {
    paths: Object.keys(tags).map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps = async (context: { params: { tag: string } }) => {
  const tag = context.params.tag
  const filteredPosts = allCoreContent(
    allBlogs.filter(
      (post) => post.draft !== true && post.tags?.map((t) => kebabCase(t)).includes(tag)
    )
  )

  return { props: { posts: filteredPosts, tag } }
}

export default function Tag({ posts, tag }: TagProps) {
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  return (
    <MainLayout>
      <TagSEO
        title={`${tag} - ${siteMetadata.title}`}
        description={`${tag} tags - ${siteMetadata.author}`}
      />
      <ListLayout posts={posts} title={title} />
    </MainLayout>
  )
}
