import { useScroll } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function ScrollProgressBar() {
  const [width, setWidth] = useState(0)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    scrollYProgress.onChange((v) => setWidth(v * 100))

    return () => scrollYProgress.destroy()
  }, [scrollYProgress])

  return <div className="fixed top-0 z-40 h-1 bg-primary-500" style={{ width: width + '%' }} />
}
