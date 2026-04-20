import express from "express"
import usersController from "./controllers/users"
import productController from "./controllers/products"
import cartController from "./controllers/cart"
import { DataEnvelope } from "./types"
import { config } from "dotenv"

config()

const PORT = process.env.PORT ?? 3000
const SERVER = process.env.SERVER ?? "localhost"
const STATIC_DIR = process.env.STATIC_DIR ?? "client/dist"

const app = express()

///////// Middleware
app.use((_req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*") // Allow requests from any origin
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE") // Allow specific HTTP methods
    res.setHeader("Access-Control-Allow-Headers", "*") // Allow specific headers
    next()
}).use(express.json()) // Middleware to parse JSON request bodies

///////// Routes
app.use(express.static(STATIC_DIR))

    .get("/suny", (_req, res) => {
        res.send("The best plan of my life!")
    })
    .use("/api/v1/users", usersController)
    .use("/api/v1/products", productController)
    .use("/api/v1/cart", cartController)

//////// Error handling
app.use(
    (
        err: Error,
        _req: express.Request,
        res: express.Response,
        _next: express.NextFunction,
    ) => {
        console.error(err)

        const response: DataEnvelope<null> = {
            data: null,
            isSuccess: false,
            message: err.message ?? "An error occurred",
        }

        res.status((err as any).status ?? 500).send(response)
    },
)

app.listen(PORT, () => {
    console.log(`Server is running on http://${SERVER}:${PORT}`)
})

console.log("Listening for requests...")

/*
  Asynchronous patterns in Node.js
  1. Node Style Callbacks
  2. Pipeline
  3. Promises
  4. Async/Await

  Riddle: 60 minutes to get over the bridge
  Four People: 5, 10, 20, 25 minutes to cross
  Only two people can cross at a time, and they must move at the slower person's pace. How do they all get across in 60 minutes?
*/

/* 
  Ways to send data to the server
  1. PATH parameters: /users/123
  2. Query parameters: ?name=John&age=30
  3. Headers
    3.5. Cookies
  4. Request body: { "name": "John", "age": 30 }
    4.0. Form data: name=John&age=30
    4.5. JSON data: { "name": "John", "age": 30 }

*/

/* 
  parts of a url
  1. Protocol: http:// or https://
  2. Domain: www.example.com
  3. Port: :80 or :443
  4. Path: /path/to/resource
  5. Query parameters: ?name=John&age=30
  6. Fragment: #section1

  example: https://www.example.com:80/path/to/resource?name=John&age=30#section1
*/

/*
  Module Types
    1. CommonJS:
      import: require('module')
      export: module.exports = { functions, variables, etc. }
    2. ES6:
      import: import { functions, variables, etc. } from 'module'
      export: export namedFunctions, namedVariables, etc. 
      export default defaultFunction, defaultVariable, etc.
*/
