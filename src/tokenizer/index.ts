import type { Tokens } from '../../types/token.d.ts'
import isAlphabet from './utils.ts'

export default function tokenize(src: string): Tokens {
    let tokens: Tokens = []
    let i: number = 0
    while (i < src.length) {
        // Normal Text
        if (isAlphabet(src[i] as string)) {
            let paragraph: string = ''
            let k: number = i
            while (src[k] !== '\n') {
                paragraph += src[k]
                k++
            }
            tokens.push({
                type: 'Paragraph',
                metadata: {
                    text: paragraph
                }
            })
            i = k
        }
        // Heading
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
            tokens.push({
                type: 'Heading',
                metadata: {
                    level: level,
                    text: headingText.trim()
                }
            })
            i = k
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
        // Italics
        if (
            src[i] === '_' && 
            src[i + 1] === '_'
         ) {
            let k: number = i + 2
            let italicsText: string = ''
            while (src[k] !== '_') {
                italicsText += src[k]
                k++
            }
            tokens.push({
                type: 'Italics',
                metadata: {
                    text: italicsText
                }
            })
            i = k + 1
        }
        // Inline Code
        if (src[i] === '`') {
            let k: number = i + 1
            let code: string = ''
            while (src[k] !== '`') {
                code += src[k]
                k++
            }
            tokens.push({
                type: 'InlineCode',
                metadata: {
                    text: code
                }
            })
            i = k + 1
        }

        i++
    }
    return tokens
}