/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { CamelKeys } from 'string-ts'
import { camelKeys } from 'string-ts'

/**
 * A function that takes a schema and returns a function that takes a record of environment variables and returns a typed object.
 * @param schema a generic schema function that takes a record of environment variables and returns a typed object.
 */
function makeTypedEnvironment<T>(
  schema: (v: unknown) => T,
): (args: Record<string, unknown>) => CamelKeys<T> {
  // Instantiate a cache to store parsed environment variables.
  const cache = new Map<unknown, CamelKeys<T>>()

  return (args) => {
    // If the environment variables are already cached, return the cached value.
    if (cache.has(args)) return cache.get(args)!

    // Otherwise, parse the environment variables and transform the keys to camelCase
    const parsed = camelKeys(schema({ ...args }))
    // Cache the result
    cache.set(args, parsed)
    return parsed
  }
}

export { makeTypedEnvironment }
