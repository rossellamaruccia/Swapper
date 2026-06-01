import { Button } from "react-bootstrap"
import { IoIosAddCircleOutline } from "react-icons/io"

function AddButton() {
  return (
    <>
      <Button className="btn settingsButton fs-2 fw-bold text-success" href="/add">
        <IoIosAddCircleOutline />
        <span className="label">Add a new item</span>
      </Button>
    </>
  )
}

export default AddButton
