import { type } from 'arktype'
import { makeTypedEnvironment } from './lib'

// Define the public environment schema.
const publicEnvSchema = type({
  VITE_GOOGLE_MAPS_API_KEY: 'string>0',
  VITE_STRIPE_PUBLIC_KEY: 'string>0',
})
// Extend the public schema to create the full environment schema.
const envSchema = type(publicEnvSchema, '&', {
  NODE_ENV: ["'development'|'production'|'test'", '=', 'development'],
  SESSION_SECRET: 'string>0',
  STRIPE_SECRET_KEY: 'string>0',
})

// Create the environment parsers for public and full schemas.
const getPublicEnv = makeTypedEnvironment((d) =>
  publicEnvSchema.onUndeclaredKey('delete').assert(d),
)
const getEnv = makeTypedEnvironment((d) => envSchema.assert(d))

export { getEnv, getPublicEnv }
