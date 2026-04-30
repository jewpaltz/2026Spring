/*  B"H
 */
import { sign } from "jsonwebtoken"
import { userAddressKeys, userKeys, type User } from "../types"
import data1 from "../data/users.json"
import { PagingRequest } from "../types/dataEnvelopes"
import { connect, filterKeys, toCamelCase, toSnakeCase } from "./supabase"

const TABLE_NAME = "users"

type ItemType = User
const data = {
    ...data1,
    items: data1.users,
}

export async function getAll(params: PagingRequest) {
    const db = connect()
    let query = db.from(TABLE_NAME).select("*", { count: "estimated" })

    if (params?.search) {
        const search = params.search.toLowerCase()
        query = query.or(
            `first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%`,
        )
    }
    if (params?.sortBy) {
        query = query.order(params.sortBy, { ascending: !params.descending })
    }
    const page = Number(params?.page ?? 1)
    const pageSize = Number(params?.pageSize ?? 10)
    const start = (page - 1) * pageSize
    query = query.range(start, start + pageSize - 1)

    const result = await query
    if (result.error) {
        throw result.error
    }
    const list = result.data.map(toCamelCase) as ItemType[]
    const count = result.count || 0
    return { list, count }
}

export async function get(id: number): Promise<ItemType> {
    const db = connect()
    const result = await db.from(TABLE_NAME).select("*").eq("id", id).single()
    if (result.error) {
        const error = { status: 404, message: "ItemType not found" }
        throw error
    }
    return toCamelCase(result.data) as ItemType
}

export async function login(
    access_token: string,
    provider: string = "google",
): Promise<{ token: string; user: ItemType }> {
    switch (provider) {
        case "google":
            const response = await fetch(
                "https://www.googleapis.com/oauth2/v3/userinfo",
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                },
            )
            const googleUser =
                (await response.json()) as gapi.client.oauth2.Userinfo

            // If Google DOES give us an email, we can be CERTAIN that the user is who they say they are.
            if (!googleUser.email) {
                throw new Error("Google login failed: email not provided")
            }

            let user: ItemType
            const db = connect()
            const result = await db
                .from(TABLE_NAME)
                .select("*")
                .eq("email", googleUser.email)
                .single()
            if (result.error) {
                // If the error is something other than "no rows", we should throw it
                if (result.error.code !== "PGRST116") {
                    throw result.error
                }
            }
            if (result.data) {
                user = toCamelCase(result.data) as ItemType
            } else {
                // If user doesn't exist, create a new one
                const newUser: ItemType = {
                    firstName: googleUser.given_name ?? "",
                    lastName: googleUser.family_name ?? "",
                    email: googleUser.email ?? "",
                    image: googleUser.picture,
                    gender: googleUser.gender,
                }
                const createResult = await db
                    .from(TABLE_NAME)
                    .insert(toSnakeCase(newUser))
                    .select()
                    .single()
                if (createResult.error) {
                    throw createResult.error
                }
                user = toCamelCase(createResult.data) as ItemType
            }

            return new Promise((resolve, reject) => {
                sign(
                    user,
                    process.env.JWT_SECRET || "secret",
                    { expiresIn: "1h" },
                    (err, token) => {
                        if (err || !token) {
                            reject(err || new Error("Token generation failed"))
                            return
                        }
                        resolve({ token, user })
                    },
                )
            })
        default:
            throw new Error("Unsupported provider")
    }
}

export async function create(user: ItemType): Promise<ItemType> {
    const db = connect()
    const result = await db
        .from(TABLE_NAME)
        .insert(toSnakeCase(user))
        .select()
        .single()
    if (result.error) {
        throw result.error
    }
    return toCamelCase(result.data) as ItemType
}

export async function update(
    id: number,
    user: Partial<ItemType>,
): Promise<ItemType> {
    const db = connect()
    const result = await db
        .from(TABLE_NAME)
        .update(toSnakeCase(user))
        .eq("id", id)
        .select()
        .single()
    if (result.error) {
        throw result.error
    }
    return toCamelCase(result.data) as ItemType
}

export async function remove(id: number): Promise<ItemType> {
    const db = connect()
    const result = await db
        .from(TABLE_NAME)
        .delete()
        .eq("id", id)
        .select()
        .single()
    if (result.error) {
        throw result.error
    }
    return toCamelCase(result.data) as ItemType
}

export async function seed() {
    const db = connect()
    const items = data.items.map((item) => ({
        // flatten the address fields into the main user object
        ...toSnakeCase(filterKeys(item, userKeys as any)),
        ...toSnakeCase(filterKeys(item.address, userAddressKeys as any)),
    }))
    const result = await db.from(TABLE_NAME).insert(items)
    if (result.error) {
        throw result.error
    }
    return result.count
}
