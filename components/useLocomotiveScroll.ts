import Scroll from 'locomotive-scroll'
import { useEffect, useState } from 'react'

type UseLocomotiveScrollHook = [Scroll | null]

const useLocomotiveScroll = ({ ref, smooth }: any): UseLocomotiveScrollHook => {
  const [locomotiveScrollRef, setRef] = useState<Scroll | null>(null)

  useEffect(() => {
    if (ref?.current) {
      import('locomotive-scroll').then((locomotiveModule) => {
        const scroll = new locomotiveModule.default({
          el: ref.current,
          smooth,
          lerp: 0.07,
          smartphone: {
            smooth: true,
          },
          tablet: {
            smooth: true,
            breakpoint: 1024,
          },
        })
        setRef(scroll)
      })
    }
    return () => {
      locomotiveScrollRef?.destroy()
    }
  }, [ref])

  return [locomotiveScrollRef]
}
export default useLocomotiveScroll
