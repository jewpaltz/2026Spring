/*  B"H

    Call directly from command line with tsx or use a script in package.json like "seed": "tsx server/models/seed_data.ts"
*/
import { config } from "dotenv"
config()

import { seed as seedProducts } from "./products"
import { seed as seedUsers } from "./users"

Promise.all([seedProducts(), seedUsers()])
    .then(() => {
        console.log("Seeding complete")
        process.exit(0)
    })
    .catch((err) => {
        console.error("Error seeding data:", err)
        process.exit(1)
    })
