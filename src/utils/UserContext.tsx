import { createContext } from "react"

export interface UserContextType {
  favouriteIds: Set<number>
  isLoading: boolean
  addFavourite: (itemId: number) => Promise<void>
  removeFavourite: (itemId: number) => Promise<void>
  isFavourite: (itemId: number) => boolean
}

export const UserContext = createContext<UserContextType | undefined>(undefined)
