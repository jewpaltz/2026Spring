/*  B"H
 */

import type { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"
import { User } from "../types"

declare global {
    namespace Express {
        interface Request {
            user?: User
        }
    }
}

export function validateJWT(req: Request, _res: Response, next: NextFunction) {
    const token = req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
        return next()
    }

    verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
        if (err) {
            return next(err)
        }

        req.user = decoded as User
        next()
    })
}
