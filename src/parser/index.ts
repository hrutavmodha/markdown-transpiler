import type { Nodes } from '../../types/token.js'
import {
    isAlphabet,
    isCodeBlock,
    isNumber,
    hasNestedMark
} from './utils.ts'

export default function parse(src: string): Nodes {
    let Nodes: Nodes = []
    let i: number = 0
    
    while (i < src.length) {
        // Headings
        if (src[i] === '#') {
            let level: number = 1
            let headingText: string = ''
            let k: number = i + 1
            let childNodes: Nodes = []
            while (
                k < src.length &&
                src[k] !== ' '
            ) {
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
            if (hasNestedMark(headingText)) {
                childNodes = parse(headingText)
            }
            Nodes.push({
                type: 'Heading',
                metadata: {
                    level: level
                },
                children: childNodes.length === 0 ? [headingText.trim()] : childNodes
            })
            i = k
        }
        // Bold
        else if (
            src[i] === '*' &&
            src[i + 1] === '*'
        ) {
            let k: number = i + 2
            let childNodes: Nodes = []
            let boldText: string = ''
            while (
                k < src.length &&
                src[k] !== '*' &&
                src[k + 1] !== '*'
            ) {
                boldText += src[k]
                k++
            }
            boldText += src[k]
            if (hasNestedMark(boldText)) {
                childNodes = parse(boldText)
            }
            Nodes.push({
                type: 'Bold',
                children: childNodes.length === 0 ? [boldText] : childNodes
            })
            i = k + 1
        }
        // Italics
        else if (
            src[i] === '_' &&
            src[i + 1] === '_'
        ) {
            let k: number = i + 2
            let childNodes: Nodes = []
            let italicsText: string = ''
            while (
                k < src.length &&
                src[k] !== '_' &&
                src[k + 1] !== '_'
            ) {
                italicsText += src[k]
                k++
            }
            italicsText += src[k]
            if (hasNestedMark(italicsText)) {
                childNodes = parse(italicsText)
            }
            Nodes.push({
                type: 'Italics',
                children: childNodes.length === 0 ? [italicsText] : childNodes
            })
            i = k + 1
        }
        // Code Block
        else if (isCodeBlock(src[i] as string + src[i + 1] + src[i + 2])) {
            let language: string = ''
            let code: string = ''
            let k: number = i + 3
            while (
                k < src.length &&
                src[k] !== '\n'
            ) {
                language += src[k]
                k++
            }
            while (
                k < src.length &&
                !isCodeBlock(src[k] as string + src[k + 1] + src[k + 2])
            ) {
                code += src[k]
                k++
            }
            Nodes.push({
                type: 'CodeBlock',
                metadata: {
                    language: language.trim(),
                },
                children: [code]
            })
            i = k + 2
        }
        // Inline Code
        else if (src[i] === '`') {
            let k: number = i + 1
            let code: string = ''
            while (
                k < src.length &&
                src[k] !== '`'
            ) {
                code += src[k]
                k++
            }
            Nodes.push({
                type: 'InlineCode',
                children: [code]
            })
            i = k + 1
        }
        // Unordered List - Circle
        else if (
            src[i] === '-' &&
            src[i + 1] === ' '
        ) {
            let k: number = i + 1
            let childNodes: Nodes = []
            let list: string = ''
            while (
                k < src.length && src[k] !== '\n'
            ) {
                list += src[k]
                k++
            }
            if (hasNestedMark(list)) {
                childNodes = parse(list)
            }
            Nodes.push({
                type: 'UnorderedListCircle',
                children: childNodes.length === 0 ? [list] : childNodes
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
            let childNodes: Nodes = []
            while (
                k < src.length && src[k] !== '\n') {
                list += src[k]
                k++
            }
            if (hasNestedMark(list)) {
                childNodes = parse(list)
            }
            Nodes.push({
                type: 'UnorderedListDisc',
                children: childNodes.length === 0 ? [list] : childNodes
            })
            i = k + 1
        }
        // Normal Text
        else if (isAlphabet(src[i] as string)) {
            let k: number = i
            let paragraphText: string = ''
            let childNodes: Nodes = []
            while (
                k < src.length && (
                isAlphabet(src[k] as string) ||
                isNumber(src[k] as string) ||
                src[k] === ' '
            ) && src[k] !== '\n'
            ) {
                paragraphText += src[k]
                k++
            }
            if (hasNestedMark(paragraphText)) {
                childNodes = parse(paragraphText)
            }
            Nodes.push({
                type: 'Text',
                children: childNodes.length === 0 ? [paragraphText] : childNodes
            })
            i = k - 1
        }
        // TODO: Add parsing for tables
        i++
    }
    return Nodes
}