import React from "react"
import { Card, Stack } from "react-bootstrap"
import type { ItemGetResponse } from "../../../types/types"
import { useNavigate } from "react-router-dom"

interface ItemCardProps {
  item: ItemGetResponse
}

const ItemCard: React.FC<ItemCardProps> = ({item}) => {
 
  const isBorrow = item.type === "BORROW"
  const badgeBg = isBorrow ? "info" : "success"
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/detail?itemID=${item.id}`)
  } 

  return (
    <Card className="h-100 shadow-sm itemCard" border={badgeBg} onClick={handleClick}>
      <Card.Img
        variant="top"
        src={
          item.pics_urls && item.pics_urls.length > 0
            ? item.pics_urls[0]
            : "src/assets/pexels-wordsurfer-909256.jpg"
        }
      />

      <Card.Body className="d-flex flex-column" >
        <Stack
          direction="horizontal"
          className="justify-content-between align-items-start mb-2"
        >
          <Card.Title
            className="mb-0 text-truncate"
          >
            {item.title}
          </Card.Title>
          <Card.Text className="text-muted small flex-grow-1 text-end">
          <a>{item.type}</a>
          <br/>
          <a>{item.category}</a>
            <br />
            </Card.Text>
        </Stack>

        <Card.Text>
          {item.description.length > 100
            ? `${item.description.substring(0, 95)}...`
            : item.description}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ItemCard
