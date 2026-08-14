import "../../customs.css"
import type { Category } from "../../types/types"

type Props = {
  title: { title: Category }
}

function CategoryButton({ title }: Props) {

  const formatCategory = (str: string) =>
    str
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase())

 function handleClick() {
localStorage.setItem("category", title.title)
  }
  return (
    <>
      <a href="/" className="me-3 mb-3" onClick={handleClick}>{formatCategory(title.title)}</a>
    </>
  )
}

export default CategoryButton
