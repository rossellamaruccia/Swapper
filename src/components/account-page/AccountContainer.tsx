import { useState, useEffect } from "react"

import { useNavigate } from "react-router-dom"
import { Container, Row, Col, Button, Alert } from "react-bootstrap"
import UserDetails from "./UserDetails"
import { getUserInfo, getUserDetails } from "../../api/userApi"
import { getAuthStatus } from "../../utils/authTools"
import { getItemsPerUser } from "../../api/itemApi"
import type { ItemGetResponse, Item, UserGetResponse } from "../../types/types"
import ItemElement from "../body/feed-element/ItemElement"
import LoginForm from "../signup-page/LoginForm"
import { FaEdit } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import { FaRegMessage } from "react-icons/fa6"
import { FiLogOut } from "react-icons/fi"
import EditModal from "../body/feed-element/EditModal"
import { editItem } from "../../api/itemApi"

interface AccountProps {
  authUser: string | null | undefined
  authToken: string | null
}

const AccountContainer = ({ authUser, authToken }: AccountProps) => {
  const [user, setUser] = useState<UserGetResponse | null>(null)
  const [items, setItems] = useState<ItemGetResponse[] | undefined>([])
  const [error, setError] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<ItemGetResponse | null>(null)
  const navigate = useNavigate()

  const fetchUserDetails = async () => {
    try {
      const [userData, itemData] = await Promise.all([
        getUserDetails(authToken, authUser!),
        getItemsPerUser(authToken),
      ])
      setUser(userData)
      setItems(itemData)
    } catch (err) {
      console.error("Fetch failed:", err)
      setError(true)
    }
  }

  const fetchData = async () => {
    if (!authToken || !getAuthStatus(authToken)) {
      setError(true)
      return
    }

    try {
      const [userData, itemData] = await Promise.all([
        getUserInfo(authToken),
        getItemsPerUser(authToken),
      ])

      setUser(userData)
      setItems(itemData)
    } catch (err) {
      console.error("Fetch failed:", err)
      setError(true)
    }
  }

  const logout = async () => {
    localStorage.setItem("accessToken", "")
  }

  useEffect(() => {
    if (authUser) {
      fetchUserDetails()
    } else fetchData()
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
              <h3 className="mb-4">Your Items ({items!.length})</h3>
              <Row>
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
