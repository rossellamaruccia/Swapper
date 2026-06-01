import "../../customs.css"
import { Container, Row, Col } from "react-bootstrap"
import { FaGooglePlay } from "react-icons/fa"
import { FaApple } from "react-icons/fa"
import CustomLink from "./CustomLink"
import LogoButton from "../header/LogoButton"

function FooterBar() {
  return (
    <>
      <Container fluid className="mb-2">
        <hr></hr>
        <Row className="text-center">
          <Col>
            <h4>Swappie</h4>
            <CustomLink title={{ title: "Who and why" }} />
            <CustomLink title={{ title: "Community and care" }} />
            <CustomLink title={{ title: "Results" }} />
          </Col>
          <Col>
            <h4>Discover</h4>
            <CustomLink title={{ title: "How does this work?" }} />
            <CustomLink title={{ title: "Safety and privacy issues" }} />
            <CustomLink title={{ title: "No money policy" }} />
          </Col>
          <Col>
            <h4>Help</h4>
            <CustomLink title={{ title: "FAQ" }} />
            <CustomLink title={{ title: "Contacts" }} />
            <CustomLink title={{ title: "Profile issues" }} />
          </Col>
        </Row>
        <hr></hr>
        <Row>
          <Col>
            <LogoButton />
          </Col>
          <Col className="buttonsCol">
            <p>Download our app: </p>
            <FaGooglePlay className="mx-2" />
            <FaApple />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default FooterBar
