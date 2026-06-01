import { useState, useEffect } from "react"
import type { ChangeEvent } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import type { ItemGetResponse, Item } from "../../../types/types"
import { ItemType, ItemCategory } from "../../../types/types"

interface EditModalProps {
  show: boolean
  handleClose: () => void
  item: ItemGetResponse | null
  onSave: (updatedItem: Item) => void
}

const EditModal = ({ show, handleClose, item, onSave }: EditModalProps) => {
  const [formData, setFormData] = useState<Item | null>(null)
  //const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const formatCategory = (str: string) =>
    str
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase())

  useEffect(() => {
    setFormData(item)
  }, [item])

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    if (!formData) return

    const { name, value } = e.target
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null))
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || !formData) return

    if (files.length > 5) {
      setError("You can only upload a maximum of 5 images.")
      e.target.value = ""
      return
    }

    const fileArray = Array.from(files)
    setFormData({
      ...formData,
      pics: fileArray,
    })

    setError(null)
  }

  const handleSubmit = () => {
    if (formData && item) {
      onSave(formData)
      handleClose()
    }
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit your item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {formData && (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>title: </Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>description:</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>type:</Form.Label>
              <div>
                <Form.Check
                  inline
                  label="Borrow"
                  name="type"
                  type="radio"
                  id="type-borrow"
                  value={ItemType[0]}
                  checked={formData.type === ItemType[0]}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label="Donate"
                  name="type"
                  type="radio"
                  id="type-donate"
                  value={ItemType[1]}
                  checked={formData.type === ItemType[1]}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={formData?.category}
                onChange={handleChange}
              >
                {Object.values(ItemCategory).map((value) => (
                  <option key={value} value={value}>
                    {formatCategory(value)}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>edit pics (Max 5)</Form.Label>
              <Form.Control type="file" multiple onChange={handleFileChange} />
              <Form.Control.Feedback type="invalid">
                {error}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" className="mx-1 p-1" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="success" className="mx-1 p-1" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditModal
