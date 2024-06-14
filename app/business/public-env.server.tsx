import { publicEnvSchema } from '~/environment'

/**
 * Function to load public environment variables on the server.
 */
const loadPublicEnv = () =>
  publicEnvSchema.onUndeclaredKey('delete').assert({ ...process.env })

export { loadPublicEnv }
