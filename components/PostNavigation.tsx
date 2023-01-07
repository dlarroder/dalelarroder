import Link from 'next/link'

type BlogLink = { slug: string; title: string }

interface PostNavigationProps {
  prev?: BlogLink
  next?: BlogLink
}

export default function PostNavigation({ prev, next }: PostNavigationProps) {
  return (
    <div className="grid grid-rows-2 gap-3 pt-4 sm:grid-cols-2 sm:pt-6">
      <div>
        {prev && (
          <div className="flex flex-col items-center space-y-1 sm:items-start">
            <span className="italic">Previous Blog</span>
            <Link
              href={`/blog/${prev.slug}`}
              className="underline-magical max-w-sm truncate sm:max-w-[250px] xl:max-w-md"
            >
              &larr; {prev.title}
            </Link>
          </div>
        )}
      </div>
      <div>
        {next && (
          <div className="flex flex-col items-center space-y-1 sm:items-end">
            <span className="italic">Next Blog</span>
            <Link
              href={`/blog/${next.slug}`}
              className="underline-magical max-w-sm truncate sm:max-w-[250px] xl:max-w-md"
            >
              {next.title} &rarr;
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
