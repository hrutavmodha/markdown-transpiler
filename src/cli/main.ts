import {
    values,
    positionals
} from './options.ts'
import showHelp from './help.ts'
import transpile from '../main.ts'
import { resolve } from 'path'
import { readFileSync } from 'fs'

async function main() {
    if (values.help) {
        showHelp()
    }

    let src: string
    
    if (positionals.length === 0) {
        const chunks: Buffer[] = []
        for await (const chunk of process.stdin) {
            chunks.push(chunk)
        }
        src = Buffer.concat(chunks).toString('utf8')
        
        if (!src.trim()) {
            console.error('Error: No input provided')
            console.error('Use --help for usage information')
            process.exit(1)
        }
    } else {
        const filePath = resolve(positionals[0] as string)
        try {
            src = readFileSync(filePath, 'utf8')
        } catch (error) {
            console.error(`Error reading file: ${error.message}`)
            process.exit(1)
        }
    }

    
    try {
        const result = transpile(src, values.debug ?? false)
        
        if (values.output) {
            const { writeFileSync } = await import('node:fs')
            writeFileSync(values.output, result, 'utf8')
            if (!values.debug) {
                console.log(`Output written to ${values.output}`)
            }
        } else {
            if (!values.debug) {
                console.log(result)
            }
        }
    } catch (error) {
        console.error(`Error during transpilation: ${error.message}`)
        if (error.stack && values.debug) {
            console.error(error.stack)
        }
        process.exit(1)
    }
}

main()