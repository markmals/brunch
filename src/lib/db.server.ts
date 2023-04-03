import type { PrismaClient } from "@prisma/client"

let db: PrismaClient

if (process.env.NODE_ENV === "development") {
    import("@prisma/client").then(({ PrismaClient }) => (db = new PrismaClient()))
} else {
    import("@prisma/client/edge").then(({ PrismaClient }) => (db = new PrismaClient()))
}

export { db }
