#!/usr/bin/env node
const fs = require('fs')
const codedog = require('../lib')

let filePath = process.argv[2]
let outPath = filePath.replace('md', 'html')

let editorWidth = ~~process.argv[3] // default is 100% width 
let editorHeight = ~~process.argv[4] || 270 // default is 270px as the height

let mdString = fs.readFileSync(filePath, 'utf-8')
let html = codedog(mdString, editorWidth, editorHeight)
fs.writeFileSync(outPath, html)