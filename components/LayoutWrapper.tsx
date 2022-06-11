import { ReactNode } from 'react'
import Footer from './Footer'
import { Header } from './Header'
import SectionContainer from './SectionContainer'

interface Props {
  children: ReactNode
}

const LayoutWrapper = ({ children }: Props) => {
  return (
    <SectionContainer>
      <Header />
      <div className="flex flex-col justify-between h-screen">
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
