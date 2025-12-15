import type { Node } from '../../types/token.d.ts'
import generate from './index.ts'

let listStr: string = '<ul>'

export function handleList(token: Node) {
    if (token.type === 'UnorderedListCircle') {
        listStr = '<ul type="circle">'
        if (typeof token.children?.[0] === 'object') {
            listStr += '<li>'
            const htmlStr = generate(token.children as any)
            listStr += htmlStr
        } 
        else {
            listStr += '<li>'
            listStr += token.children?.[0]
        }
    }
    listStr += '</li>'
    return listStr
}