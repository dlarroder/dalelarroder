import Link from '@/components/Link'
import Pagination from '@/components/Pagination'
import Tag from '@/components/Tag'
import { ComponentProps, useState } from 'react'
import { PostFrontMatter } from 'types/PostFrontMatter'
interface Props {
  posts: PostFrontMatter[]
  title: string
  initialDisplayPosts?: PostFrontMatter[]
  pagination?: ComponentProps<typeof Pagination>
}

export default function ListLayout({ posts, title, initialDisplayPosts = [], pagination }: Props) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <div className="">
        <div className="pt-8 pb-3 rounded-lg space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900  dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            {title}
          </h1>
          <div className="relative max-w-full">
            <input
              aria-label="Search articles"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search articles"
              className="block w-full px-4 py-3 text-gray-900 border-0 bg-gray-200 bg-opacity-50 rounded-md dark:border-gray-900 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-800 dark:text-gray-100"
            />
            <svg
              className="absolute w-6 h-6 text-gray-400 right-3 top-3 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <ul>
          {!filteredBlogPosts.length && 'No posts found.'}
          {displayPosts.map((frontMatter) => {
            const { slug, title, summary, tags } = frontMatter
            return (
              <li key={slug} className={`py-2 animate-page-scaleUp`}>
                <Link href={`/blog/${slug}`} aria-label={`Read "${title}"`}>
                  <article className="space-y-2 gap-3 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline bg-opacity-20 py-5">
                    <div className="space-y-3 xl:col-span-4">
                      <h3 className="text-2xl font-bold leading-8 tracking-tight">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-400 duration-300"
                        >
                          {title}
                        </Link>
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {tags.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                      <div className="prose text-gray-900 dark:text-gray-100 max-w-none">
                        {summary}
                      </div>
                    </div>
                  </article>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
