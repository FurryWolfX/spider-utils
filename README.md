易于使用的爬虫工具包，主要解决了 `cheerio` 爬虫的中文编码问题，并且封装更易于使用，目前私人使用中。
允许任何人以任何方式使用，但本人不承担代码使用后的风险。

# 方法

## `getHTML(url: string, options: {headers: Object, encoding: string, timeout: number})`

将返回一个 `Promise`, 该 `Promise` 如果成功 `resolve` 将得到一个 `$` (cheerio对象)。

## stripScript(s: string)

用于过滤特殊字符

# 使用方式

```javascript
const { getHTML, stripScript } = require("@wolfx/spider-utils");
getHTML(...).then($ => {
  console.log($("title").text());
});
```