const marked = require('marked')
const ejs = require('ejs')
const fs = require('fs')

/**
 * 
 * markdown to html with `<code class="lang-html">xx</code>` replaced with a live demo
 * @param {string} markdown string 
 * @param {number} editorWidth 
 * @param {number} editorHeight 
 * @returns {string} html String
 */
function markdown2html(mdString, editorWidth, editorHeight) {
  const unescapeMap = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
  }

  // get title
  let title = ''
  let p = /(#+)(.*)/
  let matches = p.exec(mdString)
  if (matches && matches[1] === '#') {
    title = matches[2].trim()
  }

  let html = marked(mdString)

  // unescape
  Object.keys(unescapeMap).forEach(item => {
    let [from, to] = [item, unescapeMap[item]]
    html = html // only works for `lang=html`
      .replace(new RegExp(`(<pre><code class="lang-html">)([\\s\\S]+?)(<\/code></\pre>)`, 'g'), (a, b, c, d) => {
        return b + c.replace(new RegExp(`${from}`, 'g'), to) + d
      })
  })

  // escape and unescape
  html = html // only works for `lang=html`
    .replace(new RegExp(`(<pre><code class="lang-html">)([\\s\\S]+?)(<\/code></\pre>)`, 'g'), (a, b, c, d) => {
      // unescape
      Object.keys(unescapeMap).forEach(item => {
        let [from, to] = [item, unescapeMap[item]]
        c = c.replace(new RegExp(`${from}`, 'g'), to)
      })

      // escape for `\` and `<\script>`
      // e.g. content: '\a0'
      c = c
        .replace(/\\/g, '\\\\')
        .replace(/<\\script>/, '</\\script>')
        
      return b + c + d
    })

  // `<code class="lang-html">xx</code>` replaced with a live demo
  let codedogCnt = -1

  html = html.replace(/<pre><code class="lang-html">([\s\S]+?)<\/code><\/pre>/g, (origin, code) => {
    // only works for `lang=html`
    code = code.trim()
    codedogCnt += 1

    const iframeStr = fs.readFileSync(__dirname + '/iframe.ejs', 'utf-8')
    return ejs.render(iframeStr, {codedogCnt, code})
  })

  const htmlStr = fs.readFileSync(__dirname + '/template.ejs', 'utf-8')
  return ejs.render(htmlStr, {html, editorWidth, editorHeight, title})
}

exports.markdown2html = markdown2html