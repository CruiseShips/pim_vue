const path = require("path");

module.exports = {
  outputDir: "dist", //build输出目录
  assetsDir: "assets", //静态资源目录（js, css, img）
  lintOnSave: false, //是否开启eslint
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      // 修改 title
      args[0].title = "PIM";
      return args;
    });
  },
  devServer: {
    open: true, //是否自动弹出浏览器页面
    host: "localhost",
    port: 80,
    https: false,
    hotOnly: false,
    proxy: {
      "/admin": {
        target: "http://127.0.0.1:8080", //请求的接口
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          "^/admin": "/admin"
        }
      }
    }
  },
  // 加上这个就可以在项目中使用 @
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve("src")
      }
    }
  }
};
