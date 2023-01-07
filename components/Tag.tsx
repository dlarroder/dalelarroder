import kebabCase from '@/lib/utils/kebabCase'
import Link from 'next/link'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${kebabCase(text)}`}
      className="rounded-md bg-primary-600 p-1 px-3 text-xs font-semibold uppercase text-white duration-300 hover:bg-primary-400 active:bg-primary-500"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
