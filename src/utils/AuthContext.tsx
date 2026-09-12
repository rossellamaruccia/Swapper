import { createContext } from "react"

export interface AuthUser {
  id: string | null
}

interface AuthContextType {
  activeUser: AuthUser | null
  token: string | null
  login: (newToken: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)