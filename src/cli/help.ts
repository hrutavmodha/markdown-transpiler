export default function showHelp() {
    console.log(`
Usage: transpile [options] <file>

Transpiles Markdown source code to HTML

Options:
  -d, --debug          Enable debug mode (shows AST and intermediate steps)
  -o, --output <file>  Write output to file instead of stdout
  -h, --help           Show this help message

Examples:
  transpile input.txt
  transpile -d input.txt
  transpile -o output.html input.txt
  cat input.txt | transpile
`)
    process.exit(0)
}
