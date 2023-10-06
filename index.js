const request = require("postman-request");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");

/**
 * 获取HTML
 * @param url
 * @param options:{headers: Object, encoding: string, timeout: number}
 * @returns {Promise<any>}
 */
module.exports.getHTML = (url, options) => {
  console.log("processing", url);
  if (options === undefined) options = {};
  return new Promise(resolve => {
    send();
    function send() {
      request.get(
        {
          url: url,
          encoding: null,
          // headers: {
          //   Cookie: options.cookie
          // },
          headers: options.headers,
          timeout: options.timeout === undefined ? 2000 : options.timeout
        },
        (error, response, body) => {
          if (error && error.code === "ETIMEDOUT") {
            console.warn("ERROR: timeout, retry...");
            send();
          } else {
            if (body) {
              const htmlStr = iconv.decode(body, options.encoding || "utf-8");
              const $ = cheerio.load(htmlStr, { decodeEntities: false });
              console.log("parsed", url);
              resolve($);
            } else {
              console.warn("ERROR: body is empty, retry...");
              send();
            }
          }
        }
      );
    }
  });
};

/**
 * 去除特殊字符
 * @param s
 * @returns {string}
 */
module.exports.stripScript = s => {
  let pattern = new RegExp(
    "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"
  );
  let rs = "";
  for (let i = 0; i < s.length; i++) {
    rs = rs + s.substr(i, 1).replace(pattern, "");
  }
  console.log(rs);
  return rs;
};
