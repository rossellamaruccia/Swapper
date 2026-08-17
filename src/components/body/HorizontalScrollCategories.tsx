import { ItemCategory } from "../../types/types"
import CategoryButton from "../body/CategoryButton"
import { Row, Col } from "react-bootstrap"
import { useState, useRef } from "react"

interface Props {
  category: string
  setCategory: (category: string) => void
}

const HorizontalScrollCategories = ({category, setCategory} : Props) => {
  const [isDown, setIsDown] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDown(true)
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0))
    setScrollLeft(containerRef.current?.scrollLeft || 0)
    if (containerRef.current) {
      containerRef.current.style.cursor = "grabbing"
    }
  }

  const handleMouseLeave = () => {
    setIsDown(false)
    if (containerRef.current) {
      containerRef.current.style.cursor = "grab"
    }
  }

  const handleMouseUp = () => {
    setIsDown(false)
    if (containerRef.current) {
      containerRef.current.style.cursor = "grab"
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDown) return
    e.preventDefault()
    const x = e.pageX - (containerRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 2 // Adjust multiplier for faster/slower scrolling
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walk
    }
  }

  return (
    <Row
      className="categories-div"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <Col className="col col-12" md={{ order: 3 }}>
        {Object.values(ItemCategory).map((value) => (
          <CategoryButton title={{ title: value }} key={value} category={category} setCategory={setCategory} />
        ))}
      </Col>
    </Row>
  )
}

export default HorizontalScrollCategories
