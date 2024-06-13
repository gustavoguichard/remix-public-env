import { getUniversalEnv } from '~/ui/public-env'

export default function Index() {
  return <h1>Stripe key: {getUniversalEnv('stripePublicKey')}</h1>
}
