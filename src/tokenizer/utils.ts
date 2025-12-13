export function isAlphabet(ch: string): boolean {
    return (
        ch >= 'A' &&
        ch <= 'Z'
    ) || (
        ch >= 'a' &&
        ch <= 'z'
    )
} 

export function isCodeBlock(ch: string): boolean {
    return ch === '```'
}

export function isNumber(ch: string): boolean {
    return ch >= '0' && ch <= '9'
}