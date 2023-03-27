/** @type {import("@remix-run/dev").AppConfig} */
module.exports = {
    ignoredRouteFiles: ["**/.*"],
    future: {
        v2_routeConvention: true,
        v2_meta: true,
        // FIXME: HMR doesn't work without a Node server yet :(
        // unstable_dev: true,
        unstable_tailwind: true,
    },
}
