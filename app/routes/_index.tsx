import { useLoaderData } from "@remix-run/react"
import { json } from "@vercel/remix"
import { useState } from "react"
import { Header } from "~/components/Header"
import { InfoCard } from "~/components/InfoCard"
import { Menu } from "~/components/Menu"
import type { RSVPOption } from "~/components/RSVP"
import { RSVPBar } from "~/components/RSVP"

export function loader() {
    const mapLink = "https://maps.apple.com/?daddr=1416+Berene+Ave"
    console.log(process.env.MAPBOX_TOKEN)
    return json({ mapboxToken: process.env.MAPBOX_TOKEN!, mapLink })
}

// TODO: Add dark mode

export default function Index() {
    const { mapboxToken, mapLink } = useLoaderData<typeof loader>()
    const [selectedResponse, setSelectedResponse] = useState<RSVPOption | undefined>(undefined)

    return (
        <main className="mx-auto flex max-w-7xl flex-col gap-6 pb-10 sm:py-10 sm:px-8 lg:px-28">
            <Header image="mimosas.jpg" title="Brunch" />
            <RSVPBar onChange={setSelectedResponse} value={selectedResponse} />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Menu />
                <InfoCard mapLink={mapLink} mapboxToken={mapboxToken} />
                {/* TODO: Display a list of respondants and how they responded? */}
            </div>
        </main>
    )
}
