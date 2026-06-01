import { Button } from "react-bootstrap"
import { VscSettingsGear } from "react-icons/vsc"

function SettingsButton() {
    return (
      <>
        <Button className="btn settingsButton" href="/settings">
          <VscSettingsGear />
          <span className="label">Settings</span>
        </Button>
      </>
    )
    
}

export default SettingsButton