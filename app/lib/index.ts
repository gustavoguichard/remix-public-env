import type { CamelKeys, ReplaceKeys } from 'string-ts'
import { camelKeys, replaceKeys } from 'string-ts'

/**
 * A function that takes a schema and returns a function that takes a record of environment variables and returns a typed object.
 * @param schema a generic schema function that takes a record of environment variables and returns a typed object.
 */
function makeTypedEnvironment<T>(schema: (v: unknown) => T) {
  // Instantiate a cache to store parsed environment variables.
  let cache: CamelKeys<ReplaceKeys<T, 'VITE_', ''>>

  return (args: Record<string, unknown>) => {
    // If the environment variables are already cached, return the cached value.
    if (cache) return cache

    // Otherwise, parse the environment variables and transform the keys
    const withoutPrefix = replaceKeys(schema({ ...args }), 'VITE_', '')
    const camelCased = camelKeys(withoutPrefix)
    cache = camelCased
    return cache
  }
}

export { makeTypedEnvironment }
