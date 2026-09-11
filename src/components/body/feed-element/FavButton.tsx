import { useEffect, useState } from "react"
import { addToFav, removeFav } from "../../../api/itemApi"
import { getUserDetails } from "../../../api/userApi"
import { Col } from "react-bootstrap"
import { FaHeart, FaRegHeart } from "react-icons/fa" // Importa sia l'icona piena che vuota
import type { ItemGetResponse } from "../../../types/types"

interface Props {
    token: string
    itemId: number
    activeUserId: string
}

const FavButton = ({ token, itemId, activeUserId } : Props) => {
  const [isFavourite, setIsFavourite] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkIsFavourite = async () => {
      try {
        setIsLoading(true)
        const user = await getUserDetails(token, activeUserId)
        const favList: ItemGetResponse[] = user.favouriteItems || []
        const found = favList.some((item) => item.id === itemId)
        setIsFavourite(found)
      } catch (error) {
        console.error("Errore durante il recupero dei preferiti:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (token && itemId) {
      checkIsFavourite()
    }
  }, [token, itemId])

  const toggleFavourite = async () => {
    if (isLoading) return
    setIsLoading(true)

    try {
      if (isFavourite) {
        await removeFav(token, itemId)
      } else {
        await addToFav(token, itemId)
        setIsFavourite(true)
      }
    } catch (error) {
      console.error("Errore durante la gestione dei preferiti:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Col xs="1" className="favouritesButton me-0" id="favButton">
      <span
        onClick={toggleFavourite}
        style={{ cursor: isLoading ? "wait" : "pointer", fontSize: "1.5rem" }}
      >
        {isFavourite ? <FaHeart style={{ color: "red" }} /> : <FaRegHeart />}
      </span>
    </Col>
  )
}

export default FavButton
