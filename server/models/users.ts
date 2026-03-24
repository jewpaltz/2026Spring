/*  B"H
 */

import type { User } from "../types"
import data from "../data/users.json"

export function getAll(): User[] {
    return data.users as User[]
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
