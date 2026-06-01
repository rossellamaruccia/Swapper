import { useState } from "react"
import { Container, Form, Button, Alert } from "react-bootstrap"
import LocationPicker from "../account-page/LocationPicker"
import { newUser } from "../../api/userApi"
import LocationMap from "../account-page/LocationMap"

const SubscribeForm = () => {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    city: "",
    location: {
      lng: 0.0,
      lat: 0.0,
    },
  })

  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const isLocationCaptured = user.location.lat !== 0 && user.location.lng !== 0
  const isFormFilled = user.email.length > 0 && user.password.length > 0

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleLocationChange = (
    coords: { lat: number; lng: number } | null,
  ) => {
    setUser((prev) => ({
      ...prev,
      location: coords ? coords : { lat: 0, lng: 0 },
    }))
  }

  const handleSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault()
    if (!isLocationCaptured) return
    setErrorMessage(null)
    try {
      await newUser(user)
      setIsSuccess(true)
    } catch (error) {
      setErrorMessage("Something went wrong: " + error)
    }
  }

  return (
    <Container className="hero py-5">
      <Form className="customForm" onSubmit={handleSubmit}>
        <h4>Become a swapper!</h4>

        <Form.Group className="mb-2">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Enter your name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Surname</Form.Label>
          <Form.Control
            name="surname"
            type="text"
            placeholder="Enter your surname"
            value={user.surname}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            value={user.email}
            onChange={handleChange}
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            name="city"
            type="text"
            placeholder="City"
            value={user.city}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="my-3 p-3 border rounded bg-light">
          <h6>Privacy & Location</h6>
          <LocationPicker onLocationFound={handleLocationChange} />
          {user.location.lat !== 0 && (
            <div className="mt-3">
              
              <LocationMap lat={user.location.lat} lng={user.location.lng} />
            </div>
          )}
        </Form.Group>

        <Button
          variant="success"
          type="submit"
          className="px-4 py-2 mb-2"
          disabled={!isLocationCaptured || !isFormFilled}
        >
          Subscribe
        </Button>

        <div className="mt-2">
          <span>Already subscribed? </span>
          <a href="/login">Login</a>
        </div>

        {isSuccess && (
          <Alert variant="success" className="mt-3">
            You're in! Check your confirmation email and start exploring
            Swappie.
          </Alert>
        )}

        {errorMessage && (
          <Alert variant="danger" className="mt-3">
            {errorMessage}
          </Alert>
        )}
      </Form>
    </Container>
  )
}

export default SubscribeForm
