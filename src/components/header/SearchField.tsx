import { Component } from "react"
import { Form, Col, Row } from "react-bootstrap"
import { InputGroup } from "react-bootstrap"
import { FaSearch } from "react-icons/fa"

class SearchField extends Component {
  state = {
    formValue: {
      searchRequest: "",
    },
  }

  render() {
    return (
      <>
        <Form as={Row}>
          <Form.Group as={Col} className="mx-0 my-3">
            <InputGroup>
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search"
                className="formCol"
                value={this.state.formValue.searchRequest}
                onChange={(e) => {
                  this.setState({
                    formValue: {
                      ...this.state.formValue,
                      searchRequest: e.target.value,
                    },
                  })
                }}
              />
            </InputGroup>
          </Form.Group>
        </Form>
      </>
    )
  }
}
export default SearchField
