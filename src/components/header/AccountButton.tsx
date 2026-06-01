import { Button } from "react-bootstrap"
import { VscAccount } from "react-icons/vsc"

function AccountButton() {
  return (
    <>
      <Button className="settingsButton" href="/account">
        <VscAccount />
        <span className="label">Your account</span>
      </Button>
    </>
  )
}

export default AccountButton
