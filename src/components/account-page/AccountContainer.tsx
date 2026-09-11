import { useState, useEffect } from "react"

import { useNavigate } from "react-router-dom"
import { Container, Row, Col, Button, Alert } from "react-bootstrap"
import UserDetails from "./UserDetails"
import { getUserDetails } from "../../api/userApi"
import { getAuthStatus } from "../../utils/authTools"
import { getItemsPerUser } from "../../api/itemApi"
import type { ItemGetResponse, Item, UserGetResponse } from "../../types/types"
import ItemElement from "../body/feed-element/ItemCard"
import LoginForm from "../signup-page/LoginForm"
import { FaEdit } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import { FaRegMessage } from "react-icons/fa6"
import { FiLogOut } from "react-icons/fi"
import EditModal from "../body/feed-element/EditModal"
import { editItem } from "../../api/itemApi"

interface AccountProps {
  authUser: string
  authToken: string
  error: boolean
  setError: (error: boolean) => void
}

const AccountContainer = ({ authUser, authToken, error, setError }: AccountProps) => {
  const [user, setUser] = useState<UserGetResponse | null>(null)
  const [items, setItems] = useState<ItemGetResponse[] | undefined>([])
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<ItemGetResponse | null>(null)
  const navigate = useNavigate()

  
  const fetchUserDetails = async () => {
    const searchParams = new URLSearchParams(window.location.search)
    const id = searchParams.get("user")

    if (!authToken || !getAuthStatus(authToken)) {
      setError(true)
      navigate("/login")
    }

    try {
      if(!id){
      const [userData, itemData] = await Promise.all([
        getUserDetails(authToken, authUser),
        getItemsPerUser(authToken, authUser),
      ])
        setUser(userData)
        setItems(itemData)
      }
      else {
        const [userData, itemData] = await Promise.all([
          getUserDetails(authToken, id),
          getItemsPerUser(authToken, id)
        ])
        setUser(userData)
        setItems(itemData)
      }
    } catch {
      setError(true)
    }
  }

  const logout = async () => {
    localStorage.setItem("accessToken", "")
  }

  useEffect(() => {
      fetchUserDetails()
  }, [selectedItem, authToken])

  const handleEditClick = (item: ItemGetResponse) => {
    setShowEditModal(true)
    setSelectedItem(item)
  }

  const handleCloseModal = () => {
    setShowEditModal(false)
    setSelectedItem(null)
  }

  const handleSaveItem = async (updatedItem: Item) => {
    console.log("Saving updated item:", updatedItem)
    await editItem(authToken, updatedItem, selectedItem!.id)

    handleCloseModal()
  }

  return (
    <>
      {!error || user ? (
        <Container fluid className="py-4">
          <Row className="align-items-top">
            <Col xs="12" md="9">
              <UserDetails user={user} />
            </Col>
            <Col xs={12} md="3" className="text-end">
              <Button className="btn settingsButton mt-1">
                <FaRegMessage />
                <span className="label">Check your messages</span>
              </Button>
              <Button
                className="btn settingsButton mt-0"
                onClick={() => {
                  logout()
                  navigate("/login")
                }}
              >
                <FiLogOut />
                <span className="label">Log out</span>
              </Button>
              <Button
                className="btn settingsButton mt-0"
                onClick={() => navigate("/account/edit")}
              >
                <FaEdit />
                <span className="label">Edit your profile</span>
              </Button>
              <Button className="btn settingsButton mt-0">
                <MdDelete />
                <span className="label">Delete your profile</span>
              </Button>
            </Col>

            <Col xs="12">
              <Row className="my-5">
              <h3 className="mb-4">Your Items ({items!.length})</h3>
                {items!.length > 0 ? (
                  items!.map((item, i) => (
                    <Col xs="12" md="3" className="mt-1 mb-5" key={i + 1}>
                      <ItemElement item={item} />
                      <Button
                        onClick={() => handleEditClick(item)}
                        className="settingsButton my-1"
                      >
                        Edit item
                      </Button>
                      <EditModal
                        show={showEditModal}
                        handleClose={handleCloseModal}
                        item={item}
                        onSave={handleSaveItem}
                      />
                    </Col>
                  ))
                ) : (
                  <p className="text-muted">
                    You haven't posted any items yet.
                  </p>
                )}
              </Row>

              <Row className="my-5">
              <h3 className="mb-4">Your Favourites ({user?.favouriteItems!.length})</h3>
                {user?.favouriteItems ? (
                  user!.favouriteItems!.map((item, i) => (
                    <Col xs="12" md="3" className="mt-1 mb-5" key={i + 1}>
                      <ItemElement item={item} />
                    </Col>
                  ))
                ) : (
                  <p className="text-muted">There are no elements here.</p>
                )}
              </Row>
            </Col>
          </Row>
        </Container>
      ) : (
        <Container className="text-center mt-5">
          <Alert variant="info" className="my-3 p-3 text-center w-50 mx-auto">
            Session expired. Please log in again.
          </Alert>
          <LoginForm />
        </Container>
      )}
    </>
  )
}

export default AccountContainer
