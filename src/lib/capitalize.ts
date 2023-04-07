export function capitalize(phrase: string) {
    let lower = phrase.toLowerCase();
    return phrase.charAt(0).toUpperCase() + lower.slice(1);
}
