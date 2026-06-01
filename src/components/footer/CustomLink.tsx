import { Row } from "react-bootstrap"

type Props = {
  title: { title: string }
}

function CustomLink({ title }: Props) {
  return (
    <>
      <Row>
        <a href="/info">{title.title}</a>
      </Row>
    </>
  )
}

export default CustomLink
