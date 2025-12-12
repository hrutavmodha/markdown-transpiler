import tokenize from '../src/tokenizer/index.ts'

const markdown = `
    ## Hello World
    **This is a bold text**
    This should be tokenized as paragraph
    __Its italics text__
    \`console.log('Hello World')\`
    \`\`\` js
    let a = 'Hello World'
    console.log(a)
    \`\`\`
`

const tokens = tokenize(markdown)

console.log(JSON.stringify(tokens, null, 4))
