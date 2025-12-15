import generate from './generator/index.ts'
import parse from './parser/index.ts'

export default function transpile(src: string) {
    const ast = parse(src)
    // console.log(JSON.stringify(ast, null, 4))
    const htmlStr = generate(ast)
    console.log(htmlStr)
    return htmlStr
}

transpile('# __Hello World__')