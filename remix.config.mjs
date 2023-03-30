/** @type {import("@remix-run/dev").AppConfig} */
export default {
    ignoredRouteFiles: ["**/.*"],
    serverDependenciesToBundle: ["mapbox-gl"],
    future: {
        v2_routeConvention: true,
        v2_meta: true,
        unstable_tailwind: true,
    },
}
