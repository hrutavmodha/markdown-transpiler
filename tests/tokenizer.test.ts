import { describe, it, expect } from 'vitest'
import tokenize from '../src/tokenizer/index.ts'

describe('tokenizer', () => {
    it('should handle headings', () => {
        const markdown = '# Hello World'
        const tokens = tokenize(markdown)
        expect(tokens).toEqual([
            {
                type: 'Heading',
                metadata: {
                    level: 1,
                    text: 'Hello World',
                },
            },
        ])
    })

    it('should handle nested markings in headings', () => {
        const md = '# Hello **World**'
        const tokens = tokenize(md)
        // console.log(JSON.stringify(tokens, null, 4))
    })

    it('should handle bold text', () => {
        const markdown = '**Hello World**'
        const tokens = tokenize(markdown)
        // console.log(JSON.stringify(tokens, null, 4))
        expect(tokens).toEqual([
            {
                type: 'Bold',
                metadata: {
                    text: 'Hello World',
                },
            },
        ])
    })

    it('should handle inline code', () => {
        const markdown = '`Hello World`'
        const tokens = tokenize(markdown)
        expect(tokens).toEqual([
            {
                type: 'InlineCode',
                metadata: {
                    text: 'Hello World',
                },
            },
        ])
    })
})