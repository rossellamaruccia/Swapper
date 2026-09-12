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
  Image,
  Alert,
  Spinner,
  Button,
} from "react-bootstrap"
import LoginForm from "../../signup-page/LoginForm"
import UserDetails from "../../account-page/UserDetails"
import { getUserDetails } from "../../../api/userApi"
import FavButton from "./FavButton"

//Parent component
//children: Item Element, Edit Modal

interface Props {
  activeUserId: string
}

const ItemDetail = ({ activeUserId }: Props) => {
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
        const user = await getUserDetails(authToken, item.user_id!)
        setItemData(item)
        setUserData(user)
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
        <Alert className="text-center bg-danger-subtle border-0 text-danger">
          Loading item...
        </Alert>
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
    <>
      <Row className="bg-danger-subtle rounded">
        {itemData?.pics_urls?.map((pic, i = 0) => (
          <Col xs="12" md="6" className="mt-3">
            <Image
              key={i + 1}
              fluid
              src={pic}
              className="w-100 object-fit-cover h-75 rounded"
            />
          </Col>
        ))}
      </Row>
      <Row className="mx-0 itemDetails">
        <Col xs="10" md="7" className="m-0 mb-2 p-0">
          <br />
          <h2>{itemData?.title}</h2>
          <p>{itemData?.description}</p>
          <br />
          <small className="red-highlight">{itemData?.type}</small>
          <br />
          <small className="red-highlight">{itemData?.category}</small>
          <br />
        </Col>
        <Col xs="1" className="favouritesButton me-0" id="favButton">
          <FavButton itemId={Number(itemID)} />
        </Col>
      </Row>
      <Row>
        {activeUserId === userData?.id ? (
          <>
            <Button>Edit</Button>
            <Button>Delete</Button>
          </>
        ) : (
          <Col xs="12" md="4">
            <UserDetails user={userData!} />
            <Button className="mt-2 contactButton">Contact the owner</Button>
          </Col>
        )}
      </Row>
    </>
  )
}
export default ItemDetail
