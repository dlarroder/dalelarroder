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
      <PageSEO title={`Uses - ${name}`} description={`What I Use - ${name}`} />
      <div className="pt-8 animate-fade-in-0.5s">
        <div className="flex flex-col space-y-2 text-center mb-8">
          <h1 className="text-3xl font-merriweather font-extrabold leading-9 tracking-tight text-gray-900  dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            What I Use
          </h1>
          <span>
            Inspired by{' '}
            <a
              href="https://wesbos.com/uses"
              className="underline text-primary-500"
              target="_blank"
              rel="noreferrer"
            >
              Wes bos
            </a>
          </span>
        </div>
        <div className="text-sm md:text-lg text-justify pb-8 prose dark:prose-dark max-w-none xl:col-span-2">
          {children}
        </div>
      </div>
    </>
  )
}
