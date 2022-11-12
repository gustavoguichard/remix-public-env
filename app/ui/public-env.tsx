import type { getPublicKeys } from '~/environment.server'
import { environment } from '~/environment.server'

type Props = ReturnType<typeof getPublicKeys>['publicKeys']

declare global {
  interface Window {
    ENV: Props
  }
}
function PublicEnv(props: Props) {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `window.ENV = ${JSON.stringify(props)}`,
      }}
    />
  )
}

function getPublicEnv<T extends keyof Props>(key: T): Props[T] {
  if (typeof window !== 'undefined' && !window.ENV) {
    throw new Error(
      `Missing the <PublicEnv /> component at the root of your app.`,
    )
  }

  return typeof window === 'undefined' ? environment()[key] : window.ENV[key]
}

export { PublicEnv, getPublicEnv }
