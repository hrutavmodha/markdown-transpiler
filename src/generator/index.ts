import type { Nodes } from '../../types/token.d.ts'

export default function generate(tokens: Nodes): string {
    let htmlStr: string = ''
    let i: number = 0
    while (i < tokens.length) {
        const token = tokens[i]
        switch (token?.type) {
            case 'Heading':
                console.log(token.children)
                console.log(typeof token.children?.[0] === 'object')
                htmlStr += `<h${token.metadata?.level}>${typeof token.children?.[0] === 'object' ? generate(token?.children as any) : token.children?.[0]}</h${token.metadata?.level}>`
                break
            case 'Italics':
                console.log(token.children)
                htmlStr += `<i>${typeof token.children?.[0] === 'object' ? generate(token?.children as any) : token.children?.[0]}</i>`
                break
            case 'Bold':
                console.log(token.children)
                htmlStr += `<b>${typeof token.children?.[0] === 'object' ? generate(token?.children as any) : token.children?.[0]}</b>`
                break
            case 'Text': 
                console.log(token.children)
                htmlStr += token.children?.[0]
                break
        }
        i++
    }
    return htmlStr
}