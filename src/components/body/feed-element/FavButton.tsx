import React, { useState } from "react"
import { Col } from "react-bootstrap"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import { useUser } from "../../../utils/hooks"

interface FavButtonProps {
  itemId: number
}

const FavButton: React.FC<FavButtonProps> = ({ itemId }) => {
  const { isFavourite, addFavourite, removeFavourite } = useUser()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fav = isFavourite(itemId)

  const toggleFavourite = async () => {
    if (isSubmitting) return
    setIsSubmitting(true)

    if (fav) {
      await removeFavourite(itemId)
    } else {
      await addFavourite(itemId)
    }

    setIsSubmitting(false)
  }

  return (
    <Col xs="1" className="favouritesButton me-0" id="favButton">
      <span
        onClick={toggleFavourite}
        style={{
          cursor: isSubmitting ? "wait" : "pointer",
          fontSize: "1.5rem",
        }}
      >
        {fav ? <FaHeart style={{ color: "red" }} /> : <FaRegHeart />}
      </span>
    </Col>
  )
}

export default FavButton