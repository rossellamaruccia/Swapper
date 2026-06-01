export interface Geolocation {
  lng: number
  lat: number
}

export interface GeoSearchRequest {
  lng: number
  lat: number
  radiusInMeters: number
}

export interface UserLogin {
  email: string
  password: string
}

export interface LoginResponse{
  accessToken: string
}

export interface User {
  name?: string
  surname?: string
  email: string
  city?: string
  profilePic?: string | null
  items?: Item[]
  location?: Geolocation
}

export interface UserGetResponse extends User {
  id: string
}

export interface UserSignUpRequest extends User {
  password: string
}

export const ItemCategory = ["WORK_TOOLS", "HOUSE_MAINTENANCE", "DIY", "GARDENING", "MUSIC_STUFF", "PARTY_MATERIAL", "COOKING_TOOLS", "CRAFTING", "WOODWORKING", "PAINTING"]

export type Category = typeof ItemCategory[number]

export const ItemType = ["BORROW", "DONATE"] 

export type ItemType = typeof ItemType[number]

export interface Item {
  title: string
  description: string
  pics?: File[]
  user_id?: string
  type: ItemType
  category: Category
}

export interface ItemGetResponse extends Item {
  id: number
  pics_urls?: string[]
  lng: number
  lat: number
}
