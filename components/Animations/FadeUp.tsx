import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  duration: number
}

export default function FadeUp({ children, duration }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 500 }}
      animate={{
        opacity: 1,
        y: 0,
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
