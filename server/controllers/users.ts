/*  B"H

Users Controller
*/

import { Router, RequestHandler } from "express"
import { getAll, get, create, update, remove } from "../models/users"
import type { User, DataListEnvelope } from "../types"

const app = Router()

const getHandler: RequestHandler<{
    search: string
    sortBy: string
}> = (req, res) => {
    let { users, total } = getAll(
        req.query.search as string,
        req.query.sortBy as string,
        req.query.descending === "true",
        Number(req.query.page),
        Number(req.query.pageSize),
    )

    users = users.map((x) => ({
        ...x,
        password: undefined,
    }))
    const ret: DataListEnvelope<User> = {
        data: users,
        total,
        isSuccess: true,
    }
    res.send(ret)
}

app.get("/", getHandler)
    .get("/count", (_req, res) => {
        const count = getAll().total
        res.send({ count, isSuccess: true })
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
