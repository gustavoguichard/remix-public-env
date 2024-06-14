import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import { PublicEnv } from './ui/public-env'
import { loadPublicEnv } from '~/business/public-env.server'

export function loader() {
  // Load the public environment variables from the server.
  return { publicKeys: loadPublicEnv() }
}

export default function App() {
  const { publicKeys } = useLoaderData<typeof loader>()
  return (
    <>
      {/* Render the PublicEnv component that will declare the public environment variables to the window.ENV object and declare them at the type level. */}
      <PublicEnv {...publicKeys} />
      <Outlet />
    </>
  )
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
