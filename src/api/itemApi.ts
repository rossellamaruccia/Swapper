const API_BASE_URL: string = import.meta.env.API_BASE_URL
import type { Item, ItemGetResponse } from "../types/types"

export async function addNewItem(token: string | null, body: Item) {
  if (!token) {
    console.error("No token provided")
  }

  const formData = new FormData()
  formData.append("title", body.title)
  formData.append("description", body.description)
  formData.append("itemType", body.type)
  formData.append("category", body.category)
  if (body.pics)
    body.pics.forEach((file) => {
      formData.append("files", file)
    })

  const response = await fetch(`${API_BASE_URL}/items/add`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      //login failed - redirect on loginpage
    }))
    throw new Error(errorData.message || "Operation failed")
  } else return
}

export async function getAllItems(
  token: string | null, radius: number | null
): Promise<ItemGetResponse[]> {
  if (!token) {
    console.error("No token provided")
  }
  //questa fetch deve restituire tutti gli Items tranne quelli dell'user che fa la richiesta filtrati per distanza
  const response = await fetch(`${API_BASE_URL}/items/feed?radius=${radius}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      //login failed - redirect on loginpage
    }))
    throw new Error(errorData.message || "Operation failed")
  }
  const itemsData: ItemGetResponse[] = await response.json()
  return itemsData
}

export async function getItemsPerUser(
  token: string | null,
): Promise<ItemGetResponse[]> {
  const response = await fetch(`${API_BASE_URL}/items`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      //login failed - redirect on loginpage
    }))
    throw new Error(errorData.message || "Operation failed")
  }
  const itemsData: ItemGetResponse[] = await response.json()
  return itemsData
}

export async function getItemDetails(token: string | null, itemID: number): Promise<ItemGetResponse>{
  const response = await fetch(`${API_BASE_URL}/items/details?id=${itemID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      //login failed - redirect on loginpage
    }))
    throw new Error(errorData.message || "Operation failed")
  }
  const item: ItemGetResponse = await response.json()
  return item
}

export async function getItemsPerCategory(
  token: string | null,
  category: string | null,
  radius: number | null
): Promise<ItemGetResponse[]> {
  const response = await fetch(
    `${API_BASE_URL}/items/feed?radius=${radius}&category=${category}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      //login failed - redirect on loginpage
    }))
    throw new Error(errorData.message || "Operation failed")
  }
  const itemsData: ItemGetResponse[] = await response.json()
  return itemsData
}

export async function editItem(
  token: string | null,
  item: Item,
  itemID: number,
) {
  if (!token) {
    console.error("No token provided")
  }

  const formData = new FormData()
  formData.append("title", item.title)
  formData.append("description", item.description)
  formData.append("itemType", item.type)
  formData.append("category", item.category)
  if (item.pics)
    item.pics.forEach((file) => {
      formData.append("files", file)
    })

  const response = await fetch(`${API_BASE_URL}/items/edit?id=${itemID}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      //login failed - redirect on loginpage
    }))
    throw new Error(errorData.message || "Operation failed")
  }
  const itemsData: ItemGetResponse[] = await response.json()
  return itemsData
}
