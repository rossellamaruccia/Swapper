import "../../customs.css"

function LogoButton() {
  function handleClick() { 
    localStorage.setItem("category", "")
  }
  return (
    <>
      <a href="/" onClick={handleClick}>
        <img
          src="assets/swapper-logo.png"
          className="navbar.brand align-top logo-small"
        />
      </a>
    </>
  )
}

export default LogoButton
