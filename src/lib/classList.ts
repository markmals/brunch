export function classList(...classes: (string | boolean | undefined)[]): string {
    return classes.filter(Boolean).join(" ")
}
