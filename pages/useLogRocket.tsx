import LogRocket from 'logrocket'
import { EnvironmentType } from 'types/default'

const useLogRocket = (env: string, logrocketId: string) => {
  setTimeout(() => {
    if (env == EnvironmentType.Dev) {
      console.log('dev mode!')
      console.log(logrocketId)
      LogRocket.init(logrocketId)
      const randomId = Math.floor(Math.random() * 100)
      LogRocket.identify(`${randomId}`, {
        name: `Number ${randomId}`,
        email: `${randomId}-random@email.com`,
      })
    } else if (env == EnvironmentType.Prod) {
      LogRocket.init(logrocketId)
      const randomId = Math.floor(Math.random() * 100)
      LogRocket.identify(`${randomId}`, {
        name: `Number ${randomId}`,
        email: `${randomId}-random@email.com`,
      })
    }
  }, 100)
  return null
}

export default useLogRocket
