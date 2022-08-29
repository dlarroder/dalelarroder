import { ReactNode } from 'react'
import Footer from '../components/Footer'
import SectionContainer from '../components/SectionContainer'

interface Props {
  children: ReactNode
}

export default function HomeLayout({ children }: Props) {
  return (
    <SectionContainer>
      <div className="flex flex-col justify-evenly pt-6 md:pt-9">
        <main>{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}
