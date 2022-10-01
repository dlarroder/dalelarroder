import { useScroll } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function ScrollProgressBar() {
  const [width, setWidth] = useState(0)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    scrollYProgress.onChange((v) => setWidth(v * 100))

    return () => scrollYProgress.destroy()
  }, [scrollYProgress])

  return <div className="fixed top-0 h-1 z-40 bg-primary-500" style={{ width: width + '%' }} />
}
