import generate from './generator/index.ts'
import parse from './parser/index.ts'

export default function transpile(src: string, debug: boolean) {
    const ast = parse(src)
    const htmlStr = generate(ast)
    if (debug) {
        console.log('Source Code:\n', src)
        console.log('Generated AST:\n', JSON.stringify(ast, null, 2))
        console.log('Generated HTML String:\n', htmlStr)
    }
    return htmlStr
}

transpile('# Hello, World!', true)