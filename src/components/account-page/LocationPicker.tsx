import { useState } from "react"
import { Form, Spinner } from "react-bootstrap"

interface LocationPickerProps {
  onLocationFound: (coords: { lat: number; lng: number } | null) => void
}

const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationFound }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasLocation, setHasLocation] = useState(false)

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported.")
      return
    }

    setLoading(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        setLoading(false)
        setHasLocation(true)
        onLocationFound(coords)
      },
      (err) => {
        setLoading(false)
        setError("Please enable location permissions in your browser." + err)
        onLocationFound(null)
      },
      { timeout: 5000 },
    )
  }

  return (
    <div>
      <Form.Check
        type="switch"
        id="location-switch"
        label={loading ? "Finding you..." : "Share my location for local swaps"}
        onChange={(e) => {
          if (e.target.checked) handleGeolocation()
          else {
            setHasLocation(false)
            onLocationFound(null)
          }
        }}
      />

      {loading && <Spinner animation="border" size="sm" className="mt-2" />}

      {hasLocation && !loading && (
        <small className="text-success d-block mt-1">
          📍 Location captured successfully!
        </small>
      )}

      {error && <small className="text-danger d-block mt-1">⚠️ {error}</small>}
    </div>
  )
}

export default LocationPicker
