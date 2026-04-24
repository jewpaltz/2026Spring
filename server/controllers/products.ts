/*  B"H

Users Controller
*/

import { Router } from "express"
import { getAll, get, create, update, remove, seed } from "../models/products"
import { Product, DataEnvelope, DataListEnvelope } from "../types"

const app = Router()

app.get("/", async (req, res) => {
    const { list, count } = await getAll(req.query)

    const response: DataListEnvelope<Product> = {
        data: list,
        isSuccess: true,
        total: count,
    }
    res.send(response)
})
    .get("/count", async (req, res) => {
        const { count } = await getAll(req.query)
        const response: DataEnvelope<{ count: number }> = {
            data: { count },
            isSuccess: true,
        }
        res.send(response)
    })
    .get("/:id", async (req, res) => {
        const { id } = req.params
        const response: DataEnvelope<Product> = {
            data: await get(Number(id)),
            isSuccess: true,
        }
        res.send(response)
    })

    .post("/", async (req, res) => {
        const newItem = await create(req.body)
        const response: DataEnvelope<Product> = {
            data: newItem,
            isSuccess: true,
        }
        res.send(response)
    })
    .patch("/:id", async (req, res) => {
        const { id } = req.params
        const updatedItem = await update(Number(id), req.body)
        const response: DataEnvelope<Product> = {
            data: updatedItem,
            isSuccess: true,
        }
        res.send(response)
    })
    .delete("/:id", async (req, res) => {
        const { id } = req.params
        const removedItem = await remove(Number(id))
        const response: DataEnvelope<Product> = {
            data: removedItem,
            isSuccess: true,
            message: `Product ${removedItem.title} has been removed.`,
        }
        res.send(response)
    })
    .post("/seed", async (_req, res) => {
        await seed()
        const response: DataEnvelope<null> = {
            data: null,
            isSuccess: true,
            message: "Products have been seeded.",
        }
        res.send(response)
    })
export default app
