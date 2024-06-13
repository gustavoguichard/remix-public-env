/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { CamelKeys } from 'string-ts'
import { camelKeys } from 'string-ts'

function makeTypedEnvironment<T>(schema: (v: unknown) => T) {
  const cache = new Map<unknown, CamelKeys<T>>()

  return (args: Record<string, unknown>): CamelKeys<T> => {
    if (cache.has(args)) return cache.get(args)!

    const parsed = camelKeys(schema({ ...args }))
    cache.set(args, parsed)
    return parsed
  }
}

export { makeTypedEnvironment }
