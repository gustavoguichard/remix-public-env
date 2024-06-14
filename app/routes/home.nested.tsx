import { getUniversalEnv } from '~/ui/public-env'

export default function Index() {
  // If the navigation happened on the client, the cached environment variables will be used.
  return <h1>Stripe key: {getUniversalEnv('stripePublicKey')}</h1>
}
