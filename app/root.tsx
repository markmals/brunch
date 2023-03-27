import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react"
import type { LinksFunction, V2_MetaFunction } from "@vercel/remix"
import mapboxStyles from "mapbox-gl/dist/mapbox-gl.css"
import appStyles from "./styles/app.css"

export const config = { runtime: "edge" }

export const meta: V2_MetaFunction = () => [
    { charSet: "utf-8" },
    { title: "Brunch • 4/16" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    // { name: "description", content: "HTML, dynamically rendered in a city near you" },
]

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: appStyles },
    { rel: "stylesheet", href: mapboxStyles },
]

export default function App() {
    return (
        <html className="h-full bg-slate-50" lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <body className="h-full">
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    )
}
