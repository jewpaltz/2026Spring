/*  B"H
 */

import type { User } from "../types"
import data from "../data/users.json"
import { PagingRequest } from "../types/dataEnvelopes"

export function getAll(params: PagingRequest) {
    let users = data.users as User[]
    const count = users.length

    if (params?.search) {
        const search = params.search.toLowerCase()
        users = users.filter((user) =>
            `${user.firstName} ${user.lastName}`.toLowerCase().includes(search),
        )
    }
    if (params?.sortBy) {
        const { sortBy, descending } = params
        users = users.sort((a, b) => {
            if (a[sortBy as keyof User] < b[sortBy as keyof User])
                return descending ? 1 : -1
            if (a[sortBy as keyof User] > b[sortBy as keyof User])
                return descending ? -1 : 1
            return 0
        })
    }
    const page = params?.page || 1
    const pageSize = params?.pageSize || 10
    const start = (page - 1) * pageSize
    users = users.slice(start, start + pageSize)

    return { users, count }
}

export function get(id: number): User {
    const user = data.users.find((user) => user.id === id)
    if (!user) {
        const error = { status: 404, message: "User not found" }
        throw error
    }
    return user as User
}

export function create(user: User) {
    const newUser = {
        ...user,
        id: data.users.length + 1,
    }
    data.users.push(newUser as any)
    return newUser
}

export function update(id: number, user: Partial<User>) {
    const index = data.users.findIndex((u) => u.id === id)
    if (index === -1) {
        const error = { status: 404, message: "User not found" }
        throw error
    }
    const updatedUser = {
        ...data.users[index],
        ...user,
    }
    data.users[index] = updatedUser as any
    return updatedUser
}

export function remove(id: number) {
    const index = data.users.findIndex((u) => u.id === id)
    if (index === -1) {
        const error = { status: 404, message: "User not found" }
        throw error
    }
    const removedUser = data.users.splice(index, 1)[0]
    return removedUser as User
}
