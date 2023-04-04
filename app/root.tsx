import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react"
import type { LinksFunction, V2_MetaFunction } from "@vercel/remix"
import mapboxStyles from "mapbox-gl/dist/mapbox-gl.css"
import appStyles from "./styles/app.css"

export const config = { runtime: "edge" }

const title = "Brunch Invite • 4/22"
const description = "You are invited to brunch at Mark's house!"

export const meta: V2_MetaFunction = () => [
    { charSet: "utf-8" },
    { title },
    { name: "description", content: description },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { property: "og:title", content: "You're invited to brunch!" },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "mimosas.webp" },
    // FIXME: How do I generate this?
    // { property: "og:url", content: "" },
    { property: "og:description", content: description },
]

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: appStyles },
    { rel: "stylesheet", href: mapboxStyles },
    { rel: "icon", type: "image/png", href: "favicon.png" },
]

export default function App() {
    return (
        <html className="h-full bg-slate-50 dark:bg-black" lang="en">
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
