import { Image } from "react-bootstrap"
import "../../customs.css"

function LogoButton() {
  function handleClick() { 
    localStorage.setItem("category", "")
  }
  return (
    <>
        <a href="/" onClick={handleClick}>
          <Image
            src="../../public/assets/swapper-logo.png"
            fluid
            className="navbar.brand align-top logo-small"
          />
        </a>
    </>
  )
}

export default LogoButton
