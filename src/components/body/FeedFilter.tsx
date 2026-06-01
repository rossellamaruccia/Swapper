import { useState } from "react"
import { Form, Row, Col, Card } from "react-bootstrap"

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
    <Card className="p-3 mb-4 shadow-sm">
      <Form>
        <Form.Group controlId="distanceRange">
          <Row className="align-items-center">
            <Col>
              <Form.Label className="fw-bold mb-0">
                Max Distance:{" "}
                <span className="text-primary">{distance} km</span>
              </Form.Label>
            </Col>
          </Row>
          <Form.Range
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
    </Card>
  )
}

export default FeedFilter
