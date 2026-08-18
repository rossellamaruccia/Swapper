import type { UserGetResponse } from "../../types/types"
import { Card, Image, Stack } from "react-bootstrap"
import LocationMap from "./LocationMap"
import { useNavigate } from "react-router-dom"

interface ElementProps {
  user: UserGetResponse | null
}

const UserDetails = ({ user }: ElementProps) => {
  const navigate = useNavigate()
  return (
    <>
      {user ? (
        <Card
          onClick={() => {
            navigate(`/account?user=${user.id}`)
          }}
          className="mb-2"
        >
          <Card.Body>
            <Stack direction="horizontal" className="mb-2">
              <h6>
                {user.name}, {user.city}
              </h6>
              <Image src={user.profilePic!} className="profile-picture mx-1" />
            </Stack>
            <LocationMap lng={user.location!.lng} lat={user.location!.lat} />
          </Card.Body>
        </Card>
      ) : (
        <></>
      )}
    </>
  )
}

export default UserDetails
