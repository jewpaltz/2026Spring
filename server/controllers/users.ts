/*  B"H

Users Controller
*/

import { Router } from "express"
import { getAll, get, create, update, remove } from "../models/users"
import { User, DataEnvelope, DataListEnvelope } from "../types"

const app = Router()

app.get("/", (req, res) => {
    const { list, count } = getAll(req.query)
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
    .get("/count", (req, res) => {
        const { count } = getAll(req.query)
        const response: DataEnvelope<{ count: number }> = {
            data: { count },
            isSuccess: true,
        }
        res.send(response)
    })
    .get("/:id", (req, res) => {
        const { id } = req.params
        const response: DataEnvelope<User> = {
            data: get(Number(id)),
            isSuccess: true,
        }
        res.send(response)
    })

    .post("/", (req, res) => {
        const newUser = create(req.body)
        const response: DataEnvelope<User> = {
            data: newUser,
            isSuccess: true,
        }
        res.send(response)
    })
    .patch("/:id", (req, res) => {
        const { id } = req.params
        const updatedUser = update(Number(id), req.body)
        const response: DataEnvelope<User> = {
            data: updatedUser as User,
            isSuccess: true,
        }
        res.send(response)
    })
    .delete("/:id", (req, res) => {
        const { id } = req.params
        const removedUser = remove(Number(id))
        const response: DataEnvelope<User> = {
            data: removedUser,
            isSuccess: true,
            message: `User ${removedUser.firstName} ${removedUser.lastName} has been removed.`,
        }
        res.send(response)
    })

export default app
