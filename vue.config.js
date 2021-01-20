module.exports = {
  outputDir: 'dist',   //build输出目录
  assetsDir: 'assets', //静态资源目录（js, css, img）
  lintOnSave: false, //是否开启eslint
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        // 修改 title
        args[0].title= 'PIM'
        return args
      })
  },
  devServer: {
    open: true, //是否自动弹出浏览器页面
    host: "localhost",
    port: '8081',
    https: false,
    hotOnly: false,
    proxy: {
        '/': {
            target: 'https://www.lemon1234.com', //API服务器的地址
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        }
    }
  }
}
