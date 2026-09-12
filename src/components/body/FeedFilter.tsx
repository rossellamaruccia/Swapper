import { useState } from "react"
import { Form, Row } from "react-bootstrap"

const FeedFilter = ({onDistanceChange,}: {onDistanceChange: (distance: number) => void }) => {
  const [distance, setDistance] = useState(20)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setDistance(Number(value))
  }

  const handleRelease = () => {
    onDistanceChange(distance)
    localStorage.setItem("distance_preference", String(distance))
  }

  return (
      <Form className="distance-filter">
        <Form.Group controlId="distanceRange">
          <Row>
            <Form.Label>
              Max distance: <span className="red-highlight">{distance} km</span>
            </Form.Label>
          </Row>
        <Form.Range
          className="red-highlight"
            value={distance}
            min="1"
            max="250"
            step="5"
            onChange={handleChange}
            onMouseUp={handleRelease}
            onTouchEnd={handleRelease}
          />
        </Form.Group>
      </Form>
  )
}

export default FeedFilter
