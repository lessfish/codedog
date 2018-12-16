# codedog

## 初衷

个人比较习惯用 markdown 记一些东西，有时候需要插入一些在线小 demo，最好还能在线编辑，用类似 [codepen](https://codepen.io/) 引入的话显得有些大材小用，而且第三方不保险，便希望有一种方式，能在 markdown 中写 html，并且不会相互干扰，遂有此项目

我们可以比较下原始的 markdown 文件和用 codedog 二次生成后的文件：

- [原始的 markdown 文件](https://github.com/hanzichi/codedog/blob/master/example/example.md)
- [codedog 二次生成后的 html 文件](https://hanzichi.github.io/codedog/example/example.html)

另外，这个项目是我为 [css-secrets](https://github.com/hanzichi/css-secrets) 特意创造的，更多应用可以点 [这里](https://github.com/hanzichi/css-secrets/blob/master/README.md) 查看

## 用法

该项目使用非常简单，支持模块引用和全局引用，个人推荐全局引用方式

### 本地安装

```bash
$ npm install
$ npm link
```

### npm 安装

```bash
$ npm install codedog -g
```

### 应用

```bash
$ codedog xx.md
$ codedog xx.md width height
```

没错，codedog 几乎不提供任何参数，唯二提供的两个可选参数是在线 demo 的宽度和高度：

- width (the width of the code editor as well as other code blocks, default is 100% of its parent node's width)
- height (the height of the code editor, default to `270px`）

## 开发

```bash
$ npm install
$ npm run dev
```

接下去在 `lib` 和 `example` 两个文件夹中修改文件，codedog 会自动编译 example.md 文件，生成新的 example.html 文件并且自动刷新打开的页面

## 注意事项

- 该项目用于从 markdown 生成 html，并提供某些在线编辑／预览，如果没有这个需求，说明你不需要
- **markdown 中标注为 `html` 的代码块会被 codedog 解析**，并生成在线 demo，其余代码块不会解析
- 被解析的代码块，支持内联 css 和 js，支持绝对路径的外链 css 和 js
- 点击新页面打开，会在新的页面打开在线 demo
- 页面 title 默认为第一次出现的一级标题，且 markdown 文件中一级标题只允许出现一次，且默认一级标题肯定早于其他二级标题、三级标题等出现
- 不支持移动端，个人觉得移动端上编辑代码&预览效果不方便，故不提供支持

## lisence

MIT
