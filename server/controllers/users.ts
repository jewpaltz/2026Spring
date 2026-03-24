/*  B"H

Users Controller
*/

import { Router } from "express"
import { getAll, get, create, update, remove } from "../models/users"

const app = Router()

app.get("/", (_req, res) => {
    const users = getAll().map((x) => ({
        ...x,
        password: undefined,
    }))
    res.send(users)
})
    .get("/count", (_req, res) => {
        const count = getAll().length
        res.send({ count })
    })
    .get("/:id", (req, res) => {
        const { id } = req.params
        const user = get(Number(id))
        res.send(user)
    })

    .post("/", (req, res) => {
        const newUser = create(req.body)
        res.send(newUser)
    })
    .patch("/:id", (req, res) => {
        const { id } = req.params
        const updatedUser = update(Number(id), req.body)
        res.send(updatedUser)
    })
    .delete("/:id", (req, res) => {
        const { id } = req.params
        const removedUser = remove(Number(id))
        res.send(removedUser)
    })

export default app
