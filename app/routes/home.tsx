import { Outlet } from '@remix-run/react'
import { getPublicEnv } from '~/environment'

export default function Index() {
  function showStripeKey() {
    alert(
      `Stripe key on the client: ${
        getPublicEnv(import.meta.env).stripePublicKey
      }`,
    )
  }

  return (
    <div>
      <h1>
        GMAPS key on the server and client:{' '}
        {getPublicEnv(import.meta.env).googleMapsApiKey}
      </h1>
      <p>
        <button onClick={showStripeKey}>Alert Stripe key</button>
      </p>
      <Outlet />
    </div>
  )
}
