import type { Nodes } from '../../types/token.d.ts'

export default function generate(tokens: Nodes): string {
    let htmlStr: string = ''
    let i: number = 0
    while (i < tokens.length) {
        const token = tokens[i]
        switch (token?.type) {
            case 'Heading':
                htmlStr += `<h${token.metadata?.level}>${typeof token.children?.[0] === 'object' ? generate(token?.children as any) : token.children?.[0]}</h${token.metadata?.level}>`
                break
            case 'Italics':
                htmlStr += `<i>${typeof token.children?.[0] === 'object' ? generate(token?.children as any) : token.children?.[0]}</i>`
                break
            case 'Bold':
                htmlStr += `<b>${typeof token.children?.[0] === 'object' ? generate(token?.children as any) : token.children?.[0]}</b>`
                break
            case 'Text':
                htmlStr += token.children?.[0]
                break
        }
        i++
    }
    return htmlStr
}