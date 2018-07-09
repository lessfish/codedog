#!/usr/bin/env node

const fs = require('fs')
const codedog = require('../lib/index.js')

let filePath = process.argv[2]
let outPath = filePath.replace('md', 'html')

let editorWidth = ~~process.argv[3] // default to 100% width 
let editorHeight = ~~process.argv[4] || 270 // default to 270px as the height

let mdString = fs.readFileSync(filePath, 'utf-8')
let html = codedog.markdown2html(mdString, editorWidth, editorHeight)
fs.writeFileSync(outPath, html)