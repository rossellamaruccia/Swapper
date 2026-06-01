import { useState, useEffect } from "react"
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap"
import ItemCard from "./feed-element/ItemElement"
import type { ItemGetResponse } from "../../types/types"
import { getAllItems, getItemsPerCategory } from "../../api/itemApi"
import FeedFilter from "./FeedFilter"

const FeedContainer = () => {
  const [items, setItems] = useState<ItemGetResponse[]>([])
  const [radius, setRadius] = useState(20)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const authToken = localStorage.getItem("accessToken")
  const category = localStorage.getItem("category")

  const fetchItems = async () => {
    try {
      setLoading(true)
      let data: ItemGetResponse[] = []
      if (category != "") {
        data = await getItemsPerCategory(authToken, category, radius)
      } else {
        data = await getAllItems(authToken, radius)
      }
      setItems(data)
    } catch (err) {
      console.error(err)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [authToken, category, radius])

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h4>What's new around you:</h4>
          <hr />
        </Col>
      </Row>
      <Row>
        <FeedFilter onDistanceChange={(val : number) => setRadius(val)} />
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
