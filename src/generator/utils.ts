import { isAlphabet } from '../parser/utils.ts'

export function removeMarks(src: string): string {
    let i: number = 0
    let returnStr: string = ''
    while (i < src.length) {
        if (
            isAlphabet(src[i] as string) || 
            src[i] === ' '
        ) {
            returnStr += src[i]
        }
        i++
    }
    return returnStr
}