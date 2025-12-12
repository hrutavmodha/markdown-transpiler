import tokenize from '../src/tokenizer/index.ts'

const markdown = `
    ## Hello World
    **This is a bold text**
`

const tokens = tokenize(markdown)

console.log(JSON.stringify(tokens, null, 4))
