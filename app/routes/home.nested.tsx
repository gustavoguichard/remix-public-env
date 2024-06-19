import { getPublicEnv } from '~/environment'

export default function Index() {
  // If the navigation happened on the client, the cached environment variables will be used.
  return <h1>Stripe key: {getPublicEnv(import.meta.env).stripePublicKey}</h1>
}
