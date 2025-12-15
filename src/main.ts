import generate from './generator/index.ts'
import parse from './parser/index.ts'

export default function compile(src: string) {
    const ast = parse(src)
    const htmlStr = generate(ast)
    return htmlStr
}