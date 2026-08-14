import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import {
  type UserGetResponse,
  type ItemGetResponse,
} from "../../../types/types"
import { getItemDetails } from "../../../api/itemApi"
import {
  Container,
  Row,
  Col,
  Carousel,
  Image,
  Alert,
  Spinner,
  Button,
} from "react-bootstrap"
import LoginForm from "../../signup-page/LoginForm"
import UserDetails from "../../account-page/UserDetails"
import { getUserDetails } from "../../../api/userApi"

//Parent component
//children: Item Element, Edit Modal

const ItemDetail = () => {
  const [itemData, setItemData] = useState<ItemGetResponse | null>(null)
  const [userData, setUserData] = useState<UserGetResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [searchParams] = useSearchParams()
  const itemID = searchParams.get("itemID")
  const authToken = localStorage.getItem("accessToken")

  useEffect(() => {
    const loadItem = async () => {
      try {
        setLoading(true)
        const item = await getItemDetails(authToken, Number(itemID))

        if (item) {
          const user = await getUserDetails(authToken, item.user_id!)

          setItemData(item)
          setUserData(user)
        }
      } catch (err) {
        setError(true)
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    loadItem()
  }, [itemID, authToken])

  if (loading) {
    return (
      <Container>
        <Alert className="text-center bg-danger-subtle border-0 text-danger">Loading item...</Alert>
        <Spinner className="mx-auto d-block text-danger" />
      </Container>
    )
  }

  if (error || !authToken) {
    return (
      <Container>
        <Alert className="text-center bg-danger-subtle border-0 text-danger">
          Session expired. Please log in again.
        </Alert>
        <LoginForm />
      </Container>
    )
  }
  return (
      <Row>
        <Col xs="12" md="8" className="mb-2">
          <Carousel>
            {itemData?.pics_urls?.map((pic, i = 0) => (
              <Carousel.Item key={i + 1}>
                <Image fluid src={pic} className="w-100 object-fit-cover" />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col xs="12" md="4">
          <h2>{itemData?.title}</h2>
          <p>{itemData?.description}</p>
          <br />
          <small className="red-highlight">{itemData?.type}</small>
          <br />
          <small className="red-highlight">{itemData?.category}</small>
        </Col>
        <Col xs="12" md="5" className="p-2">
          <Button variant="success">Contact the owner</Button>
          <UserDetails user={userData!} />
        </Col>
      </Row>
  )
}
export default ItemDetail
