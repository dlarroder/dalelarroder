import kebabCase from '@/lib/utils/kebabCase'
import Link from 'next/link'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`} passHref>
      <div className="border border-primary-600 hover:bg-primary-400 hover:text-white duration-300 p-1 px-3 rounded-md text-xs uppercase dark:text-white">
        {text.split(' ').join('-')}
      </div>
    </Link>
  )
}

export default Tag
