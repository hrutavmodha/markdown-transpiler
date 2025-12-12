import type { Tokens } from '../../types/token.d.ts'

export default function tokenize(src: string): Tokens {
    let tokens: Tokens = []
    let i: number = 0
    while (i < src.length) {
        // Headings
        if (src[i] === '#') {
            let level: number = 1
            let headingText: string = ''
            let k: number = i + 1
            while (src[k] !== ' ') {
                level++
                k++
            }
            while (
                k < src.length &&
                src[k] !== '\n'
            ) {
                headingText += src[k]
                k++
            }
            i = k
            tokens.push({
                type: 'Heading',
                metadata: {
                    level: level,
                    text: headingText
                }
            })
        }
        // Bold
        if (src[i] === '*') {
            console.log('First condition matched')
            let k: number = i + 1
            if (src[k] === '*') {
                console.log('Second condition matched')
                let boldText: string = ''
                console.log('Source[Iterator + 1] is', src[k + 1])
                while (src[k] !== '*') {
                    console.log('Entered in while loop')
                    boldText += src[k]
                    k++
                }
                tokens.push({
                    type: 'Bold',
                    metadata: {
                        text: boldText
                    }
                })
                i = k + 1
            }
        }
        console.log(src[i])
        i++
    }
    return tokens
}