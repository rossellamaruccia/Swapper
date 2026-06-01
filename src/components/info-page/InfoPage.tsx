import { Container, Row, Col } from "react-bootstrap"


function InfoPage() {
    return (
      <Container fluid className="hero w-100 py-5">
        <Row className="infoContainer">
          <Col>
            <h4>Who</h4>
            <p>
              This app was made by a Junior Full-Stack Dev girl with a passion
              for sharing practises and community building. My name is Rossella,
              I am 32yo and I live in the prettiest city, Pisa, Italy.
            </p>
          </Col>
        </Row>
        <Row className="infoContainer">
          <Col>
            <h4>Why</h4>
            <p>
              Sharing tools, technology and knowledge with fairness and
              solidarity is what makes a community thrive! Our world needs less
              buying, more cooperating.
            </p>
          </Col>
        </Row>
      </Container>
    )
}

export default InfoPage