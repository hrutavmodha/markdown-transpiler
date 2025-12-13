import type { Tokens } from '../../types/token.d.ts'
import {
    isAlphabet,
    isCodeBlock,
    isNumber
} from './utils.ts'

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
            while (k < src.length && src[k] !== '\n') {
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
        else if (
            src[i] === '*' &&
            src[i + 1] === '*'
        ) {
            let k: number = i + 2
            let boldText: string = ''
            while (
                src[k] !== '*' &&
                src[k + 1] !== '*'
            ) {
                boldText += src[k]
                k++
            }
            boldText += src[k]
            tokens.push({
                type: 'Bold',
                metadata: {
                    text: boldText
                }
            })
            i = k + 1
        }
        // Italics
        else if (
            src[i] === '_' && 
            src[i + 1] === '_'
         ) {
            let k: number = i + 2
            let italicsText: string = ''
            while (
                src[k] !== '_' &&
                src[k + 1] !== '_'
            ) {
                italicsText += src[k]
                k++
            }
            italicsText += src[k]
            tokens.push({
                type: 'Italics',
                metadata: {
                    text: italicsText
                }
            })
            i = k + 1
        }
        // Code Block
        else if (isCodeBlock(src[i] as string + src[i + 1] + src[i + 2])) {
            let language: string = ''
            let code: string = ''
            let k: number = i + 3 
            while (src[k] !== '\n') {
                language += src[k]
                k++
            }
            while (!isCodeBlock(src[k] as string + src[k + 1] + src[k + 2])) {
                code += src[k]
                k++
            }
            tokens.push({
                type: 'CodeBlock', 
                metadata: {
                    language: language.trim(),
                    text: code
                }
            })
            i = k + 2
        }
        // Inline Code
        else if (src[i] === '`') {
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
        // Unordered List - Circle
        else if (src[i] === '-') {
            let k: number = i + 1
            let list: string = ''
            while ((
                isAlphabet(src[k] as string) ||
                isNumber(src[k] as string) ||
                src[k] === ' '
            ) && src[k] !== '\n'
            ) {
                list += src[k]
                k++
            }
            if (list) {
                tokens.push({
                    type: 'UnorderedListDisc',
                    metadata: {
                        text: list.trim()
                    }
                })
            } 
            i = k + 1
        }
        // Unordered List - Disc 
        else if (src[i] === '*') {
            let k: number = i + 1
            let list: string = ''
            while ((
                isAlphabet(src[k] as string) ||
                isNumber(src[k] as string) ||
                src[k] === ' '
            ) && src[k] !== '\n'
            ) {
                list += src[k]
                k++
            }
            if (list) {
                tokens.push({
                    type: 'UnorderedListDisc',
                    metadata: {
                        text: list.trim()
                    }
                })
            }
            i = k + 1
        }
        // Normal Text
        else if (isAlphabet(src[i] as string)) {
            let k: number = i
            let paragraphText: string = ''
            while ((
                isAlphabet(src[k] as string) || 
                isNumber(src[k] as string) ||
                src[k] === ' '
            ) && src[k] !== '\n'
            ) {
                paragraphText += src[k]
                k++
            }
            tokens.push({
                type: 'Paragraph',
                metadata: {
                    text: paragraphText
                }
            })
            i = k - 1
        }
        i++
    }
    return tokens
}
