import LogoButton from "./LogoButton"
import SearchField from "./SearchField"
import SettingsButton from "./SettingsButton"
import { Row, Col, Navbar, Container } from "react-bootstrap"
import AddButton from "./AddButton"
import HelpButton from "./HelpButton"
import CategoryButton from "../footer/CategoryButton"
import AccountButton from "./AccountButton"
import { ItemCategory } from "../../types/types"

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
          <Navbar.Collapse id="responsive-navbar-nav">
            <AccountButton />
            <AddButton />
            <SettingsButton />
            <HelpButton />
          </Navbar.Collapse>
        </Col>

        <Col className="col col-12" md={{ order: 3 }}>
          {Object.values(ItemCategory).map((value) => (
            <CategoryButton title={{ title: value }} />
          ))}
        </Col>
      </Row>
    </Navbar>
  )
}

export default HeaderBar
