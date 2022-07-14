import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  duration: number
}

export default function FadeRight({ children, duration }: Props) {
  return (
    <motion.div
      initial={{ x: -2000 }}
      animate={{
        x: 0,
        transition: {
          duration,
          ease: 'easeInOut',
        },
      }}
    >
      {children}
    </motion.div>
  )
}
