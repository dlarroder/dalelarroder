import dynamic from 'next/dynamic'

const ProgressBarComponent = dynamic(
  () => {
    return import('./ProgressBar')
  },
  { ssr: false }
)

const ProgressBar = () => {
  return <ProgressBarComponent />
}

export default ProgressBar
