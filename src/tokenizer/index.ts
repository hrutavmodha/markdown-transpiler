import type { Tokens } from '../../types/token.d.ts'
import {
    isAlphabet,
    isCodeBlock,
    isNumber,
    hasNestedMark
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
            let childTokens: Tokens = []
            while (src[k] !== ' ') {
                level++
                k++
            }
            while (k < src.length && src[k] !== '\n') {
                headingText += src[k]
                k++
            }
            if (hasNestedMark(headingText)) {
                childTokens = tokenize(headingText)
            }
            tokens.push({
                type: 'Heading',
                metadata: {
                    level: level
                },
                children: childTokens.length === 0 ? [headingText] : childTokens
            })
            i = k
        }
        // Bold
        else if (
            src[i] === '*' &&
            src[i + 1] === '*'
        ) {
            let k: number = i + 2
            let childTokens: Tokens = []
            let boldText: string = ''
            while (
                src[k] !== '*' &&
                src[k + 1] !== '*'
            ) {
                boldText += src[k]
                k++
            }
            boldText += src[k]
            if (hasNestedMark(boldText)) {
                childTokens = tokenize(boldText)
            }
            tokens.push({
                type: 'Bold',
                children: childTokens.length === 0 ? [boldText] : childTokens
            })
            i = k + 1
        }
        // Italics
        else if (
            src[i] === '_' &&
            src[i + 1] === '_'
        ) {
            let k: number = i + 2
            let childTokens: Tokens = []
            let italicsText: string = ''
            while (
                src[k] !== '_' &&
                src[k + 1] !== '_'
            ) {
                italicsText += src[k]
                k++
            }
            italicsText += src[k]
            if (hasNestedMark(italicsText)) {
                childTokens = tokenize(italicsText)
            }
            tokens.push({
                type: 'Italics',
                children: childTokens.length === 0 ? [italicsText] : childTokens
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
            let childTokens: Tokens = []
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
            if (hasNestedMark(list)) {
                childTokens = tokenize(list)
            }
            tokens.push({
                type: 'UnorderedListCircle',
                children: childTokens.length === 0 ? [list] : childTokens
            })
            i = k + 1
        }
        // Unordered List - Disc 
        else if (
            src[i] === '*' &&
            src[i + 1] === ' '
        ) {
            let k: number = i + 1
            let list: string = ''
            let childTokens: Tokens = []
            while ((
                isAlphabet(src[k] as string) ||
                isNumber(src[k] as string) ||
                src[k] === ' '
            ) && src[k] !== '\n'
            ) {
                list += src[k]
                k++
            }
            if (hasNestedMark(list)) {
                childTokens = tokenize(list)
            }
            tokens.push({
                type: 'UnorderedListDisc',
                children: childTokens.length === 0 ? [list] : childTokens
            })
            i = k + 1
        }
        // Normal Text
        else if (isAlphabet(src[i] as string)) {
            let k: number = i
            let paragraphText: string = ''
            let childTokens: Tokens = []
            while ((
                isAlphabet(src[k] as string) ||
                isNumber(src[k] as string) ||
                src[k] === ' '
            ) && src[k] !== '\n'
            ) {
                paragraphText += src[k]
                k++
            }
            if (hasNestedMark(paragraphText)) {
                childTokens = tokenize(paragraphText)
            }
            tokens.push({
                type: 'Paragraph',
                children: childTokens.length === 0 ? [paragraphText] : childTokens
            })
            i = k - 1
        }
        else {
            console.log(`'${src[i]}'`)
        }
        i++
    }
    return tokens
}

const md = '# Hello **World__**'
const tokens = tokenize(md)
console.log(JSON.stringify(tokens, null, 4))