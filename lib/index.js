const marked = require('marked')

/**
 * 
 * markdown to html with `<code class="lang-html">xx</code>` replaced
 * @param {string} mdString 
 * @param {number} editorWidth 
 * @param {number} editorHeight 
 * @returns {string} htmlString
 */
function markdown2html(mdString, editorWidth, editorHeight) {
  const unescapeMap = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
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
  

  let codedogCnt = -1

  html = html.replace(/<pre><code class="lang-html">([\s\S]+?)<\/code><\/pre>/g, (origin, code) => {
    // only works for `lang=html`
    code = code.trim()

    return  `
  <div class="codedog" id="codedog${++codedogCnt}">
    <div class="codedog-nav">
      <button class="btn-new-page">新页面打开</button>
    </div>
    <div class="codedog-main">
      <div id="editor${codedogCnt}" class="codedog-editor"></div>
      <div class="result">
        <iframe class="preview" frameborder=0></iframe>
      </div>
    </div>
  </div>
  <script>
    let editor${codedogCnt} = ace.edit("editor${codedogCnt}")
    editor${codedogCnt}.$blockScrolling = 1
    editor${codedogCnt}.setTheme("ace/theme/monokai")
    editor${codedogCnt}.getSession().setMode("ace/mode/html")
    editor${codedogCnt}.getSession().setTabSize(2)
    editor${codedogCnt}.getSession().setValue(\`${code}\`)

    let iframe${codedogCnt} = document.querySelector("#codedog${codedogCnt} .preview");
    iframe${codedogCnt}.srcdoc = \`${code}\`

    editor${codedogCnt}.getSession().on('change', () => {
      iframe${codedogCnt}.srcdoc =  editor${codedogCnt}.getValue()
    });
  </script>
  `
  })

  html = `
  <style type="text/css" media="screen">
    .codedog {
      width: ${editorWidth}px;
      height: ${editorHeight + 30}px;
    }

    .codedog .codedog-nav {
      height: 30px;      
    } 

    .codedog .codedog-nav .btn-new-page {
      float: right;
    } 

    .codedog .codedog-main {
      height: ${editorHeight}px;
    }

    .codedog .codedog-editor { 
      width: 50%;
      height: 100%;
      float: left;
    }

    .codedog .result {
      width: 50%;
      height: 100%;
      float: left;
      border: 1px solid #000;
      box-sizing: border-box;
    }

    .codedog .result .preview {
      width: 100%;
      height: 100%;
    }

    .hljs {
      width: ${editorWidth}px;
    }
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.8/ace.js" type="text/javascript" charset="utf-8"></script>
  <script>
  function runCode(editorId) {
    let code = ace.edit(editorId).getValue()
    let handler = window.open('')
    handler.opener = null
    handler.document.write(code)
    handler.document.close()
  }

  document.onclick = e => {
    let target = e.target
    if (target.className !== 'btn-new-page') 
      return

    runCode(target.parentNode.nextElementSibling.children[0])
  }
  </script>

  <script src="https://cdn.bootcss.com/highlight.js/9.12.0/highlight.min.js"></script>
  <link href="https://cdn.bootcss.com/highlight.js/9.10.0/styles/monokai-sublime.min.css" rel="stylesheet">
  <script>hljs.initHighlightingOnLoad();</script>
  ` + html

  return html
}

exports.markdown2html = markdown2html