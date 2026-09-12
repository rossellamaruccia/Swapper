import "../../customs.css"
import type { MouseEvent } from "react"
import type { Category } from "../../types/types"

interface Props {
  title: { title: Category }
  category: string
  setCategory: (category: string) => void
}

function CategoryButton({ title, category, setCategory }: Props) {

  const formatCategory = (str: string) =>
    str
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase())

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    if (category === title.title) {
      localStorage.setItem("category", "")
      setCategory("")
    } else {
      localStorage.setItem("category", title.title)
      setCategory(title.title)
    }
  }

  return (
    <>
      <a
        href="/"
        className={`${category === title.title ? "me-3 mb-3 selected" : "me-3 mb-3 "}`}
        id={title.title}
        onClick={handleClick}
      >
        {formatCategory(title.title)}
      </a>
    </>
  )
}

export default CategoryButton
