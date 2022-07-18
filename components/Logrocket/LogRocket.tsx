import LogRocket from 'logrocket'

const useLogRocket = () => {
  const logrocketId = process.env.NEXT_PUBLIC_LOGROCKET_ID || ''

  setTimeout(() => {
    LogRocket.init(logrocketId)
  }, 100)
  return null
}

export default useLogRocket
