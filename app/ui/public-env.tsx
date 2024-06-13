import type { UniversalEnv, publicEnvSchema } from '~/environment'
import { getPublicEnv } from '~/environment'

declare global {
  interface Window {
    ENV: Props
  }
}

type Props = typeof publicEnvSchema['infer']
function PublicEnv(props: Props) {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `window.ENV = ${JSON.stringify(props)}`,
      }}
    />
  )
}

function getUniversalEnv<T extends keyof UniversalEnv>(
  key: T,
): UniversalEnv[T] {
  if (typeof window !== 'undefined' && !window.ENV) {
    throw new Error(
      `Missing the <PublicEnv /> component at the root of your app.`,
    )
  }

  const source = typeof window === 'undefined' ? process.env : window.ENV
  return getPublicEnv(source)[key]
}

export { PublicEnv, getUniversalEnv }
