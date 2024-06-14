import type { UniversalEnv, publicEnvSchema } from '~/environment'
import { getPublicEnv } from '~/environment'

// Declare the public environment variables to the window.ENV object.
declare global {
  interface Window {
    // The object that contains the public environment variables is the same object of props required in PublicEnv component.
    ENV: Props
  }
}

// The props are derived from the public environment schema.
type Props = typeof publicEnvSchema['infer']
/**
 * The PublicEnv component is used to declare the public environment variables to the window.ENV object.
 * It is a requirement for the usage of the getUniversalEnv function.
 * @param props the object that contains the public environment variables.
 */
function PublicEnv(props: Props) {
  return (
    // The props are serialized to JSON and assigned to the window.ENV object as early as possible.
    <script
      dangerouslySetInnerHTML={{
        __html: `window.ENV = ${JSON.stringify(props)}`,
      }}
    />
  )
}

/**
 * This function is used to retrieve the public environment variables from the either window.ENV or process.env objects, depending on the environment.
 * @param key the camelCased key of the public environment variable.
 * @returns the value of the public environment variable.
 */
function getUniversalEnv<T extends keyof UniversalEnv>(
  key: T,
): UniversalEnv[T] {
  // If the window.ENV object is not defined in the browser, throw an error.
  if (typeof window !== 'undefined' && !window.ENV) {
    throw new Error(
      `Missing the <PublicEnv /> component at the root of your app.`,
    )
  }

  // Depending on the environment, we use the right source of environment variables.
  const source = typeof window === 'undefined' ? process.env : window.ENV
  return getPublicEnv(source)[key]
}

export { PublicEnv, getUniversalEnv }
