import { redirect } from "@vercel/remix"

export function loader() {
    return redirect(process.env.GATE_URL!)
}
