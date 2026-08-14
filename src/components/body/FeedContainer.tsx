import { Container, Row, Col, Spinner, Alert } from "react-bootstrap"
import ItemCard from "./feed-element/ItemElement"
import type { ItemGetResponse } from "../../types/types"
import FeedFilter from "./FeedFilter"
import { useState } from "react"
import HorizontalScrollCategories from "./HorizontalScrollCategories"


interface FeedProps {
  items: ItemGetResponse[]
  loading: boolean
  error: boolean
}

const FeedContainer = ({ items, loading, error }: FeedProps) => {
  const [radius, setRadius] = useState(20)

  return (
    <Container fluid className="py-4">
      <HorizontalScrollCategories />
      <Row>
        <FeedFilter onDistanceChange={(val: number) => setRadius(val)} />
      </Row>
      <Row className="mb-4">
        <Col>
          <h1>What's new around you:</h1>
          <hr />
        </Col>
      </Row>

      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p>Finding items in your area...</p>
        </div>
      )}

      {error && (
        <Alert variant="danger">
          Could not load the feed. Please try again later.
        </Alert>
      )}

      {!loading && !error && items.length === 0 && (
        <p className="text-center text-muted">
          No items found within {radius}km. Be the first to post something!
        </p>
      )}

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {items.map((item) => (
          <Col xs="12" md="3" key={item.id}>
            <ItemCard item={item} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default FeedContainer
