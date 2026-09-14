import { createContext } from "react"
import type { UserGetResponse } from "../types/types"

export interface UserContextType {
  userDetails: UserGetResponse | undefined
  favouriteIds: Set<number>
  isLoading: boolean
  addFavourite: (itemId: number) => Promise<void>
  removeFavourite: (itemId: number) => Promise<void>
  isFavourite: (itemId: number) => boolean
}

export const UserContext = createContext<UserContextType | undefined>(undefined)
