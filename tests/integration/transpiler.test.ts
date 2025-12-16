import { describe, expect, it } from 'vitest'
import transpile from '../../src/main.ts'
import parse from '../../src/parser/index.ts'
import generate from '../../src/generator/index.ts'

describe('compiler', () => {
    it('should transpile a heading', () => {
        const markdown = '# Hello World'
        const expectedHtml = '<h1>Hello World</h1>'
        const actualHtml = transpile(markdown)
        expect(actualHtml).toBe(expectedHtml)
    })  
    it('should transpile multiple headings', () => {
        const markdown = '# Hello\n## World'
        const expectedHtml = '<h1>Hello</h1><h2>World</h2>'
        const actualHtml = transpile(markdown)
        expect(actualHtml).toBe(expectedHtml)
    })  
    it('should transpile a paragraph', () => {
        const markdown = 'This is a paragraph.'
        const expectedHtml = 'This is a paragraph.'
        const actualHtml = transpile(markdown)
        expect(actualHtml).toBe(expectedHtml)
    })

    it('should transpile a mix of headings and paragraphs', () => {
        const markdown = '# Title\nThis is a paragraph\n## Subtitle\nAnother paragraph.'
        const expectedHtml = '<h1>Title</h1>This is a paragraph\n<h2>Subtitle</h2>Another paragraph.'
        const actualHtml = transpile(markdown)
        expect(actualHtml).toBe(expectedHtml)
    })

    it('should transpile bold text', () => {
        const markdown = '**Bold Text**'
        const expectedHtml = '<b>Bold Text</b>'
        const actualHtml = transpile(markdown)
        expect(actualHtml).toBe(expectedHtml)
    })
   
    it('should transpile italics text', () => {
        const markdown = '__Italic Text__'
        const expectedHtml = '<i>Italic Text</i>'
        const actualHtml = transpile(markdown)
        expect(actualHtml).toBe(expectedHtml)
    })
   
    it('should transpile inline code', () => {
        const markdown = 'This is `inline code`.'
        const expectedHtml = 'This is <code>inline code</code>'
        const actualHtml = transpile(markdown)
        expect(actualHtml).toBe(expectedHtml)
    })
   
    it('should transpile a code block', () => {
        const markdown = '```js\nconsole.log("Hello");\n```'
        const expectedHtml = '<pre><code>\nconsole.log("Hello");\n</code></pre>'
        const actualHtml = transpile(markdown)
        expect(actualHtml).toBe(expectedHtml)
    })
   
    it('should transpile an unordered list (circle)', () => {
        const markdown = ' - Item 1\n - Item 2'
        const expectedHtml = '<ul type="circle"><li> Item 1</li><li> Item 2</li></ul>'
        const actualHtml = transpile(markdown)
        expect(actualHtml).toBe(expectedHtml)
    })
   
    it('should transpile an unordered list (disc)', () => {
        const markdown = ' * Item A\n * Item B'
        const expectedHtml = '<ul type="disc"><li> Item A</li><li> Item B</li></ul>'
        const actualHtml = transpile(markdown)
        console.log(`'${actualHtml}'`)
        expect(actualHtml).toBe(expectedHtml)
    })
   
    it('should transpile nested bold and italics', () => {
        const markdown = '**Bold with __italics__**'
        const expectedHtml = '<b>Bold with <i>italics</i></b>'
        const actualHtml = transpile(markdown)
        expect(actualHtml).toBe(expectedHtml)
    })
})
