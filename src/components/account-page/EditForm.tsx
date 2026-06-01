import { useState, useEffect, type ChangeEvent, type SubmitEvent } from "react"
import { Container, Form, Button, Alert } from "react-bootstrap"
import type { User } from "../../types/types"
import {
  modifyUser,
  getUserInfo,
  updateProfilePic,
  updateUserLocation,
} from "../../api/userApi"
import { useNavigate } from "react-router-dom"
import { getAuthStatus } from "../../utils/authTools"
import LocationPicker from "./LocationPicker"
import LocationMap from "./LocationMap"

const EditForm = () => {
  const navigate = useNavigate()
  const authToken = localStorage.getItem("accessToken")

  const [user, setUser] = useState<User>({
    name: "",
    surname: "",
    email: "",
    profilePic: undefined,
    city: "",
    location: {
      lng: 0.0,
      lat: 0.0,
    },
  })

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const loadUser = async () => {
      if (!authToken || !getAuthStatus(authToken)) {
        navigate("/login")
        return
      }
      try {
        const userData = await getUserInfo(authToken)
        setUser(userData)
      } catch (err) {
        setError("Could not get user information")
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }
    loadUser()
  }, [authToken, navigate])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = await updateProfilePic(authToken, e.target.files[0])
      setUser((prev) => ({
        ...prev,
        profilePic: file,
      }))
    }
  }

  const handleLocationChange = (
    coords: { lat: number; lng: number } | null,
  ) => {
    setUser((prev) => ({
      ...prev,
      location: coords ? coords : { lat: 0, lng: 0 },
    }))
    updateUserLocation(authToken, user.location!)
  }

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      await modifyUser(authToken!, user)
      console.log("Update successful")
      navigate("/account")
    } catch (err) {
      console.log(err)
      setError("Something went wrong during the update.")
      setSubmitting(false)
    }
  }

  if (isLoading) return <Container className="py-5">Loading...</Container>

  return (
    <Container className="hero py-5">
      <Form className="customForm" onSubmit={handleSubmit}>
        <h4>Edit your profile</h4>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form.Group className="mb-2">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            value={user.name}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Surname</Form.Label>
          <Form.Control
            name="surname"
            type="text"
            value={user.surname}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            value={user.email}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>City</Form.Label>
          <Form.Control
            name="city"
            type="text"
            value={user.city}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload a profile picture</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>

        <Form.Group className="my-3 p-3 border rounded bg-light">
          <h6>Update my location</h6>
          <LocationPicker onLocationFound={handleLocationChange} />
          {user.location ? (
            <div className="mt-3">
              <LocationMap lat={user.location.lat} lng={user.location.lng} />
            </div>
          ) : (
            <></>
          )}
        </Form.Group>

        <Button
          variant="success"
          type="submit"
          disabled={submitting}
          className="btn btn-success py-1 px-2 me-2 mb-2 fs-6 subscribeButton"
        >
          {submitting ? "Saving..." : "Edit profile"}
        </Button>
      </Form>
    </Container>
  )
}

export default EditForm
