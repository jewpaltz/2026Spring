/*  B"H
 */

import type { User } from "../types"
import data1 from "../data/users.json"
import { PagingRequest } from "../types/dataEnvelopes"

type ItemType = User
const data = {
    ...data1,
    items: data1.users,
}

export function getAll(params: PagingRequest) {
    let list = data.items as ItemType[]
    const count = list.length

    if (params?.search) {
        const search = params.search.toLowerCase()
        list = list.filter((item) =>
            `${item.firstName} ${item.lastName}`.toLowerCase().includes(search),
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

export function get(id: number): ItemType {
    const item = data.items.find((item) => item.id === id)
    if (!item) {
        const error = { status: 404, message: "ItemType not found" }
        throw error
    }
    return item as ItemType
}

export function create(user: ItemType) {
    const newItemType = {
        ...user,
        id: data.items.length + 1,
    }
    data.items.push(newItemType as any)
    return newItemType
}

export function update(id: number, user: Partial<ItemType>) {
    const index = data.items.findIndex((u) => u.id === id)
    if (index === -1) {
        const error = { status: 404, message: "ItemType not found" }
        throw error
    }
    const updatedItemType = {
        ...data.items[index],
        ...user,
    }
    data.items[index] = updatedItemType as any
    return updatedItemType
}

export function remove(id: number) {
    const index = data.items.findIndex((u) => u.id === id)
    if (index === -1) {
        const error = { status: 404, message: "ItemType not found" }
        throw error
    }
    const removedItemType = data.items.splice(index, 1)[0]
    return removedItemType as ItemType
}
