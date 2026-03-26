/*  B"H
 */

import type { User } from "../types"
import data from "../data/users.json"

export function getAll(
    search?: string,
    sortBy?: string,
    descending?: boolean,
    page?: number,
    pageSize?: number,
) {
    let users = data.users as User[]
    const total = users.length

    if (search) {
        const searchLower = search.toLowerCase()
        users = users.filter(
            (x) =>
                x.firstName.toLowerCase().includes(searchLower) ||
                x.lastName.toLowerCase().includes(searchLower) ||
                x.email.toLowerCase().includes(searchLower),
        )
    }
    if (sortBy) {
        users = users.sortBy(sortBy, descending)
    }
    if (page !== undefined && pageSize !== undefined) {
        const start = (page - 1) * pageSize
        const end = start + pageSize
        users = users.slice(start, end)
    }

    return { users, total }
}

export function get(id: number): User {
    const user = data.users.find((user) => user.id === id)
    if (!user) {
        throw new Error("User not found")
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
        throw new Error("User not found")
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
        throw new Error("User not found")
    }
    const removedUser = data.users.splice(index, 1)[0]
    return removedUser as User
}

declare global {
    interface Array<T> {
        sortBy(key: string, descending?: boolean): T[]
    }
}

Array.prototype.sortBy = function (key: string, descending: boolean = false) {
    return this.sort((a, b) => {
        if (a[key] < b[key]) return descending ? 1 : -1
        if (a[key] > b[key]) return descending ? -1 : 1
        return 0
    })
}
