import { parseArgs } from 'util'

export const { values, positionals } = parseArgs({
    options: {
        debug: {
            type: 'boolean',
            short: 'd',
            default: false,
        },
        help: {
            type: 'boolean',
            short: 'h',
            default: false,
        },
        output: {
            type: 'string',
            short: 'o',
        },
    },
    allowPositionals: true,
})
