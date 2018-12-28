const path = require("path");
const SkeletonWebpackPlugin = require("vue-skeleton-webpack-plugin");
function resolve(dir) {
  return path.join(__dirname, "..", dir);
}
module.exports = {
  // 选项...
  assetsDir: "assets",
  indexPath: "index.html",
  filenameHashing: true,
  pages: undefined,
  runtimeCompiler: false,
  transpileDependencies: [],
  crossorigin: undefined,
  integrity: false,
  // 基本路径
  baseUrl: "/",
  // 输出文件目录
  outputDir: "dist",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // use the full build with in-browser compiler?
  // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  //compiler: true,
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: () => {},
  configureWebpack: {
    plugins: [
      new SkeletonWebpackPlugin({
        webpackConfig: require("./src/webpack.skeleton.conf"),
        quiet: true
      })
    ]
  },
  // vue-loader 配置项
  // https://vue-loader.vuejs.org/en/options.html
  //vueLoader: {},
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: false,
    // 开启 CSS source maps?
    sourceMap: true,
    // css预设器配置项
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require("os").cpus().length > 1,
  // 是否启用dll
  // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
  //dll: true,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    open: process.platform === "darwin",
    host: "127.0.12.0",
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      "/api": {
        // 目标 API 地址
        target: "http://192.168.6.163:8080/",
        // 如果要代理 websockets
        ws: true,
        // 将主机标头的原点更改为目标URL
        changeOrigin: false
      }
    } // 设置代理
    // before: app => {}
  },
  // 第三方插件配置
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "")]
    }
  }
};
