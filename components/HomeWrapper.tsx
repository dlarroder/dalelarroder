import { ReactNode } from 'react'
import Footer from './Footer'
import SectionContainer from './SectionContainer'

interface Props {
  children: ReactNode
}

const HomeWrapper = ({ children }: Props) => {
  return (
    <SectionContainer>
      <div className="h-screen flex flex-col justify-evenly">
        <main>{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default HomeWrapper
