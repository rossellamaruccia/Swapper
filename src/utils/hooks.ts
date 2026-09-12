import { useContext } from "react"
import { UserContext } from "./UserContext"
import { AuthContext } from "./AuthContext"
import type { UserContextType } from "./UserContext"

export const useUser = (): UserContextType => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser deve essere usato all'interno di un UserProvider")
  }
  return context
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}