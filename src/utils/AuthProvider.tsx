import React, { useState } from "react"
import { getAuthStatus } from "./authTools"
import { AuthContext } from "./AuthContext"
import type { AuthUser } from "./AuthContext"
import { UserProvider } from "./UserProvider"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("accessToken")
  
  const [activeUser, setActiveUser] = useState<AuthUser | null>(() => {
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
      <UserProvider token={token}>
        {children}
      </UserProvider>
    </AuthContext.Provider>
  )
}
