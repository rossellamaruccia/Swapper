import { useState, useEffect } from "react"

import { useNavigate } from "react-router-dom"
import { Container, Row, Col, Button, Alert, Spinner } from "react-bootstrap"
import UserDetails from "./UserDetails"
import { getUserDetails } from "../../api/userApi"
import { getAuthStatus } from "../../utils/authTools"
import { getItemsPerUser } from "../../api/itemApi"
import type { ItemGetResponse, Item, UserGetResponse } from "../../types/types"
import ItemElement from "../body/feed-element/ItemCard"
import LoginForm from "../signup-page/LoginForm"
import { FaEdit } from "react-icons/fa"
import { FaRegMessage } from "react-icons/fa6"
import { FiLogOut } from "react-icons/fi"
import EditModal from "../body/feed-element/EditModal"
import { editItem } from "../../api/itemApi"
import { useAuth, useUser } from "../../utils/hooks"

interface AccountProps {
  authUser: string | null | undefined
  authToken: string | null
  error: boolean
  setError: (error: boolean) => void
}

const AccountContainer = ({ authToken, error, setError }: AccountProps) => {
  const [user, setUser] = useState<UserGetResponse | undefined>(undefined)
  const [items, setItems] = useState<ItemGetResponse[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<ItemGetResponse | null>(null)

  const navigate = useNavigate()
  const searchParams = new URLSearchParams(window.location.search)
  const queryUserId = searchParams.get("user")

  const { logout } = useAuth()
  const { userDetails, isLoading: isUserLoading } = useUser()

  const isOwnProfile =
    !queryUserId ||
    (userDetails?.id !== undefined && queryUserId === String(userDetails.id))

 
  useEffect(() => {
    if (!authToken || !getAuthStatus(authToken)) {
      setError(true)
      navigate("/login")
    }
  }, [authToken, navigate, setError])


  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true)

     
      if (isOwnProfile && isUserLoading) {
        return
      }

      if (isOwnProfile && userDetails) {
        setUser(userDetails)
        try {
          const itemsData = await getItemsPerUser(authToken, userDetails.id)
          setItems(itemsData ?? [])
        } catch (err) {
          console.error("Errore nel recupero degli item utente:", err)
        } finally {
          setLoading(false)
        }
      } else if (!isOwnProfile && queryUserId) {
        try {
          const userData = await getUserDetails(authToken, queryUserId)
          const itemsData = await getItemsPerUser(authToken, queryUserId)
          setUser(userData)
          setItems(itemsData ?? [])
        } catch (err) {
          console.error("Errore nel recupero del profilo esterno:", err)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchUserProfile()
  }, [queryUserId, isOwnProfile, userDetails, isUserLoading, authToken])

  const handleEditClick = (item: ItemGetResponse) => {
    setSelectedItem(item)
    setShowEditModal(true)
  }

  const handleCloseModal = () => {
    setShowEditModal(false)
    setSelectedItem(null)
  }

  const handleSaveItem = async (updatedItem: Item) => {
    if (selectedItem && authToken) {
      await editItem(authToken, updatedItem, selectedItem.id)
      // Aggiorna la lista locale degli item
      setItems((prev) =>
        prev.map((it) =>
          it.id === selectedItem.id ? { ...it, ...updatedItem } : it,
        ),
      )
      handleCloseModal()
    }
  }

  if (loading || isUserLoading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    )
  }

  if (error || !user) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="info" className="my-3 p-3 text-center w-50 mx-auto">
          Session expired or user not found. Please log in again.
        </Alert>
        <LoginForm />
      </Container>
    )
  }

  const favouriteItems = user.favouriteItems ?? []

  return (
    <Container fluid className="py-4">
      <Row className="align-items-top">
        <Col xs="12" md="9">
          
          <Row>
            <h1 className="mb-3 text-start">Uploaded Items ({items.length})</h1>
            {items.length > 0 ? (
              items.map((item) => (
                <Col xs="12" md="3" className="mt-1 mb-5" key={item.id}>
                  <ItemElement item={item} />
                  {isOwnProfile && (
                    <Button
                      onClick={() => handleEditClick(item)}
                      className="settingsButton my-1"
                    >
                      Edit item
                    </Button>
                  )}
                </Col>
              ))
            ) : (
              <p className="text-muted">
                {isOwnProfile
                  ? "You haven't posted any items yet."
                  : "This user hasn't posted any items yet."}
              </p>
            )}
          </Row>

          <Row className="my-5">
            <h1 className="mb-3 text-start">
              Favourites ({favouriteItems.length})
            </h1>
            {favouriteItems.length > 0 ? (
              favouriteItems.map((item) => (
                <Col xs="12" md="3" className="mt-1 mb-5" key={item.id}>
                  <ItemElement item={item} />
                </Col>
              ))
            ) : (
              <p className="text-muted">There are no elements here.</p>
            )}
          </Row>
        </Col>

        <Col xs="12" md="3" className="text-end">
          <UserDetails user={user} />
          {isOwnProfile ? (
            <>
              <Button className="navButton mt-1">
                <FaRegMessage />
                <span className="label">Check your messages</span>
              </Button>
              <Button
                className="navButton mt-0"
                onClick={() => {
                  logout()
                  navigate("/login")
                }}
              >
                <FiLogOut />
                <span className="label">Log out</span>
              </Button>
              <Button
                className="navButton mt-0"
                onClick={() => navigate("/account/edit")}
              >
                <FaEdit />
                <span className="label">Edit your profile</span>
              </Button>
            </>
          ) : (
            <Button
              className="navButton mt-1"
              onClick={() => navigate(`/messages?to=${user.id}`)}
            >
              <FaRegMessage />
              <span className="label">Send message</span>
            </Button>
          )}
        </Col>
      </Row>

      {isOwnProfile && selectedItem && (
        <EditModal
          show={showEditModal}
          handleClose={handleCloseModal}
          item={selectedItem}
          onSave={handleSaveItem}
        />
      )}
    </Container>
  )
}

export default AccountContainer
