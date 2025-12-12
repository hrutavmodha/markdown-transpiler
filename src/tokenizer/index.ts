import type { Tokens } from '../../types/token.d.ts'

export default function tokenize(src: string): Tokens {
    let tokens: Tokens = []
    let i: number = 0
    while (i < src.length) {
        // Headings
        if (src[i] === '#') {
            let level: number = 1
            let heading: string = ''
            let k: number = i + 1
            while (src[k] !== ' ') {
                level++
                k++
            }
            while (
                k < src.length &&
                src[k] !== '\n'
            ) {
                heading += src[k]
                k++
            }
            i = k
            tokens.push({
                type: 'Heading',
                metadata: {
                    level: level,
                    value: heading
                }
            })
        }
        i++
    }
    return tokens
}