import { Form, Button, Container, Alert } from "react-bootstrap"
import { addNewItem } from "../../api/itemApi"
import { useState, type ChangeEvent, type SubmitEvent } from "react"
import { useNavigate } from "react-router-dom"
import { ItemCategory, ItemType } from "../../types/types"

const AddForm = () => {
  const authToken = localStorage.getItem("accessToken")
  const navigate = useNavigate()
  const formatCategory = (str: string) =>
    str
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase())

  const [item, setItem] = useState({
    title: "",
    description: "",
    pics: [] as File[],
    type: "BORROW",
    category: "WORK_TOOLS",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setItem((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 5) {
      setError("You can only upload a maximum of 5 images.")
      e.target.value = ""
      return
    }
    setError(null)
    setItem((prev) => ({ ...prev, pics: files ? Array.from(files) : [] }))
  }

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await addNewItem(authToken, item)
      alert("Upload successful!")
      navigate("/account")
    } catch (err) {
      setError(
        "Failed to upload item. Please check your connection or file size.",
      )
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="w-75">
      <h2>Upload Item</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Item title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={item.title}
            onChange={handleChange}
            placeholder="Enter item title"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={item.description}
            onChange={handleChange}
            rows={2}
            placeholder="Enter item description. 255 characters max."
          />
          {item.description.length > 255 ? (
            <Alert variant="success">
              max characters for the description is 255. Less words more
              sharing!
            </Alert>
          ) : (
            <></>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Item Type</Form.Label>
          <div>
            <Form.Check
              inline
              label="Borrow"
              name="type"
              type="radio"
              id="type-borrow"
              value="BORROW"
              checked={item.type === ItemType[0]}
              onChange={handleChange}
            />
            <Form.Check
              inline
              label="Donate"
              name="type"
              type="radio"
              id="type-donate"
              value="DONATE"
              checked={item.type === ItemType[1]}
              onChange={handleChange}
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            name="category"
            value={item.category}
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
          <Form.Label>Upload Files (Max 5)</Form.Label>
          <Form.Control
            type="file"
            multiple
            isInvalid={!!error}
            onChange={handleFileChange}
          />
          <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          disabled={loading || !!error || item.pics.length === 0}
          className="btn btn-success py-1 px-2 me-2 mb-2 fs-6 subscribeButton"
        >
          {loading ? "Uploading..." : "Upload Item"}
        </Button>
      </Form>
    </Container>
  )
}

export default AddForm
