/*  B"H
 */

import type { CartItem } from "../types"
// Models can use other models, but should not use controllers or routes.
import { get as getProduct } from "./products"
import { PagingRequest } from "../types/dataEnvelopes"
import { connect, toCamelCase } from "./supabase"

export const TABLE_NAME = "cart_items"

type ItemType = CartItem

export async function getAll(userId: number, params: PagingRequest) {
    const db = connect()
    let query = db
        .from(TABLE_NAME)
        .select("*, products(*)", { count: "estimated" })
        .eq("user_id", userId)

    if (params?.search) {
        const search = params.search.toLowerCase()
        query = query.or(
            `products.title.ilike.%${search}%,products.description.ilike.%${search}%`,
        )
    }

    if (params?.sortBy) {
        query = query.order(params.sortBy, { ascending: !params.descending })
    }
    const page = params?.page || 1
    const pageSize = params?.pageSize || 10
    const start = (page - 1) * pageSize
    query = query.range(start, start + pageSize - 1)

    const result = await query
    const list = result.data?.map((x) => ({
        product: toCamelCase(x.products),
        quantity: x.quantity,
    })) as ItemType[]
    const count = result.count ?? 0
    return { list, count }
}

export async function update(
    userId: number,
    productId: number,
    quantity: number,
): Promise<ItemType> {
    const db = connect()

    // Fetch existing cart item for this user/product
    const { data: existing } = await db
        .from(TABLE_NAME)
        .select("quantity")
        .eq("user_id", userId)
        .eq("product_id", productId)
        .maybeSingle()

    const newQuantity = (existing?.quantity ?? 0) + quantity

    // If quantity is 0 or less, remove item from cart
    if (newQuantity <= 0) {
        await db
            .from(TABLE_NAME)
            .delete()
            .eq("user_id", userId)
            .eq("product_id", productId)
        const product = await getProduct(productId)
        return { product, quantity: 0 }
    }

    // Upsert means "insert or update": if a cart item for this user/product already exists, it will update the quantity; otherwise, it will create a new cart item
    const { data: row, error } = await db
        .from(TABLE_NAME)
        .upsert(
            { user_id: userId, product_id: productId, quantity: newQuantity },
            { onConflict: "user_id,product_id" },
        )
        .select("quantity")
        .single()

    if (error) throw error

    const product = await getProduct(productId)
    return { product, quantity: row.quantity }
}
