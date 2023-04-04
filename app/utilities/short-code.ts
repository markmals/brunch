export function generateShortCode(length: number): string {
    const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("")

    let str = ""

    for (let i = 0; i < length; i++) {
        str += characters[Math.floor(Math.random() * characters.length)]
    }

    return str
}

// for (let name of [
//     "Melissa Lau",
//     "Charles Lai",
//     "Eric Tsang",
//     "Kara Takasaki",
//     "Sarah Whatley",
//     "Morgan Giles",
//     "Mia Chu",
//     "Diego De Stefano",
//     "Thuy Luong",
//     "Andy Bassari",
// ]) {
//     console.log(name, generateShortCode(6))
// }
