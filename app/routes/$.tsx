import { useActionData, useLoaderData } from "@remix-run/react"
import type { ActionArgs, LoaderArgs } from "@vercel/remix"
import { json, redirect } from "@vercel/remix"
import { namedAction } from "remix-utils"
import { Header } from "~/components/Header"
import { InfoCard } from "~/components/InfoCard"
import { eggsBenidictMenu, Menu } from "~/components/Menu"
import { ActionDataContext, RSVP, UserContext } from "~/components/RSVP"
import { db } from "~/utilities/db.server"

// await db.user.create({ data: { shortCode: generateShortCode(8), name: "Test User" } })

export async function loader({ request }: LoaderArgs) {
    let shortCode = new URL(request.url).pathname.replace("/", "")
    let user = await db.user.findFirst({ where: { shortCode } })

    console.log("load", user)

    if (!user) {
        return redirect(process.env.GATE_URL!)
    }

    return json({
        mapboxToken: process.env.MAPBOX_TOKEN!,
        mapLink: "https://maps.apple.com/?daddr=1416+Berene+Ave",
        user,
    })
}

export async function action({ request }: ActionArgs) {
    let shortCode = new URL(request.url).pathname.replace("/", "")

    return namedAction(request, {
        async yes() {
            let data = await request.formData()

            console.log(data.get("plus_one"))

            let user = await db.user.update({
                where: { shortCode },
                data: {
                    name: data.get("name") as any,
                    plusOne: (data.get("plus_one") as any) !== 0,
                    dietaryRestrictions: data.get("dietary_restrictions") as any,
                },
            })

            console.log("update", user)

            return json({ ok: true })
        },
    })
}

// TODO: Add dark mode

export default function Invite() {
    const { mapboxToken, mapLink, user } = useLoaderData<typeof loader>()
    const actionData = useActionData<typeof action>()

    return (
        <main className="mx-auto flex max-w-7xl flex-col gap-6 pb-10 sm:py-10 sm:px-8 lg:px-28">
            <Header image="mimosas.jpg" title="Brunch" />
            <ActionDataContext.Provider value={actionData}>
                <UserContext.Provider value={user}>
                    <RSVP />
                </UserContext.Provider>
            </ActionDataContext.Provider>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Menu menu={eggsBenidictMenu} />
                <InfoCard mapLink={mapLink} mapboxToken={mapboxToken} />
                {/* TODO: Display a list of respondants and how they responded? */}
            </div>
        </main>
    )
}
