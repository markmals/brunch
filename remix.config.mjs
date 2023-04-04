/** @type {import("@remix-run/dev").AppConfig} */
export default {
    ignoredRouteFiles: ["**/.*"],
    serverDependenciesToBundle: ["mapbox-gl"],
    future: {
        v2_meta: true,
        v2_routeConvention: true,
        v2_normalizeFormMethod: true,
        v2_errorBoundary: true,
        unstable_dev: true,
        unstable_tailwind: true,
    },
}
