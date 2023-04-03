import send from "@fastify/send"
import { createRequestHandler } from "@mcansh/remix-raw-http"
import { stat } from "fs/promises"
import { createServer } from "http"
import { join } from "path"

import * as serverBuild from "./build/index.js"

const MODE = process.env.NODE_ENV

async function checkFileExists(path) {
    try {
        let stats = await stat(path)
        return stats.isFile()
    } catch {
        return false
    }
}

async function serveFile(request) {
    let fileURL = request.url

    // Workaround for HMR
    if (fileURL.includes("?")) {
        // Remove query params when checking for files
        fileURL = fileURL.split("?")[0]
    }

    let filePath = join(process.cwd(), "public", fileURL)
    let fileExists = await checkFileExists(filePath)

    if (!fileExists) {
        return undefined
    }

    let isBuildAsset = request.url.startsWith("/build")

    return send(request, filePath, {
        immutable: MODE === "production" && isBuildAsset,
        maxAge: MODE === "production" && isBuildAsset ? "1y" : 0,
    })
}

let server = createServer(async (request, response) => {
    try {
        let fileStream = await serveFile(request)
        if (fileStream) {
            return fileStream.pipe(response)
        }
        createRequestHandler({ build: serverBuild, mode: MODE })(request, response)
    } catch (error) {
        console.error(error)
    }
})

let port = Number(process.env.PORT) || 3000

server.listen(port, () => {
    console.log(`✅ app ready: http://localhost:${port}`)
})
