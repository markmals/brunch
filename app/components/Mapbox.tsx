import mapboxgl from "mapbox-gl"
import { useEffect, useRef } from "react"

export function Map({ token }: { token: string }) {
    const mapContainer = useRef<HTMLDivElement | null>(null)
    const map = useRef<mapboxgl.Map | null>(null)
    const marker = useRef<mapboxgl.Marker | null>(null)

    useEffect(() => {
        if (map.current) {
            if (marker.current) return
            marker.current = new mapboxgl.Marker({ color: "#4f46e5" })
            marker.current.setLngLat([-97.68353394771864, 30.28148032602474])
            marker.current.addTo(map.current)
        } else {
            map.current = new mapboxgl.Map({
                accessToken: token,
                container: mapContainer.current!,
                style: "mapbox://styles/mapbox/streets-v12",
                center: [-97.68353394771864, 30.28148032602474],
                zoom: 14,
                dragPan: false,
                scrollZoom: false,
                attributionControl: false,
            })
        }
    })

    return <div className="h-52 w-full rounded-md border border-black/25" ref={mapContainer} />
}
