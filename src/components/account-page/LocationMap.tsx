import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"

const ChangeView = ({ center }: { center: [number, number] }) => {
  const map = useMap()
  map.setView(center, 13)
  return null
}

interface MapProps {
  lat: number
  lng: number
}

const LocationMap = ({ lat, lng }: MapProps) => {
  const position: [number, number] = [lat, lng]

  return (
    <MapContainer
      zoom={13}
      style={{ height: "200px", width: "100%", borderRadius: "8px"}}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <ChangeView center={position} />
      <Marker position={position} />
    </MapContainer>
  )
}

export default LocationMap
