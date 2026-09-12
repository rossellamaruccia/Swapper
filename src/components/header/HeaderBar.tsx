import LogoButton from "./LogoButton"
import SearchField from "./SearchField"
import SettingsButton from "./SettingsButton"
import { Row, Col, Navbar, Container } from "react-bootstrap"
import AddButton from "./AddButton"
import HelpButton from "./HelpButton"
import AccountButton from "./AccountButton"

function HeaderBar() {
  return (
    <Navbar as={Container} className="nav navbar" expand="md">
      <Row className="align-items-center w-100">
        <Col className="logoCol" md={{ order: 0 }}>
          <LogoButton />
        </Col>
        <Col className="" md={{ order: 1 }}>
          <SearchField />
        </Col>
        <Col className="buttonsCol" md={{ order: 2 }}>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <AccountButton />
            <AddButton />
            <SettingsButton />
            <HelpButton />
          </Navbar.Collapse>
        </Col>
      </Row>
    </Navbar>
  )
}

export default HeaderBar
