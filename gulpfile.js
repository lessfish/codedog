const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload
let   codedog = require('./lib')
const fs = require('fs')
const decache = require('decache')

// 将 index.md 重新编译，并且刷新浏览器
gulp.task('compile', () => {
  let filePath = './example/index.md'
  let outPath = filePath.replace('md', 'html')
  let mdString = fs.readFileSync(filePath, 'utf-8')
  // 消除 require node_module 时的缓存
  // decache('./lib')
  delete require.cache[require.resolve('./lib')]
  codedog = require('./lib') // fresh start
  let html = codedog.markdown2html(mdString, 0, 270)
  fs.writeFileSync(outPath, html)
})

gulp.task('reloadBrowser', () => {
  reload()
})

gulp.task('server', ['compile'], () => {
  browserSync.init({
    server: {
      baseDir: './example'  // 根目录，index.html 文件所在的目录
    }
  })

  gulp.watch("./example/*.html", ['reloadBrowser'])
  gulp.watch("./example/*.md", ['compile'])
  gulp.watch("./lib/*", ['compile'])
})

gulp.task('default', ['server'])