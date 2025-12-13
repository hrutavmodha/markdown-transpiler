import { describe, it, expect } from 'vitest'
import tokenize from '../src/tokenizer/index.ts'

describe('tokenizer', () => {
    console.log('Descibe triggered')
    it('should handle headings', () => {
        console.log('It triggered')
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
    console.log('It completed')
})