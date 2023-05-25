import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

type Props = {
  setLoading: (v: boolean) => void
}

function Preloader({ setLoading }: Props) {
  const [loadingTime, setLoadingTime] = useState<number>(0)

  useEffect(() => {
    if (loadingTime < 100) {
      const t = setTimeout(() => {
        setLoadingTime(loadingTime + 1)
      }, 20)

      return () => clearTimeout(t)
    }
  }, [loadingTime])

  useEffect(() => {
    if (loadingTime === 100) {
      setLoading(false)
    }
  }, [loadingTime, setLoading])

  return (
    <motion.div
      transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96], delay: 1 }}
      exit={{ y: '-130vh', skewY: 3 }}
      className="fixed inset-0 z-20 h-screen w-screen bg-black dark:bg-white"
    >
      <div className="absolute left-10 bottom-10 mt-5 text-3xl text-white dark:text-black md:text-5xl lg:mt-36 lg:text-7xl">
        %{loadingTime <= 100 ? loadingTime : '100'}
      </div>
    </motion.div>
  )
}

export default Preloader
