import LogoButton from "./LogoButton"
import SearchField from "./SearchField"
import { Row, Col, Navbar, Container, Button } from "react-bootstrap"
import { IoIosAddCircleOutline, IoMdMenu } from "react-icons/io"
import { RxQuestionMarkCircled } from "react-icons/rx"
import { VscSettingsGear, VscAccount } from "react-icons/vsc"
import { useState } from "react"

function HeaderBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => setIsMenuOpen((prev) => !prev)
  return (
    <Navbar as={Container}>
      <Row className="align-items-center w-100">
        <Col className="logoCol" md={{ order: 0 }}>
          <LogoButton />
        </Col>
        <Col className="d-md-none d-flex justify-content-end">
          <Button
            className="collapseMenuButton navButton"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
          >
            <IoMdMenu />
          </Button>
        </Col>
        <Col
          className={`align-self-end ${isMenuOpen ? "d-flex collapseMenu" : "d-none"} d-md-flex flex-column flex-md-row h-sm-100`}
        >
          <Col md={{ order: 1 }}>
            <SearchField />
          </Col>
          <Col className="buttonsCol flex-column flex-md-row" md={{ order: 2 }}>
            <Button className="navButton" href="/account">
              <VscAccount />
              <span className="label">Your account</span>
            </Button>
            <Button
              className="navButton fs-2 fw-bold text-success"
              href="/add"
            >
              <IoIosAddCircleOutline />
              <span className="label">Add a new item</span>
            </Button>
            <Button className="navButton" href="/settings">
              <VscSettingsGear />
              <span className="label">Settings</span>
            </Button>
            <Button className="navButton" href="/help">
              <RxQuestionMarkCircled />
              <span className="label">Help</span>
            </Button>
          </Col>
        </Col>
      </Row>
    </Navbar>
  )
}

export default HeaderBar
