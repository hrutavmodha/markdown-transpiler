import tokenize from '../src/tokenizer/index.ts'

const markdown = `
    ## Hello World
    **This is a bold text**
    __Its italics text__
    This is a __mixed__ **text**
    \`console.log('Hello World')\`
    \`\`\` js
    let a = 'Hello World'
    console.log(a)
    \`\`\`
    - List Item Number 1
    - List Item Number 2
`

const tokens = tokenize(markdown)

console.log(JSON.stringify(tokens, null, 4))
