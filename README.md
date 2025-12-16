# Markdown Transpiler

A lightweight, TypeScript-native Markdown to HTML transpiler. This project provides a simple and extensible way to convert Markdown syntax into valid HTML.

## Features

Currently, the transpiler supports the following Markdown syntax:

-   **Headings**: `<h1>` to `<h6>` using `#` syntax.
-   **Bold**: `<b>` tags using `**text**`.
-   **Italics**: `<i>` tags using `__text__`.
-   **Code Blocks**: `<pre><code>` blocks for multiline code, with language specification (e.g., ` ```js `).
-   **Inline Code**: `<code>` tags for single-line code snippets using `` `code` ``.
-   **Unordered Lists**: `<ul>` with `<li>` items. Supports `*` for disc style and `-` for circle style.
-   **Nested Formatting**: Supports nested styles like bold text within a heading.

## How it Works

The transpilation process is divided into two main stages:

1.  **Parsing**: The input Markdown string is first processed by the `parser`. It tokenizes the string and builds an Abstract Syntax Tree (AST), which is an array of nodes representing the structure of the document.

2.  **Generation**: The `generator` then traverses the AST and recursively generates the corresponding HTML string.

For example, the markdown string `# **Hello**` would be parsed into the following AST:

```json
[
  {
    "type": "Heading",
    "metadata": {
      "level": 1
    },
    "children": [
      {
        "type": "Bold",
        "children": [
          "Hello"
        ]
      }
    ]
  }
]
```

The generator then processes this AST to produce the final HTML: `<h1><b>Hello</b></h1>`.

## Project Structure

The project is organized to clearly separate concerns:

```
.
├── src
│   ├── main.ts         # The main entry point that exports the `transpile` function.
│   ├── generator       # Contains the logic to generate HTML from an AST.
│   └── parser          # Contains the logic to parse a Markdown string into an AST.
├── tests
│   ├── unit            # Contains unit tests for the parser and generator individually.
│   └── integration     # Contains integration tests for the `transpile` function, testing the end-to-end functionality.
└── types
    └── token.d.ts      # Contains all TypeScript type definitions for the AST nodes.
```

## Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/en/) (v16 or higher is recommended)
-   [npm](https://www.npmjs.com/) (which comes bundled with Node.js)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/markdown-transpiler.git
    ```
2.  Navigate to the project directory and install the dependencies:
    ```bash
    cd markdown-transpiler
    npm install
    ```

## Usage

To use the transpiler, import the `transpile` function from `src/main.ts` and pass it a Markdown string.

### Simple Example

```typescript
import transpile from './src/main.ts';

const markdown = '# Hello, world!';
const html = transpile(markdown);

console.log(html);
// Output: <h1>Hello, world!</h1>
```

### More Complex Example

```typescript
import transpile from './src/main.ts';

const markdown = `
# Welcome to the Transpiler

This is a **demonstration** of its capabilities.

- Feature 1
- __Feature 2__

\`\`\`js
console.log("Hello, from a code block!");
\`\`\`
`;

const html = transpile(markdown);
console.log(html);
```

## Running Tests

This project uses [Vitest](https://vitest.dev/) for testing. To run the entire test suite (including unit and integration tests), use the following command:

```bash
npm test
```

## Technologies Used

-   **[TypeScript](https://www.typescriptlang.org/)**: For type safety and modern JavaScript features.
-   **[Node.js](https://nodejs.org/)**: As the runtime environment.
-   **[Vitest](https://vitest.dev/)**: As the testing framework.

## Contributing

Contributions are highly welcome! If you'd like to contribute, please follow these steps:

1.  **Fork the repository** on GitHub.
2.  **Clone your forked repository** to your local machine.
3.  **Create a new branch** for your feature or bug fix (e.g., `feature/add-link-support` or `fix/parser-bug`).
4.  **Make your changes** and add or update tests as appropriate.
5.  **Run the tests** (`npm test`) to ensure everything is still working correctly.
6.  **Commit your changes** with a clear and descriptive commit message.
7.  **Push your changes** to your forked repository.
8.  **Create a pull request** from your branch to the main repository's `main` branch.

If you have an idea for a new feature, it's a good practice to open an issue first to discuss it.

## License

This project is licensed under the MIT License.
