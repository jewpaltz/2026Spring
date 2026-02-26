import express from "express"

const PORT = 3000
const SERVER = "localhost"

const app = express()

app.get("/", (_req, res) => {
    res.send("Hello World!")
}).get("/suny", (_req, res) => {
    res.send("The best plan of my life!")
})

app.listen(PORT, () => {
    console.log(`Server is running on http://${SERVER}:${PORT}`)
})
