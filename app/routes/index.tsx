import { getPublicEnv } from '~/ui/public-env'

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>
        This is GMAPS key from the server and client:{' '}
        {getPublicEnv('GOOGLE_MAPS_API_KEY')}
      </h1>
      <button
        onClick={() => {
          alert(
            `This is Stripe key from the client: ${getPublicEnv(
              'STRIPE_PUBLIC_KEY',
            )}`,
          )
        }}
      >
        Alert Stripe key
      </button>
    </div>
  )
}
