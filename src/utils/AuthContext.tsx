import React, { createContext, useContext, useState } from "react"
import { getAuthStatus } from "./authTools"

interface AuthUser {
  id: string | null
}

interface AuthContextType {
  activeUser: AuthUser | null
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [activeUser, setActiveUser] = useState<AuthUser | null>(() => {
    const token = localStorage.getItem("accessToken")
    const decoded = getAuthStatus(token)
    return decoded ? { id: decoded.userId } : { id: null }
  })

  const login = (token: string) => {
    localStorage.setItem("accessToken", token)
    const decoded = getAuthStatus(token)
    if (decoded) setActiveUser({ id: decoded.userId })
  }

  const logout = () => {
    localStorage.setItem("accessToken", "")
    setActiveUser(null)
  }

  return (
    <AuthContext.Provider value={{ activeUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}
