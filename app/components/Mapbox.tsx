import { Map as Mapbox, Marker } from "mapbox-gl"
import { useCallback, useEffect, useRef } from "react"

export function Map({ token }: { token: string }) {
    const mapContainer = useRef<HTMLDivElement | null>(null)
    const map = useRef<Mapbox | null>(null)
    const marker = useRef<Marker | null>(null)
    const mediaList = useRef<MediaQueryList | null>(null)

    const onChange = useCallback((event: MediaQueryListEvent) => {
        map.current?.setStyle(
            event.matches ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/streets-v12"
        )
    }, [])

    useEffect(() => {
        if (map.current) {
            if (marker.current) return
            marker.current = new Marker({ color: "#4f46e5" })
            marker.current.setLngLat([-97.68353394771864, 30.28148032602474])
            marker.current.addTo(map.current)
        } else {
            map.current = new Mapbox({
                accessToken: token,
                container: mapContainer.current!,
                center: [-97.68353394771864, 30.28148032602474],
                zoom: 14,
                dragPan: false,
                scrollZoom: false,
                attributionControl: false,
            })

            mediaList.current = window.matchMedia("(prefers-color-scheme: dark)")

            map.current?.setStyle(
                mediaList.current.matches
                    ? "mapbox://styles/mapbox/dark-v11"
                    : "mapbox://styles/mapbox/streets-v12"
            )

            mediaList.current?.addEventListener("change", onChange)

            // FIXME: This is being run immediately instead of on destroy of this cmp for some reason
            // return () => mediaList.current?.removeEventListener("change", onChange)
        }
    })

    return <div className="h-52 w-full rounded-md border border-black/25" ref={mapContainer} />
}
