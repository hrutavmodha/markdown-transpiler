export default function isAlphabet(ch: string): boolean {
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
