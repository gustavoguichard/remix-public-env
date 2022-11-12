import pick from 'lodash/pick'
import * as z from 'zod'

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
    publicKeys: pick(environment(), [
      'STRIPE_PUBLIC_KEY',
      'GOOGLE_MAPS_API_KEY',
    ]),
  }
}

export { getPublicKeys, environment }
