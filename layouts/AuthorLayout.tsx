import Image from '@/components/Image'
import { PageSEO } from '@/components/SEO'
import { ReactNode } from 'react'
import { AuthorFrontMatter } from 'types/AuthorFrontMatter'

interface Props {
  children: ReactNode
  frontMatter: AuthorFrontMatter
}

export default function AuthorLayout({ children, frontMatter }: Props) {
  const { name, avatar, occupation, company } = frontMatter
  return (
    <>
      <PageSEO title={`About - ${name}`} description={`About me - ${name}`} />
      <div className="pt-8 animate-fade-in-0.5s">
        <div className="flex flex-col-reverse items-center justify-between mb-8 sm:flex-row sm:items-center">
          <div className="text-center sm:text-left">
            <h1 className="text-xl font-bold md:text-3xl lg:text-4xl ">Dale Larroder</h1>
            <h2 className="text-sm font-normal md:text-base">
              {occupation} <span className="font-semibold">{company}</span>
            </h2>
          </div>
          <div>
            <Image
              alt="Dale Larroder"
              height={130}
              width={130}
              src={avatar}
              className="object-scale-down rounded-full grayscale"
            />
          </div>
        </div>
        <div className="text-sm md:text-lg text-justify pb-8 prose prose-xl dark:prose-dark max-w-none xl:col-span-2">
          {children}
        </div>
      </div>
    </>
  )
}
