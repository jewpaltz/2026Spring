/*  B"H
 */

import type { CartItem } from "../types"
// Models can use other models, but should not use controllers or routes.
import { get as getProduct } from "./products"
import { PagingRequest } from "../types/dataEnvelopes"

type ItemType = CartItem
const data = {
    items: {} as Record<number, CartItem[]>,
}
export function getAll(userId: number, params: PagingRequest) {
    let list = data.items[userId] || ([] as ItemType[])
    const count = list.length

    if (params?.search) {
        const search = params.search.toLowerCase()
        list = list.filter((item) =>
            `${item.product.title} ${item.product.description}`
                .toLowerCase()
                .includes(search),
        )
    }
    if (params?.sortBy) {
        list = list.sortBy(params.sortBy as keyof ItemType, params.descending)
    }
    const page = params?.page || 1
    const pageSize = params?.pageSize || 10
    const start = (page - 1) * pageSize
    list = list.slice(start, start + pageSize)

    return { list, count }
}

export function update(
    userId: number,
    productId: number,
    quantity: number,
): ItemType {
    // If user doesn't have a cart, create one
    data.items[userId] = data.items[userId] || []

    // If item isn't in cart, add it.
    const index = data.items[userId].findIndex(
        (u) => u.product.id === productId,
    )
    if (index === -1) {
        const newItem: ItemType = {
            product: getProduct(productId),
            quantity,
        }
        data.items[userId].push(newItem)
        return newItem
    }

    // Otherwise, update quantity
    const item = data.items[userId][index]
    item.quantity += quantity

    // If quantity is 0 or less, remove item from cart
    if (item.quantity <= 0) {
        data.items[userId].splice(index, 1)
    }
    return item
}
