import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet"
import { LatLngExpression, L } from "leaflet"
import "leaflet/dist/leaflet.css"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})
L.Marker.prototype.options.icon = DefaultIcon

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
  const position: LatLngExpression = [lat, lng]

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "200px", width: "100%", borderRadius: "8px" }}
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
