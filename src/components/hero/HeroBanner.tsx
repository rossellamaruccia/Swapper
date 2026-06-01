import { Card, Container, Row, Col, Button } from "react-bootstrap"

function HeroBanner() {
    return (
      <Container fluid className="hero w-100 py-5">
        <Row>
          <Col className="py-5" xs="9" md="6">
            <Card className="w-75">
              <Card.Body>
                <Card.Title>Find the swappers around you!</Card.Title>
                <Card.Text>
                  Meet your neighbours, lend and get what you need without
                  buying, donate what you don't need, help others and the
                  planet.
                </Card.Text>
                <Button
                  className="btn btn-success py-1 px-2 me-2 mb-2 fs-6 subscribeButton"
                  href="/signup"
                >
                  Subscribe
                </Button>
                <Button
                  className="btn btn-outline-success bg-transparent py-1 px-2 me-2 mb-2 fs-6 subscribeButton"
                  href="/info"
                >
                  Discover more
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    )
}

export default HeroBanner