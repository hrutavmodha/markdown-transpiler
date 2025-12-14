type Token = {
    type: string,
    metadata?: { [key: string]: any },
    children?: Array<Token> | Array<string> | Array<number>
}

export type Tokens = Array<Token>