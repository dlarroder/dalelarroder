import dynamic from 'next/dynamic'

const LogRocketComponent = dynamic(
  () => {
    return import('./LogRocket')
  },
  { ssr: false }
)

const LogRocket = () => {
  return <LogRocketComponent />
}

export default LogRocket
