import type { PrismaClient } from "@prisma/client"

let db: PrismaClient

if (import.meta.env.DEV) {
    import("@prisma/client").then(({ PrismaClient }) => (db = new PrismaClient()))
} else {
    import("@prisma/client/edge").then(({ PrismaClient }) => (db = new PrismaClient()))
}

export { db }
