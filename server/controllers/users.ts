/*  B"H

Users Controller
*/

import { Router } from "express"

const app = Router()

app.get("/", (_req, res) => {
    res.send([
        { id: 1, name: "John Doe", email: "john.doe@example.com" },
        { id: 2, name: "Jane Doe", email: "jane.doe@example.com" },
    ])
})
    .get("/:id", (req, res) => {
        const { id } = req.params
        res.send({ id, name: "John Doe", email: "john.doe@example.com" })
    })
    .post("/", (req, res) => {
        const { name, email } = req.body
        // In a real application, you would save the user to the database here
        res.send({ id: 3, name, email })
    })
    .patch("/:id", (req, res) => {
        const { id } = req.params
        const { name, email } = req.body
        // In a real application, you would update the user in the database here
        res.send({ id, name, email })
    })
    .delete("/:id", (req, res) => {
        const { id } = req.params
        // In a real application, you would delete the user from the database here
        res.send({ id })
    })

export default app
