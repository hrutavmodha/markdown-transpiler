import type { Tokens } from '../../types/token.d.ts'

export default function tokenize(src: string): Tokens {
    let tokens: Tokens = []
    let i: number = 0
    while (i < src.length) {
        // Headings
        if (src[i] === '#') {
            let level: number = 1
            let headingText: string = ''
            let k: number = i + 1
            while (src[k] !== ' ') {
                level++
                k++
            }
            while (
                k < src.length &&
                src[k] !== '\n'
            ) {
                headingText += src[k]
                k++
            }
            i = k
            tokens.push({
                type: 'Heading',
                metadata: {
                    level: level,
                    text: headingText.trim()
                }
            })
        }
        // Bold
        if (
            src[i] === '*' &&
            src[i + 1] === '*'
        ) {
            let k: number = i + 2
            let boldText: string = ''
            while (src[k] !== '*') {
                boldText += src[k]
                k++
            }
            tokens.push({
                type: 'Bold',
                metadata: {
                    text: boldText
                }
            })
            i = k + 1
        }
        console.log(src[i])
        i++
    }
    return tokens
}