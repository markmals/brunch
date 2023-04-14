export function classList(...classes: string[]): string {
    return classes.filter(Boolean).join(" ")
}
