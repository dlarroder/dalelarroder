import { ReactNode } from 'react'
import Footer from './Footer'
import SectionContainer from './SectionContainer'

interface Props {
  children: ReactNode
}

const HomeWrapper = ({ children }: Props) => {
  return (
    <SectionContainer>
      <div className="flex flex-col justify-evenly pt-6 md:pt-9">
        <main>{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default HomeWrapper
