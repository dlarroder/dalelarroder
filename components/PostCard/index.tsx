import { PostCardProps } from '@/components/PostCard/PostCard'
import dynamic from 'next/dynamic'

const PostCardComponent = dynamic(
  () => {
    return import('./PostCard')
  },
  { ssr: false }
)

const PostCard = ({ posts, showTags }: PostCardProps) => {
  return (
    <div id="comment">
      <PostCardComponent posts={posts} showTags={showTags} />
    </div>
  )
}

export default PostCard
