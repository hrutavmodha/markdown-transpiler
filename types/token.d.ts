type Token = {
    type: string,
    lexeme?: string,
    metadata: { [key: string]: any }
}

export type Tokens = Array<Token>