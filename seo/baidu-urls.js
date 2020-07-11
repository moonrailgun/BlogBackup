// https://ziyuan.baidu.com/linksubmit/index?site=http://www.moonrailgun.com/
const inquirer = require("inquirer");
const convert = require("xml-js");
const fs = require("fs");
const path = require("path");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const site = "http://www.moonrailgun.com/";
const tokenCachePath = path.resolve(__dirname, "./.baidu-token");
const sitemapPath = path.resolve(__dirname, "../public/sitemap.xml");

// 生成文件
function generateUrls() {
  const sites = convert.xml2js(fs.readFileSync(sitemapPath), { compact: true });
  const urlset = sites.urlset.url;
  const list = urlset.map((item) => ({
    loc: item.loc._text,
    lastmod: item.lastmod._text,
  }));

  console.log("Generate urls link:", list.length);

  return list.map((item) => item.loc).join("\n");
}

console.log(
  `在 https://ziyuan.baidu.com/linksubmit/index?site=${site} 查看相关信息`
);
console.log("请确保在提交前已生成sitemap文件:", sitemapPath);

inquirer
  .prompt([
    {
      type: "input",
      name: "site",
      message: "百度站点",
      default: site,
    },
    {
      type: "input",
      name: "token",
      message: "百度Token",
      default: fs.existsSync(tokenCachePath)
        ? fs.readFileSync(tokenCachePath, { encoding: "utf8" })
        : undefined,
    },
  ])
  .then((answers) => {
    const { site, token } = answers;

    // 缓存token
    fs.writeFileSync(tokenCachePath, token);

    const urls = generateUrls();

    const target =
      "http://data.zz.baidu.com/urls?site=" + site + "&token=" + token;

    console.log("send links to:", target);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", target, false);
    xhr.setRequestHeader("Content-type", "text/plain");
    xhr.onload = function () {
      console.log(this.responseText);
    };
    xhr.send(urls);
  });
