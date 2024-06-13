import * as z from 'zod'

function typedPick<T extends {}, U extends Array<keyof T>>(obj: T, keys: U) {
  let result = {} as Pick<T, U[number]>
  for (const key of keys) {
    result[key] = obj[key]
  }
  return result
}

const environmentSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  SESSION_SECRET: z.string().min(1),
  GOOGLE_MAPS_API_KEY: z.string().min(1),
  STRIPE_PUBLIC_KEY: z.string().min(1),
  STRIPE_SECRET_KEY: z.string().min(1),
})

const environment = () => environmentSchema.parse(process.env)

function getPublicKeys() {
  return {
    publicKeys: typedPick(environment(), [
      'STRIPE_PUBLIC_KEY',
      'GOOGLE_MAPS_API_KEY',
    ]),
  }
}

export { getPublicKeys, environment }
