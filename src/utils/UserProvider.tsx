import { useState, useEffect } from "react"
import type { ReactNode } from "react"
import { getUserDetails } from "../api/userApi"
import { addToFav, removeFav } from "../api/itemApi"
import { UserContext } from "./UserContext"


interface UserProviderProps {
  children: ReactNode
  token: string | null
}

export const UserProvider: React.FC<UserProviderProps> = ({
  children,
  token,
}) => {
  const [favouriteIds, setFavouriteIds] = useState<Set<number>>(new Set())
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchUserFavourites = async () => {
      if (!token) {
        setFavouriteIds(new Set())
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        const user = await getUserDetails(token, null)

        if (user.favouriteItems) {
          const ids = new Set<number>(
            user.favouriteItems.map((item: { id: number }) => item.id),
          )
          setFavouriteIds(ids)
        }
      } catch (error) {
        console.error("Errore durante il caricamento dei preferiti:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserFavourites()
  }, [token])

  const addFavourite = async (itemId: number) => {
    if (!token) return
    try {
      await addToFav(token, itemId)
      setFavouriteIds((prev) => new Set(prev).add(itemId))
    } catch (error) {
      console.error("Errore aggiunta preferito:", error)
    }
  }

  const removeFavourite = async (itemId: number) => {
    if (!token) return
    try {
      await removeFav(token, itemId)
      setFavouriteIds((prev) => {
        const updated = new Set(prev)
        updated.delete(itemId)
        return updated
      })
    } catch (error) {
      console.error("Errore rimozione preferito:", error)
    }
  }

  // HELPER
  const isFavourite = (itemId: number): boolean => {
    return favouriteIds.has(itemId)
  }

  return (
    <UserContext.Provider
      value={{
        favouriteIds,
        isLoading,
        addFavourite,
        removeFavourite,
        isFavourite,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
