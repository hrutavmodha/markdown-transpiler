export function isAlphabet(ch: string): boolean {
    return (
        ch >= 'A' &&
        ch <= 'Z'
    ) || (
        ch >= 'a' &&
        ch <= 'z'
    )
}

export function isTextCharacter(ch: string): boolean {
    const specialChars = ['*', '_', '`', '-']
    return !specialChars.includes(ch)
}

export function isCodeBlock(ch: string): boolean {
    return ch === '```'
}

export function isNumber(ch: string): boolean {
    return ch >= '0' && ch <= '9'
}

export function hasNestedMark(src: string): boolean {
    let i: number = 0
    let returnValue: boolean = false
    while (i < src.length) {
        // Italics
        if (src[i] === '_' && src[i + 1] === '_') {
            returnValue = true
        }
        // Bold
        else if (src[i] === '*' && src[i + 1] === '*') {
            returnValue = true
        }
        // Inline code
        else if (src[i] === '`') {
            returnValue = true
        }
        i++
    }
    return returnValue
}