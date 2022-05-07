/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-var-requires */
// const AutoImport = require('unplugin-auto-import/webpack')
// const Components = require('unplugin-vue-components/webpack')
// const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
module.exports = {
  // devServer.proxy适用于本地开发使用，
  // 生成环境请用第三方代理软件，如nginx。
  // runtimeCompiler: true,
  publicPath: './',
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      // AutoImport({
      //   resolvers: [ElementPlusResolver()]
      // }),
      // Components({
      //   resolvers: [ElementPlusResolver()]
      // })
      new PrerenderSPAPlugin({
        // 生成文件的路径，也可以与webpakc打包的一致。
        // 下面这句话非常重要！！！
        // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
        staticDir: path.join(__dirname, 'dist'),
        // 对应自己的路由文件，比如a有参数，就需要写成 /a/param1。
        routes: ['/layout', '#/home', '#/search', '#/data', '#/ventureCapital', '#/group', '#/vip', '#/consulting'],
        // 这个很重要，如果没有配置这段，也不会进行预编译
        renderer: new Renderer({
          inject: {
            foo: 'bar'
          },
          headless: false,
          // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
          renderAfterDocumentEvent: 'render-event',
          renderAfterTime: 10000, // 超时时间
          timeout: 0,
          maxConcurrentRoutes: 20, // 打包页面的最大数
          navigationParams: {
            timeout: 0
          }
        })
      })
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
