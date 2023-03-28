export function generateShortCode(length: number): string {
    const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("")

    let str = ""

    for (let i = 0; i < length; i++) {
        str += characters[Math.floor(Math.random() * characters.length)]
    }

    return str
}
