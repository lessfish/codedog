# codedog

## demo

- [raw markdown file](https://raw.githubusercontent.com/hanzichi/hanzichi.github.io/master/test-case/codedog-demo/index.md)
- [markdown rendered result](https://github.com/hanzichi/hanzichi.github.io/blob/master/test-case/codedog-demo/index.md)
- [the result after using codedog](https://hanzichi.github.io/test-case/codedog-demo/index.html)

## usage

### basic usage

- `cd codedog`
- `npm install`
- `node cli xx.md`

### advanced usage

```
node cli xx.md width height
```

for example:

```
node cli fish.md 600 800
```

- width (the width of the code editor as well as the other code areas, default `900`)
- height (the height of the code editor, default `270`)

## cli

- `npm install -g codedog`
- `codedog xx.md` or `codedog xx.md width height`

## notice

- markdown2html
- work for html and css, **except javascript**, because it's complex to deal with dom operations inside iframes
- code snippets **whose lang is html** will become online editor
- click the `new page button` if you want to see the result in a new page  

## lisence

MIT
