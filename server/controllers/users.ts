/*  B"H

Users Controller
*/

import { Router } from "express"
import {
    getAll,
    get,
    create,
    update,
    remove,
    seed,
    login,
} from "../models/users"
import { User, DataEnvelope, DataListEnvelope } from "../types"
import { requireAuth } from "../middleware/auth"

const app = Router()

app.get("/", requireAuth("admin"), async (req, res) => {
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
    .get("/count", requireAuth("admin"), async (req, res) => {
        const { count } = await getAll(req.query)
        const response: DataEnvelope<{ count: number }> = {
            data: { count },
            isSuccess: true,
        }
        res.send(response)
    })
    .get("/:id", requireAuth(), async (req, res) => {
        const { id } = req.params
        const response: DataEnvelope<User> = {
            data: await get(Number(id)),
            isSuccess: true,
        }
        res.send(response)
    })
    .post("/login", async (req, res) => {
        const { email, password } = req.body

        const response: DataEnvelope<{ token: string; user: User }> = {
            data: await login(email, password),
            isSuccess: true,
        }
        res.send(response)
    })

    .post("/", requireAuth("admin"), async (req, res) => {
        const newUser = await create(req.body)
        const response: DataEnvelope<User> = {
            data: newUser,
            isSuccess: true,
        }
        res.send(response)
    })
    .patch("/:id", requireAuth("admin"), async (req, res) => {
        const { id } = req.params
        const updatedUser = await update(Number(id), req.body)
        const response: DataEnvelope<User> = {
            data: updatedUser as User,
            isSuccess: true,
        }
        res.send(response)
    })
    .delete("/:id", requireAuth("admin"), async (req, res) => {
        const { id } = req.params
        const removedUser = await remove(Number(id))
        const response: DataEnvelope<User> = {
            data: removedUser,
            isSuccess: true,
            message: `User ${removedUser.firstName} ${removedUser.lastName} has been removed.`,
        }
        res.send(response)
    })
    .post("/seed", requireAuth("admin"), async (_req, res) => {
        const count = await seed()
        const response: DataEnvelope<number | null> = {
            data: count,
            isSuccess: true,
        }
        res.send(response)
    })

export default app
