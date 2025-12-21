import type { Nodes } from '../../types/token.d.ts'

export default function generate(tokens: Nodes): string {
    let htmlStr: string = ''
    let i: number = 0
    let insideUl: boolean = false
    
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
            case 'InlineCode':
                htmlStr += `<code>${token.children?.[0]}</code>`
                break
            case 'CodeBlock':
                htmlStr += `<pre><code>${token.children?.[0]}</code></pre>`
                break
            case 'UnorderedListCircle':
                if (!insideUl) {
                    htmlStr += '<ul type="circle">'
                    insideUl = true
                }
                htmlStr += `<li>${typeof token.children?.[0] === 'object' ? generate(token?.children as any) : token.children?.[0]}</li>`
                if (tokens[i + 1]?.type !== 'UnorderedListCircle') {
                    htmlStr += '</ul>'
                    insideUl = false
                }
                break
            case 'UnorderedListDisc':
                if (!insideUl) {
                    htmlStr += '<ul type="disc">'
                    insideUl = true
                }
                htmlStr += `<li>${typeof token.children?.[0] === 'object' ? generate(token?.children as any) : token.children?.[0]}</li>`
                if (tokens[i + 1]?.type !== 'UnorderedListDisc') {
                    htmlStr += '</ul>'
                    insideUl = false
                }
                break
            case 'Link':
                htmlStr += `<a href="${token.metadata?.href}">${typeof token.children?.[0] === 'object' ? generate(token?.children as any) : token.children?.[0]}</a>`
                break
            case 'Image':
                console.log(JSON.stringify(token.metadata?.altText[0], null, 4))
                htmlStr += `<img src="${token.metadata?.src}" alt="${token.metadata?.altText[0]}" />` 
                break
            case 'BlockQuote':
                htmlStr += `<blockquote>${typeof token.children?.[0] === 'object' ? generate(token?.children as any) : token.children?.[0]}</blockquote>`
                break
            case 'Text':
                htmlStr += token.children?.[0]
                break
        }
        i++
    }
    
    return htmlStr
}