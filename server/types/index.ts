/* B"H
 */

export type { DataEnvelope, DataListEnvelope } from "./dataEnvelopes"

export type ProductReview = {
    rating: number
    comment: string
    date: string
    reviewerName: string
    reviewerEmail: string
}

export type Product = {
    id: number
    title: string
    description: string
    category: string
    price: number
    tags: string[]
    brand?: string
    reviews: ProductReview[]
    images: string[]
    thumbnail: string
}
export const productKeys: (keyof Product)[] = [
    "title",
    "description",
    "category",
    "price",
    "tags",
    "brand",
    "images",
    "thumbnail",
]

export type CartItem = {
    product: Product
    quantity: number
}

export type UserRole = "admin" | "moderator" | "user"

export type UserAddress = {
    address: string
    city: string
    state: string
    stateCode: string
    postalCode: string
    country: string
}
export const userAddressKeys: (keyof UserAddress)[] = [
    "address",
    "city",
    "state",
    "stateCode",
    "postalCode",
    "country",
]

export type User = {
    id: number
    firstName: string
    lastName: string
    gender: string
    email: string
    phone: string
    birthDate: string
    image: string
    address: UserAddress
    role: UserRole
}
export const userKeys: (keyof User)[] = [
    "firstName",
    "lastName",
    "gender",
    "email",
    "phone",
    "birthDate",
    "image",
    "role",
]
