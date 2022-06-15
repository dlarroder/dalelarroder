import dynamic from 'next/dynamic'

const ScrollProgressBarComponent = dynamic(
  () => {
    return import('./ScrollProgressBar')
  },
  { ssr: false }
)

const ScrollProgressBar = () => {
  return <ScrollProgressBarComponent />
}

export default ScrollProgressBar
