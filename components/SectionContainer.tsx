import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SectionContainer({ children }: Props) {
  return <div className="max-w-3xl px-4 mx-auto sm:px-9 xl:max-w-5xl xl:px-0">{children}</div>
}
