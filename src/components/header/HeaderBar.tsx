import LogoButton from "./LogoButton"
import SearchField from "./SearchField"
import SettingsButton from "./SettingsButton"
import { Container, Row, Col, Navbar } from "react-bootstrap"
import AddButton from "./AddButton"
import HelpButton from "./HelpButton"
import CategoryButton from "../footer/CategoryButton"
import AccountButton from "./AccountButton"
import { ItemCategory } from "../../types/types"

function HeaderBar() {
  return (
    <Navbar className="" expand="md">
      <Container fluid className="nav navbar">
        <Row className="align-items-center w-100">
          <Col className="col col-xs-10 col-md-2 p-1">
            <LogoButton />
          </Col>
          <Col
            className="col col-xs-2 col-md-4 align-middle buttonsCol"
            md={{ order: 3 }}
          >
            <Navbar.Collapse id="responsive-navbar-nav">
              <AccountButton />
              <AddButton />
              <SettingsButton />
              <HelpButton />
            </Navbar.Collapse>
          </Col>

          <Col className="col-md-5" md={{ order: 2 }}>
            <SearchField />
          </Col>
          
          <Col xs="12">
            {Object.values(ItemCategory).map((value) => (
              <CategoryButton title={{ title: value }} />
            ))}
          </Col>
        </Row>
      </Container>
    </Navbar>
  )
}

export default HeaderBar
