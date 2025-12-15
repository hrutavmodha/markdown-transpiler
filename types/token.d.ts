type Node = {
    type: string,
    metadata?: { [key: string]: any },
    children?: Array<Token> | Array<string> | Array<number>
}

export type Nodes = Array<Node>