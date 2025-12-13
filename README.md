# Markdown Compiler

This is a simple Markdown compiler written in TypeScript. It takes a Markdown string as input and outputs a series of tokens.

## Features

- **Tokenizer:** The compiler can tokenize the following Markdown syntax:
  - Headings (`#`)
  - Bold (`**`)
  - Italics (`__`)
  - Code Blocks (```)
  - Inline Code (`` ` ``)
  - Unordered Lists (`-`, `*`)
  - Ordered Lists (`1.`)

## Project Structure

The project is organized as follows:

```
.
├── src
│   ├── parser
│   └── tokenizer
│       ├── index.ts
│       └── utils.ts
├── tests
│   └── tokenizer.test.ts
└── types
    └── token.d.ts
```

- `src/tokenizer`: Contains the tokenizer logic.
- `src/parser`: (Currently empty) This will contain the parser that takes the tokens and generates an Abstract Syntax Tree (AST) or HTML.
- `tests`: Contains the tests for the tokenizer.
- `types`: Contains the type definitions for the tokens.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v16 or higher)
- [TypeScript](https://www.typescriptlang.org/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/hrutavmodha/markdown-transpiler.git
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

### Usage

To use the tokenizer, you can import the `tokenize` function from `src/tokenizer/index.ts` and pass it a Markdown string:

```typescript
import tokenize from './src/tokenizer/index.ts';

const markdown = '# Hello, world!';
const tokens = tokenize(markdown);

console.log(tokens);
```

### Running Tests

To run the tests, you can use the following command:

```bash
npm test
```

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
