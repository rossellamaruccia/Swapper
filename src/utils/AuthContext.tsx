import { createContext } from "react"

export interface AuthUser {
  id: string | null
}

interface AuthContextType {
  activeUser: AuthUser | null
  login: (token: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)