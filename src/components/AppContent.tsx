import { Container } from "react-bootstrap"
import HeaderBar from "./header/HeaderBar"
import FooterBar from "./footer/FooterBar"
import FeedContainer from "./body/FeedContainer"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import HeroBanner from "./hero/HeroBanner"
import LoginForm from "./signup-page/LoginForm"
import SubscribeForm from "./signup-page/SubscribeForm"
import AccountContainer from "./account-page/AccountContainer"
import AddForm from "./add-page/AddForm"
import { useAuth } from "../utils/AuthContext"
import EditForm from "./account-page/EditForm"
import ItemDetail from "./body/feed-element/ItemDetail"
import InfoPage from "./info-page/InfoPage"
import type { ItemGetResponse } from "../types/types"
import { getAllItems, getItemsPerCategory } from "../api/itemApi"
import { useState, useEffect } from "react"
import LoadingSpinner from "./body/LoadingSpinner"

interface PrivateRouteProps {
  children: React.ReactNode
}

const authToken = localStorage.getItem("accessToken")

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  return authToken ? children : <Navigate to="/login" />
}

function AppContent() {
  const [items, setItems] = useState<ItemGetResponse[]>([])
  const [radius, setRadius] = useState(20)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [category, setCategory] = useState<string>("")

  useEffect(() => {
    const savedCategory = localStorage.getItem("category")
    if (savedCategory) {
      setCategory(savedCategory)
    }
  }, [])

  const fetchItems = async () => {
    try {
      let data: ItemGetResponse[] = []
      if (category != "") {
        data = await getItemsPerCategory(authToken, category, radius)
      } else {
        data = await getAllItems(authToken, radius)
      }
      setItems(data)
    } catch (err) {
      console.error(err)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [authToken, category, radius])

  const { activeUser } = useAuth()
  const userId = activeUser?.id

  return (
    <Container>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <HeaderBar />
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  !items ? (
                    <HeroBanner />
                  ) : (
                    <FeedContainer
                      items={items}
                      loading={loading}
                      error={error}
                                category={category}
                                radius={radius}
                                setCategory={setCategory}
                                setRadius={setRadius}
                    />
                  )
                }
              />
                <Route path="/detail" element={<ItemDetail activeUserId={userId!} />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SubscribeForm />} />

              <Route
                path="/account"
                element={
                  <PrivateRoute>
                    <AccountContainer
                      authUser={activeUser!.id!}
                      authToken={authToken!}
                      error={error}
                      setError={setError}
                    />
                  </PrivateRoute>
                }
              />
              <Route
                path="/account/edit"
                element={
                  <PrivateRoute>
                    <EditForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="/add"
                element={
                  <PrivateRoute>
                    <AddForm />
                  </PrivateRoute>
                }
              />
              <Route path="/info" element={<InfoPage />} />

              {/* <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          /> */}
            </Routes>
          </BrowserRouter>
          <FooterBar />
        </>
      )}
    </Container>
  )
}

export default AppContent