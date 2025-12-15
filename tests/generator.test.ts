import { describe, it, expect } from 'vitest'
import generate from '../src/generator/index.ts'
import type { Nodes } from '../types/token.d.ts'

describe('Generator', () => {
    it('should return an empty string if no nodes are passed', () => {
        expect(generate([])).toBe('')
    })

    it('should generate text from a text node', () => {
        const nodes: Nodes = [
            {
                type: 'Text',
                children: ['Hello World']
            }
        ]
        expect(generate(nodes)).toBe('Hello World')
    })

    it('should generate a heading from a heading node', () => {
        const nodes: Nodes = [
            {
                type: 'Heading',
                metadata: {
                    level: 1
                },
                children: ['Hello World']
            }
        ]
        expect(generate(nodes)).toBe('<h1>Hello World</h1>')
    })

    it('should generate bold text from a bold node', () => {
        const nodes: Nodes = [
            {
                type: 'Bold',
                children: ['Hello World']
            }
        ]
        expect(generate(nodes)).toBe('<b>Hello World</b>')
    })

    it('should generate italics text from an italics node', () => {
        const nodes: Nodes = [
            {
                type: 'Italics',
                children: ['Hello World']
            }
        ]
        expect(generate(nodes)).toBe('<i>Hello World</i>')
    })

    it('should generate an unordered list (circle) from an unordered list node', () => {
        const nodes: Nodes = [
            {
                type: 'UnorderedListCircle',
                children: [' Item 1']
            }
        ]
        expect(generate(nodes)).toBe('<ul type="circle"><li> Item 1</li></ul>')
    })

    it('should generate an unordered list (disc) from an unordered list node', () => {
        const nodes: Nodes = [
            {
                type: 'UnorderedListDisc',
                children: [' Item 1']
            }
        ]
        expect(generate(nodes)).toBe('<ul type="disc"><li> Item 1</li></ul>')
    })

    it('should generate a code block from a code block node', () => {
        const nodes: Nodes = [
            {
                type: 'CodeBlock',
                metadata: {
                    language: 'js'
                },
                children: ['\nconsole.log("Hello World")\n']
            }
        ]
        expect(generate(nodes)).toBe(`<pre><code>
console.log("Hello World")
</code></pre>`)
    })

    it('should generate an inline code from an inline code node', () => {
        const nodes: Nodes = [
            {
                type: 'InlineCode',
                children: ['console.log("Hello World")']
            }
        ]
        expect(generate(nodes)).toBe('<code>console.log("Hello World")</code>')
    })

    it('should generate nested HTML', () => {
        const nodes: Nodes = [
            {
                type: 'Heading',
                metadata: {
                    level: 1
                },
                children: [
                    {
                        type: 'Bold',
                        children: ['Hello World']
                    }
                ]
            }
        ]
        expect(generate(nodes)).toBe('<h1><b>Hello World</b></h1>')
    })

    it('should generate mixed nodes', () => {
        const nodes: Nodes = [
            {
                type: 'Text',
                children: ['This is some ']
            },
            {
                type: 'Bold',
                children: ['bold text']
            },
            {
                type: 'Text',
                children: [' and some ']
            },
            {
                type: 'Italics',
                children: ['italic text']
            },
            {
                type: 'Text',
                children: ['.']
            }
        ]
        expect(generate(nodes)).toBe('This is some <b>bold text</b> and some <i>italic text</i>.')
    })
});
