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
  return { publicKeys: loadPublicEnv(process.env) }
}

export default function App() {
  const { publicKeys } = useLoaderData<typeof loader>()
  return (
    <>
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
