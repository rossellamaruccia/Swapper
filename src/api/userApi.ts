const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

import type {
  UserLogin,
  User,
  UserSignUpRequest,
  Geolocation,
  LoginResponse,
  UserGetResponse,
} from "../types/types"

export async function newUser(data: UserSignUpRequest) {
  try {
    const response = await fetch(API_BASE_URL + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.ok
  } catch (error) {
    console.error("Error in POST request:", error)
    throw error
  }
}

export async function loggingUser(payload: UserLogin): Promise<boolean> {
  try {
    const response = await fetch(API_BASE_URL + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    })

    const text = await response.text()

    if (response.ok) {
      const data: LoginResponse = JSON.parse(text)
      localStorage.setItem("accessToken", data.accessToken)
      window.location.href = "/account"
      return true
    } else {
      try {
        const errorData = JSON.parse(text)
        console.log(
          "Login failed:",
          errorData.message || errorData.error || text,
        )
        throw new Error(errorData.message || errorData.error || "Login failed")
      } catch {
        console.log("Login failed:", text)
        throw new Error(text || "Login failed")
      }
    }
  } catch (error) {
    console.error("Error in POST request:", error)
    throw error
    return false
  }
}

export async function getUserInfo(
  token: string | null,
): Promise<UserGetResponse> {
  if (!token) {
    console.error("No token provided")
  }

  try {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    if (response.ok) {
      const data: UserGetResponse = await response.json()
      return data
    } else throw new Error("Login failed")
  } catch (error) {
    console.error("Network or parsing error:", error)
    throw error
  }
}

export async function getUserDetails(
  token: string | null,
  userID: string | null,
): Promise<UserGetResponse> {
  if (!token) {
    console.error("No token provided")
  }

  try {
    const response = await fetch(`${API_BASE_URL}/users/details?id=${userID}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    if (response.ok) {
      const data: UserGetResponse = await response.json()
      return data
    } else throw new Error("Login failed")
  } catch (error) {
    console.error("Network or parsing error:", error)
    throw error
  }
}

export async function updateProfilePic(
  token: string | null,
  pic: File,
): Promise<string> {
  if (!token) {
    console.error("No token provided")
  }
  const formData = new FormData()
  formData.append("profilePic", pic)
  try {
    const response = await fetch(`${API_BASE_URL}/users/me/edit/profile_pic`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
    if (response.ok) {
      const picURL: string = await response.text()
      return picURL
    } else throw new Error("Login failed")
  } catch (error) {
    console.error("Network or parsing error:", error)
    throw error
  }
}

export async function modifyUser(token: string | null, payload: User) {
  if (!token) {
    console.error("No token provided")
    throw new Error("Please Log in again")
  }

  const data = {
    name: payload.name,
    surname: payload.surname,
    email: payload.email,
    city: payload.city,
  }

  try {
    const response = await fetch(`${API_BASE_URL}/users/me/edit`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.ok
  } catch (error) {
    console.error("Error in POST request:", error)
    throw error
  }
}

export async function updateUserLocation(
  token: string | null,
  location: Geolocation,
) {
  if (!token) {
    console.error("No token provided")
    throw new Error("Please Log in again")
  }

  const geolocation = {
    lng: location.lng,
    lat: location.lat,
  }

  try {
    const response = await fetch(`${API_BASE_URL}/users/me/edit/location`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(geolocation),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.ok
  } catch (error) {
    console.error("Error in POST request:", error)
    throw error
  }
}
