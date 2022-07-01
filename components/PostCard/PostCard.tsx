import Tag from '@/components/Tag'
import { CoreContent } from '@/lib/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from 'next/link'
import { FC } from 'react'

export interface PostCardProps {
  posts: CoreContent<Blog>[]
  showTags?: boolean
}

const PostCard: FC<PostCardProps> = ({ posts, showTags = true }) => {
  return (
    <ul>
      {posts.map(({ slug, title, tags, summary }) => (
        <li key={slug} className={`py-2 animate-page-scaleUp`}>
          <Link href={`/blog/${slug}`} aria-label={`Read "${title}"`}>
            <article className="space-y-2 gap-3 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline bg-opacity-20 py-5 cursor-pointer">
              <div className="space-y-3 xl:col-span-4">
                <h3 className="text-2xl font-bold leading-8 tracking-tight">
                  <Link href={`/blog/${slug}`}>
                    <span className="font-merriweather text-primary-500 hover:text-primary-400 duration-300">
                      {title}
                    </span>
                  </Link>
                </h3>
                {showTags && (
                  <div className="flex flex-wrap gap-3">
                    {tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                )}
                <div className="prose text-gray-900 dark:text-gray-100 max-w-none">{summary}</div>
              </div>
            </article>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default PostCard
