import type { Nodes } from '../../types/token.d.ts'

export default function generate(tokens: Nodes): string {
    let htmlStr: string = ''
    let i: number = 0
    while (i < tokens.length) {
        const token = tokens[i]
        switch (token?.type) {
            case 'Heading':
                htmlStr += `<h${token.metadata?.level}>${token.children?.length === 1 ? token.children : generate(token?.children as Nodes)}</h${token.metadata?.level}>`
            case 'Italics':
                htmlStr += `<i>${token.children?.length === 1 ? token.children : generate(token?.children as Nodes)}</i>`
            case 'Bold':
                htmlStr += `<em>${token.children?.length === 1 ? token.children : generate(token?.children as Nodes)}</em>`
        }
        i++
    }
    return htmlStr
}