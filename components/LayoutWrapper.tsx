import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import Footer from './Footer'
import { Header } from './Header'
import SectionContainer from './SectionContainer'

interface Props {
  children: ReactNode
}

const LayoutWrapper = ({ children }: Props) => {
  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  }

  return (
    <SectionContainer>
      <Header />
      <div className="flex flex-col justify-between h-screen">
        <motion.main
          className="mb-auto"
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={variants}
          transition={{ type: 'linear' }}
        >
          {children}
        </motion.main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
