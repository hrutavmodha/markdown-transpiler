import { describe, it, expect } from 'vitest'
import parse from '../src/parser/index.ts'

describe('Parser', () => {
    it('should parse headings', () => {
        expect(parse('# Hello World')).toEqual([
            {
                type: 'Heading',
                metadata: {
                    level: 1
                },
                children: ['Hello World']
            }
        ])
        expect(parse('## Hello World')).toEqual([
            {
                type: 'Heading',
                metadata: {
                    level: 2
                },
                children: ['Hello World']
            }
        ])
    })

    it('should parse bold text', () => {
        expect(parse('**Hello World**')).toEqual([
            {
                type: 'Bold',
                children: ['Hello World']
            }
        ])
    })

    it('should parse italics text', () => {
        expect(parse('__Hello World__')).toEqual([
            {
                type: 'Italics',
                children: ['Hello World']
            }
        ])
    })

    it('should parse code blocks', () => {
        expect(parse('```js\nconsole.log("Hello World")\n```')).toEqual([
            {
                type: 'CodeBlock',
                metadata: {
                    language: 'js'
                },
                children: ['\nconsole.log("Hello World")\n']
            }
        ])
    })

    it('should parse inline code', () => {
        expect(parse('`console.log("Hello World")`')).toEqual([
            {
                type: 'InlineCode',
                children: ['console.log("Hello World")']
            }
        ])
    })

    it('should parse unordered lists', () => {
        expect(parse('- Hello World')).toEqual([
            {
                type: 'UnorderedListCircle',
                children: [' Hello World']
            }
        ])
        expect(parse('* Hello World')).toEqual([
            {
                type: 'UnorderedListDisc',
                children: [' Hello World']
            }
        ])
    })



    it('should parse normal text', () => {
        expect(parse('Hello World')).toEqual([
            {
                type: 'Text',
                children: ['Hello World']
            }
        ])
    })

    it('should parse nested markdown', () => {
        expect(parse('# **Hello World**')).toEqual([
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
        ])

        expect(parse('## __Hello World__')).toEqual([
            {
                type: 'Heading',
                metadata: {
                    level: 2
                },
                children: [
                    {
                        type: 'Italics',
                        children: ['Hello World']
                    }
                ]
            }
        ])
    })
})
