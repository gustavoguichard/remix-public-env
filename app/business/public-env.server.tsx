import { publicEnvSchema } from '~/environment'

const loadPublicEnv = (args: Record<string, unknown>) =>
  publicEnvSchema.onUndeclaredKey('delete').assert(args)

export { loadPublicEnv }
