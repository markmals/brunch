import type { Response as UserResponse } from "@prisma/client/edge"
import type { APIContext } from "astro"
import invariant from "tiny-invariant"
import { db } from "../lib/db.server"

export async function post({ request }: APIContext) {
    let data = await request.formData()

    let shortCode = data.get("short-code") as string | null
    invariant(shortCode)

    let response = data.get("response") as UserResponse | null
    invariant(response)

    let name = data.get("name") as string | null
    invariant(name)

    let plusOne = data.get("plus-one") === "true"
    if (response !== "YES") plusOne = false

    let dietaryRestrictions = (data.get("dietary-restrictions") as string | null) ?? ""
    if (response !== "YES") dietaryRestrictions = ""

    let user = await db.user.update({
        where: { shortCode },
        data: {
            response,
            name,
            plusOne,
            dietaryRestrictions,
        },
    })

    return new Response(JSON.stringify(user), {
        headers: { "Content-Type": "application/json; charset=utf-8" },
    })
}
