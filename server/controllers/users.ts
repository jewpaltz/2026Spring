/*  B"H

Users Controller
*/

import { Router } from "express"
import { getAll, get, create, update, remove, seed } from "../models/users"
import { User, DataEnvelope, DataListEnvelope } from "../types"

const app = Router()

app.get("/", async (req, res) => {
    const { list, count } = await getAll(req.query)
    const sanitizedUsers = list.map((x) => ({
        ...x,
        password: undefined,
    }))
    const response: DataListEnvelope<User> = {
        data: sanitizedUsers,
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
        const response: DataEnvelope<User> = {
            data: await get(Number(id)),
            isSuccess: true,
        }
        res.send(response)
    })

    .post("/", async (req, res) => {
        const newUser = await create(req.body)
        const response: DataEnvelope<User> = {
            data: newUser,
            isSuccess: true,
        }
        res.send(response)
    })
    .patch("/:id", async (req, res) => {
        const { id } = req.params
        const updatedUser = await update(Number(id), req.body)
        const response: DataEnvelope<User> = {
            data: updatedUser as User,
            isSuccess: true,
        }
        res.send(response)
    })
    .delete("/:id", async (req, res) => {
        const { id } = req.params
        const removedUser = await remove(Number(id))
        const response: DataEnvelope<User> = {
            data: removedUser,
            isSuccess: true,
            message: `User ${removedUser.firstName} ${removedUser.lastName} has been removed.`,
        }
        res.send(response)
    })
    .post("/seed", async (_req, res) => {
        const count = await seed()
        const response: DataEnvelope<number | null> = {
            data: count,
            isSuccess: true,
        }
        res.send(response)
    })

export default app
