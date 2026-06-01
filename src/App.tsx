import "bootstrap/dist/css/bootstrap.min.css"
import "./customs.css"
import React from "react"
import { Container } from "react-bootstrap"
import HeaderBar from "./components/header/HeaderBar"
import FooterBar from "./components/footer/FooterBar"
import FeedContainer from "./components/body/FeedContainer"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import HeroBanner from "./components/hero/HeroBanner"
import LoginForm from "./components/signup-page/LoginForm"
import SubscribeForm from "./components/signup-page/SubscribeForm"
import AccountContainer from "./components/account-page/AccountContainer"
import AddForm from "./components/add-page/AddForm"
import {AuthProvider, useAuth} from "./utils/AuthContext"
import EditForm from "./components/account-page/EditForm"
import ItemDetail from "./components/body/feed-element/ItemDetail"
import InfoPage from "./components/info-page/InfoPage"

interface PrivateRouteProps {
  children: React.ReactNode
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { activeUser } = useAuth()
  return activeUser?.id ? children : <Navigate to="/login" />
}

function AppContent() {
  const { activeUser } = useAuth()
  const userId = activeUser?.id

  return (
    <Container>
      <HeaderBar />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={!userId ? <HeroBanner /> : <FeedContainer />}
          />
          <Route path="/detail" element={<ItemDetail />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SubscribeForm />} />

          <Route
            path="/account"
            element={
              <PrivateRoute>
                <AccountContainer />
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
    </Container>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
