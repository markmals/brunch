export async function get() {
    return Response.redirect(import.meta.env.GATE_URL!);
}

// TODO: Admin page
//
// - Create new users
//    - Generate short code
//    - Add name
//    - Get link to send
// - See current users responses without going to the db
// - Build/update menus
// - Create new events/manage existing events
