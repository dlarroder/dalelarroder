import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function WorkContainer({ children }: Props) {
  return <div className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-screen">{children}</div>
}
