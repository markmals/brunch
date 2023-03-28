import type { Response as UserResponse } from "@prisma/client"
import { useActionData, useLoaderData } from "@remix-run/react"
import type { ActionArgs, LoaderArgs } from "@vercel/remix"
import { json, redirect } from "@vercel/remix"
import invariant from "tiny-invariant"
import { Header } from "~/components/Header"
import { InfoCard } from "~/components/InfoCard"
import { eggsBenidictMenu, Menu } from "~/components/Menu"
import { ActionDataContext, RSVP, UserContext } from "~/components/RSVP"
import { db } from "~/utilities/db.server"

export async function loader({ request }: LoaderArgs) {
    let shortCode = new URL(request.url).pathname.replace("/", "")
    let user = await db.user.findFirst({ where: { shortCode } })

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

    let data = await request.formData()

    let response = data.get("response") as UserResponse | null
    invariant(response)

    let name = data.get("name") as string | null
    invariant(name)

    let plusOne = (data.get("plus_one") as 0 | 1 | null) === 1
    if (response !== "YES") plusOne = false

    let dietaryRestrictions = (data.get("dietary_restrictions") as string | null) ?? ""
    if (response !== "YES") dietaryRestrictions = ""

    await db.user.update({
        where: { shortCode },
        data: {
            response,
            name,
            plusOne,
            dietaryRestrictions,
        },
    })

    return json({ ok: true })
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
