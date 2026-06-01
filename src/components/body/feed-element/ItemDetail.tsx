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
} from "react-bootstrap"
import LoginForm from "../../signup-page/LoginForm"
import UserDetails from "../../account-page/UserDetails"
import { getUserDetails } from "../../../api/userApi"


const ItemDetail = () => {
  const [itemData, setItemData] = useState<ItemGetResponse | null>(null)
  const [userData, setUserData] = useState<UserGetResponse | null>(null)
  const [loading, setLoading] = useState(true)
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
      <Alert className="my-3 p-3 text-center w-50 mx-auto">
        Loading item...
        <Spinner />
      </Alert>
    )
  }

  if (error || !authToken) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="info" className="my-3 p-3 text-center w-50 mx-auto">
          Session expired. Please log in again.
        </Alert>
        <LoginForm />
      </Container>
    )
  }
  return (
    <Container>
      <Row>
        <Col xs="12" md="7">
          <Carousel>
            {itemData?.pics_urls?.map((pic, i = 0) => (
              <Carousel.Item key={i + 1}>
                <Image fluid src={pic} className="w-100 object-fit-cover"/>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col xs="6" md="3" className="mt-2">
          <h2>{itemData?.title}</h2>
          <p>{itemData?.description}</p>
          <br />
          <small>{itemData?.type}</small>
          <br />
          <small>{itemData?.category}</small>
        </Col>
        <Col xs="6" md="2">
          <UserDetails user={userData!} />
        </Col>
      </Row>
    </Container>
  )
}
export default ItemDetail
