import type { Nodes } from '../../types/token.js'
import {
    isTextCharacter,
    isCodeBlock,
    hasNestedMark,
    isAlphabet
} from './utils.ts'

export default function parse(src: string): Nodes {
    let nodes: Nodes = []
    let i: number = 0
    
    while (i < src.length) {
        // Headings
        if (src[i] === '#' && (src[i - 1] === '\n' || src[i - 1] == undefined)) {
            let level: number = 0
            let k: number = i
            while (k < src.length && src[k] !== ' ') {
                level++
                k++
            }

            if (k < src.length && src[k] === ' ') {
                k++
                let headingText: string = ''
                let childNodes: Nodes = []
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
                nodes.push({
                    type: 'Heading',
                    metadata: {
                        level: level
                    },
                    children: childNodes.length === 0 ? [headingText.trim()] : childNodes
                })
                i = k
            } else {
                let text: string = ''
                while (i < src.length && src[i] !== '\n') {
                    text += src[i]
                    i++
                }
                nodes.push({
                    type: 'Text',
                    children: [text]
                })
                i--
            }
        }
        // Bold
        else if (
            src[i] === '*' &&
            src[i + 1] === '*'
        ) {
            let k: number = i + 2
            let boldText: string = ''
            let closingTagFound: boolean = false
            while (k < src.length) {
                if (src[k] === '*' && src[k + 1] === '*') {
                    closingTagFound = true
                    break
                }
                boldText += src[k]
                k++
            }

            if (closingTagFound) {
                let childNodes: Nodes = []
                if (hasNestedMark(boldText)) {
                    childNodes = parse(boldText)
                }
                nodes.push({
                    type: 'Bold',
                    children: childNodes.length === 0 ? [boldText] : childNodes
                })
                i = k + 1
            } else {
                nodes.push({
                    type: 'Text',
                    children: [src.substring(i, src.length)]
                })
                i = src.length - 1
            }
        }
        // Italics
        else if (
            src[i] === '_' &&
            src[i + 1] === '_'
        ) {
            let k: number = i + 2
            let italicsText: string = ''
            let closingTagFound: boolean = false
            while (k < src.length) {
                if (src[k] === '_' && src[k + 1] === '_') {
                    closingTagFound = true
                    break
                }
                italicsText += src[k]
                k++
            }

            if (closingTagFound) {
                let childNodes: Nodes = []
                if (hasNestedMark(italicsText)) {
                    childNodes = parse(italicsText)
                }
                nodes.push({
                    type: 'Italics',
                    children: childNodes.length === 0 ? [italicsText] : childNodes
                })
                i = k + 1
            } else {
                nodes.push({
                    type: 'Text',
                    children: [src.substring(i, src.length)]
                })
                i = src.length - 1
            }
        }
        // Code Block
        else if (isCodeBlock(src[i] as string + src[i + 1] + src[i + 2])) {
            let k: number = i + 3
            let language: string = ''
            while (
                k < src.length &&
                src[k] !== '\n'
            ) {
                language += src[k]
                k++
            }

            let codeStart = k
            while (
                k < src.length &&
                !isCodeBlock(src[k] as string + src[k + 1] + src[k + 2])
            ) {
                k++
            }

            if (k < src.length && isCodeBlock(src[k] as string + src[k + 1] + src[k + 2])) {
                let code: string = src.substring(codeStart, k)
                nodes.push({
                    type: 'CodeBlock',
                    metadata: {
                        language: language.trim(),
                    },
                    children: [code]
                })
                i = k + 2
            } else {
                let textContent: string = src.substring(i, k)
                nodes.push({
                    type: 'Text',
                    children: [textContent]
                })
                i = k - 1
            }
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

            if (k < src.length && src[k] === '`') {
                nodes.push({
                    type: 'InlineCode',
                    children: [code]
                })
                i = k
            } else {
                nodes.push({
                    type: 'Text',
                    children: ['`' + code]
                })
                i = k - 1
            }
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
            nodes.push({
                type: 'UnorderedListCircle',
                children: childNodes.length === 0 ? [list] : childNodes
            })
            i = k + 1
        }
        // Unordered List - Disc 
        else if (
            src[i] === '*' &&
            src[i - 1] !== '*' &&
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
            nodes.push({
                type: 'UnorderedListDisc',
                children: childNodes.length === 0 ? [list] : childNodes
            })
            i = k + 1
        }
        // Links
        else if (src[i] === '[') {
            let k: number = i + 1
            let linkTextEnd: number = -1

            while (k < src.length) {
                if (src[k] === ']') {
                    linkTextEnd = k
                    break
                }
                k++
            }

            if (linkTextEnd !== -1 && src[linkTextEnd + 1] === '(') {
                let urlStart: number = linkTextEnd + 2
                let urlEnd: number = -1
                k = urlStart

                while (k < src.length) {
                    if (src[k] === ')') {
                        urlEnd = k
                        break
                    }
                    k++
                }

                if (urlEnd !== -1) {
                    const linkStr: string = src.substring(i + 1, linkTextEnd)
                    const urlStr: string = src.substring(urlStart, urlEnd)
                    let childNodes: Nodes = []

                    if (hasNestedMark(linkStr)) {
                        childNodes = parse(linkStr)
                    }

                    nodes.push({
                        type: 'Link',
                        metadata: {
                            href: urlStr
                        },
                        children: childNodes.length === 0 ? [linkStr] : childNodes
                    })
                    i = urlEnd
                } else {
                    let text: string = src.substring(i, k)
                    nodes.push({
                        type: 'Text',
                        children: [text]
                    })
                    i = k - 1
                }
            } else {
                let text: string = src.substring(i, k)
                nodes.push({
                    type: 'Text',
                    children: [text]
                })
                i = k - 1
            }
        }  
        // Images
        else if (src[i] === '!' && src[i + 1] === '[') {
            let altText: string = ''
            let childNodes: Nodes = []
            let k: number = i + 2
            let imgSrc: string = ''
            while (
                k < src.length &&
                src[k] !== ']'
            ) {
                altText += src[k]
                k++
            }
            
            if (hasNestedMark(altText)) {
                childNodes = parse(altText)
            }
            k = k + 1
            if (src[k] === '(') {
                while (src[k + 1] !== ')') {
                    imgSrc += src[k + 1]
                    k++
                }
            }

            nodes.push({
                type: 'Image',
                metadata: {
                    src: imgSrc, 
                    altText: childNodes.length === 0 ? [altText] : childNodes
                }
            })

            i = k + 1
        }
        // Block Quotes
        else if (
            src[i] === '>' &&
            src[i + 1] === ' ' && (
                src[i - 1] === '\n' ||
                src[i - 1] === '' ||
                src[i - 1] == undefined
            )
        ) {
            let k: number = i + 2
            let blockQuoteStr: string = ''
            let childNodes: Nodes = []
            while (
                k < src.length &&
                src[k] !== '\n'
            ) {
                blockQuoteStr += src[k]
                k++
            }
            if (hasNestedMark(blockQuoteStr)) {
                childNodes = parse(blockQuoteStr)
            }
            i = k + 1
            nodes.push({
                type: 'BlockQuote',
                children: childNodes.length === 0 ? [blockQuoteStr] : childNodes
            })
        }
        // Normal Text
        else if (isAlphabet(src[i] as string)) {
            let k: number = i
            let text: string = ''
            let childNodes: Nodes = []
            while (k < src.length && src[k] !== '\n' && isTextCharacter(src[k] as string)) {
                text += src[k]
                k++
            }
            nodes.push({
                type: 'Text',
                children: childNodes.length === 0 ? [text] : childNodes
            })
            i = k - 1
        }
        // TODO: Add tokenization for tables
        i++
    }
    return nodes
}