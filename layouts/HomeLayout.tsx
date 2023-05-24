import { ReactNode } from 'react'
import Footer from '../components/Footer'
import SectionContainer from '../components/SectionContainer'

interface Props {
  children: ReactNode
}

export default function HomeLayout({ children }: Props) {
  return (
    <SectionContainer>
      <div className="flex h-[1155px] flex-col justify-evenly pt-6 md:pt-9">
        {children}
        <Footer />
      </div>
    </SectionContainer>
  )
}
