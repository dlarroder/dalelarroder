import LogRocket from 'logrocket'

const useLogRocket = (logrocketId: string) => {
  setTimeout(() => {
    LogRocket.init(logrocketId)
  }, 100)
  return null
}

export default useLogRocket
