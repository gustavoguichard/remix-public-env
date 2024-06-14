import { Outlet } from '@remix-run/react'
import { getUniversalEnv } from '~/ui/public-env'

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>
        This is GMAPS key from the server and client:{' '}
        {/* This variable will probably come from the server when this component is server rendered and from the window when the component is hydrated */}
        {getUniversalEnv('googleMapsApiKey')}
      </h1>
      <p>
        <button
          onClick={() => {
            // This variable will only come from the window on the client
            alert(
              `This is Stripe key from the client: ${getUniversalEnv(
                'stripePublicKey',
              )}`,
            )
          }}
        >
          Alert Stripe key
        </button>
      </p>
      <Outlet />
    </div>
  )
}
