/*  B"H

Users Controller
*/

import { Router } from "express"
import { getAll, update } from "../models/cart"
import { DataEnvelope, DataListEnvelope, CartItem } from "../types"

const app = Router()

// Get all items in user's cart, with optional paging, sorting, and searching
app.get("/:userId", (req, res) => {
    const { userId } = req.params
    const { list, count } = getAll(Number(userId), req.query)

    const response: DataListEnvelope<CartItem> = {
        data: list,
        isSuccess: true,
        total: count,
    }
    res.send(response)
}).post("/:userId", (req, res) => {
    const { userId } = req.params

    // Here we deconstruct the productId and quantity from the request body, which should be sent as JSON.
    const updatedItem = update(
        Number(userId),
        req.body.productId,
        req.body.quantity,
    )
    const response: DataEnvelope<CartItem> = {
        data: updatedItem,
        isSuccess: true,
    }
    res.send(response)
})

export default app
