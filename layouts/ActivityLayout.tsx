import { PageSEO } from '@/components/SEO'
import type { Authors } from 'contentlayer/generated'
import { ReactNode } from 'react'
interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name } = content

  return (
    <>
      <PageSEO title={`Activity - ${name}`} description={`Activity - ${name}`} />
      <div className="">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            Activity
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">List my activity.</p>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="pb-8 prose prose-xl dark:prose-dark max-w-none xl:col-span-3">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
