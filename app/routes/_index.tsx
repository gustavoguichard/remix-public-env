import { getUniversalEnv } from '~/ui/public-env'

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>
        This is GMAPS key from the server and client:{' '}
        {getUniversalEnv('googleMapsApiKey')}
      </h1>
      <button
        onClick={() => {
          alert(
            `This is Stripe key from the client: ${getUniversalEnv(
              'stripePublicKey',
            )}`,
          )
        }}
      >
        Alert Stripe key
      </button>
    </div>
  )
}
