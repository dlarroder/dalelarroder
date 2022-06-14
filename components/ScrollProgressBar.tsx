import { useContext, useEffect, useState } from 'react'
import { ScrollContext } from './ScrollObserver'

export default function ScrollProgressBar() {
  const [width, setWidth] = useState(0)
  const { scrollY, scrollHeight } = useContext(ScrollContext)

  useEffect(() => {
    const el = document.documentElement
    const percent = (scrollY / (scrollHeight - el.clientHeight)) * 100

    setWidth(percent)
  }, [setWidth, scrollHeight, scrollY])

  return <div className="fixed top-0 h-1 z-40 bg-primary-500" style={{ width: width + '%' }}></div>
}
