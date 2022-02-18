
// const AutoImport = require('unplugin-auto-import/webpack')
// const Components = require('unplugin-vue-components/webpack')
// const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = {
  // devServer.proxy适用于本地开发使用，
  // 生成环境请用第三方代理软件，如nginx。
  // runtimeCompiler: true,
  publicPath: './',
  configureWebpack: {
    plugins: [
      // AutoImport({
      //   resolvers: [ElementPlusResolver()]
      // }),
      // Components({
      //   resolvers: [ElementPlusResolver()]
      // })
    ]
  },

  devServer: {
    port: 8081, // 本机端口号
    host: 'localhost', // 本机主机名
    https: false, // 协议
    open: false, // 启动服务器时自动打开浏览器访问
    proxy: {
      '/api': {
        // 目标服务器,代理访问到http://localhost:8888
        target: 'http://47.97.252.122:8812/api',
        changOrigin: true, // 开启代理
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
