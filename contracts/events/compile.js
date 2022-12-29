// This file does two things:
//
// 1. Compile the Rust contract using cargo (see buildCmd below). This will
//    create a wasm file in the 'build' folder.
// 2. Create a symbolic link (symlink) to the generated wasm file in the root
//    project's `out` folder, for easy use with near-cli.
//
// First, import some helper libraries. `shelljs` is included in the
// devDependencies of the root project, which is why it's available here. It
// makes it easy to use *NIX-style scripting (which works on Linux distros,
// macOS, and Unix systems) on Windows as well.
const sh = require('shelljs')

// For the duration of this script, we want to operate from within the
// Rust project's folder. Let's change into that directory.
sh.cd(__dirname)

// You can call this script with `node compile.js` or `node compile.js
// --debug`. Let's set a variable to track whether `--debug` was used.
const debug = process.argv.pop() === '--debug'

// You can call this script with `node compile.js` or `node compile.js --debug`.
// Let's set a variable to track whether `--debug` was used.
// Note: see other flags in ./cargo/config. Unfortunately, you cannot set the
// `--target option` in Cargo.toml.
const buildCmd = debug
  ? 'cargo build --target wasm32-unknown-unknown'
  : 'cargo build --target wasm32-unknown-unknown --release'

// Execute the build command, storing exit code for later use
const { code } = sh.exec(buildCmd)

// Exit script with the same code as the build command
process.exit(code)
