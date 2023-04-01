const { createServer } = require("http")
const { join } = require("path")
const fs = require("fs/promises")
const { constants } = require("fs")
const { createRequestHandler } = require("@mcansh/remix-raw-http")
const send = require("@fastify/send")

const MODE = process.env.NODE_ENV

async function checkFileExists(filepath) {
    try {
        let file = await fs.stat(filepath, constants.F_OK)
        return file.isFile()
    } catch {
        return false
    }
}

async function serveFile(request) {
    let fileURL = request.url

    // Workaround for HMR
    if (fileURL.includes("?")) {
        fileURL = fileURL.split("?")[0]
    }

    let filePath = join(process.cwd(), "public", fileURL)
    let fileExists = await checkFileExists(filePath)
    if (!fileExists) return undefined
    let isBuildAsset = request.url.startsWith("/build")
    return send(request, filePath, {
        immutable: MODE === "production" && isBuildAsset,
        maxAge: MODE === "production" && isBuildAsset ? "1y" : 0,
    })
}

let server = createServer(async (request, response) => {
    try {
        let fileStream = await serveFile(request)
        if (fileStream) return fileStream.pipe(response)
        let build = require("./build")
        createRequestHandler({ build, mode: MODE })(request, response)
    } catch (error) {
        console.error(error)
    }
})

let port = Number(process.env.PORT) || 3000

server.listen(port, () => {
    console.log(`✅ dev server started at: http://localhost:${port}`)
})
