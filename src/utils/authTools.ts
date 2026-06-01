import { jwtDecode } from "jwt-decode"

interface MyTokenPayload {
  exp: number
  sub: string
}

interface AuthStatus {
  isValid: boolean
  userId: string | null
}

export const getAuthStatus = (token: string | null): AuthStatus => {
  if (!token) {
    return { isValid: false, userId: "" }
  }

  try {
    const decoded = jwtDecode<MyTokenPayload>(token)
    const currentTime = Date.now() / 1000

    const isValid = decoded.exp > currentTime

    return {
      isValid,
      userId: isValid ? decoded.sub : null,
    }

  } catch (error) {
    console.error("Failed to decode token:", error)
    return { isValid: false, userId: null }
  }
}

