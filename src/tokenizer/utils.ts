export function isAlphabet(ch: string): boolean {
    if (ch.length > 1) {
        return false
    }
    return (
        ch >= 'A' &&
        ch <= 'Z'
    ) || (
        ch >= 'a' &&
        ch <= 'z'
    )
} 

export function isCodeBlock(ch: string): boolean {
    if (ch.length > 3) {
        return false
    }
    return ch === '```'
}