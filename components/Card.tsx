import Image from './Image'
import Link from './Link'

interface CardProps {
  title: string
  description: string
  imgSrc: string
  href: string
}

export default function Card({ title, description, imgSrc, href }: CardProps) {
  return (
    <div className="md p-2 md:w-1/2" style={{ maxWidth: '544px' }}>
      <div className="h-full overflow-hidden rounded-md border-opacity-60 hover:bg-gray-200 hover:bg-opacity-20 dark:border-gray-700">
        {href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-center md:h-36 lg:h-48"
              width={544}
              height={306}
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center md:h-36 lg:h-48"
            width={544}
            height={306}
          />
        )}
        <div className="p-6">
          <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
            {href ? (
              <Link href={href} aria-label={`Link to ${title}`}>
                {title}
              </Link>
            ) : (
              title
            )}
          </h2>
          <p className="prose max-w-none text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  )
}
