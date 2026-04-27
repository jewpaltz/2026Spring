/*  B"H

Users Controller
*/

import { Router } from "express"
import { getAll, update } from "../models/cart"
import { DataEnvelope, DataListEnvelope, CartItem } from "../types"

const app = Router()

// Get all items in user's cart, with optional paging, sorting, and searching
app.get("/", async (req, res) => {
    const userId = req.user?.id ?? null
    if (!userId) {
        res.status(401).send({
            data: null,
            isSuccess: false,
            message: "Unauthorized",
        })
        return
    }
    const { list, count } = await getAll(Number(userId), req.query)

    const response: DataListEnvelope<CartItem> = {
        data: list,
        isSuccess: true,
        total: count,
    }
    res.send(response)
}).post("/", async (req, res) => {
    const userId = req.user?.id ?? null
    if (!userId) {
        res.status(401).send({
            data: null,
            isSuccess: false,
            message: "Unauthorized",
        })
        return
    }

    // Here we deconstruct the productId and quantity from the request body, which should be sent as JSON.
    const updatedItem = await update(
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
