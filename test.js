const { getHTML, stripScript } = require("./index");
getHTML("https://www.baidu.com").then($ => {
  console.log($("title").text());
});