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

    it('should handle bold text', () => {
        const markdown = '**Hello World**'
        const tokens = tokenize(markdown)
        expect(tokens).toEqual([
            {
                type: 'Bold',
                metadata: {
                    text: 'Hello World',
                },
            },
        ])
    })

    it('should handle italics text', () => {
        const markdown = '__Hello World__'
        const tokens = tokenize(markdown)
        expect(tokens).toEqual([
            {
                type: 'Italics',
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

    it('should handle bold and italics', () => {
        const markdown = '**__Hello World__**'
        const tokens = tokenize(markdown)
        expect(tokens).toEqual([
            {
                type: 'Bold',
                metadata: {
                    text: '__Hello World__',
                },
            },
        ])
    })

    it('should handle bold and unordered list', () => {
        const markdown = '**- Hello World**'
        const tokens = tokenize(markdown)
        expect(tokens).toEqual([
            {
                type: 'Bold',
                metadata: {
                    text: '- Hello World',
                },
            },
        ])
    })

    it('should handle italics and unordered list', () => {
        const markdown = '__* Hello World__'
        const tokens = tokenize(markdown)
        expect(tokens).toEqual([
            {
                type: 'Italics',
                metadata: {
                    text: '* Hello World',
                },
            },
        ])
    })
})