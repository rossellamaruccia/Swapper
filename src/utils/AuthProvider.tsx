import React, { useState } from "react"
import { getAuthStatus } from "./authTools"
import { AuthContext } from "./AuthContext"
import type { AuthUser } from "./AuthContext"
import { UserProvider } from "./UserProvider"

export function AuthProvider({ children }: { children: React.ReactNode }) {
 const [token, setToken] = useState<string | null>(() => {
   return localStorage.getItem("accessToken")
 })
  
  const [activeUser, setActiveUser] = useState<AuthUser | null>(() => {
    const decoded = getAuthStatus(token)
    return decoded ? { id: decoded.userId } : { id: null }
  })

  const login = async (newToken: string) => {
    localStorage.setItem("accessToken", newToken)
    setToken(newToken)
    const decoded = getAuthStatus(token)
    if (decoded) setActiveUser({ id: decoded.userId })
  }

  const logout = async () => {
    localStorage.setItem("accessToken", "")
    localStorage.setItem("category", "") 
    setToken(null)
    setActiveUser(null)
  }

  return (
    <AuthContext.Provider value={{ activeUser, token, login, logout}}>
      <UserProvider token={token}>
        {children}
      </UserProvider>
    </AuthContext.Provider>
  )
}
