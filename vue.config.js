const path = require("path");
// 依赖关系可视化
// *************webpack需要引入的包*************************
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
// 压缩
const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin"); // 用来压缩优化js文件
// 抽离css样式
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 用来压缩分离出来的css样式
let OptimizeCss = require("optimize-css-assets-webpack-plugin");
// 生产环境
const isProduction = process.env.NODE_ENV != "development";
// 引入文件
function resolve(dir) {
  // 路径可能与你的项目不同
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: isProduction ? "./" : "/", // 基本路径
  outputDir: "dist", // 输出文件目录
  lintOnSave: true, // 生产环境禁用eslint-loader
  productionSourceMap: false, // 生产环境是否生成sourceMap文件
  filenameHashing: true, //文件hash
  // 启用并行化 默认的并发数os.cpus().length -1
  parallel: require("os").cpus().length > 1,
  runtimeCompiler: true, // 关键点在这
  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false
    }
  },
  transpileDependencies: ["quasar"],
  // webpack配置
  configureWebpack: config => {
    if (isProduction) {
      config.plugins.push(
        new CompressionPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: /\.js$|\.html$|\.css/,
          threshold: 10240, // 只有大小大于该值的资源会被处理 10240
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false // 删除原文件
        }),
        // 抽离css样式
        new MiniCssExtractPlugin({
          filename: "css/[name].css" // 抽离出来样式的名字
        }),
        new BundleAnalyzerPlugin()
      );
      config.optimization = {
        //打包 公共文件
        splitChunks: {
          // inital 只操作同步的 all 所有的 async 异步的
          chunks: "all", // 默认支持异步的代码分割 import()
          minSize: 30000, // 文件超过30k 就会抽离
          maxSize: 0,
          minChunks: 2, // 最少模块引用2次才抽离
          maxAsyncRequests: 5, // 最多5个请求
          maxInitialRequests: 3, // 最多首屏加载3个请求
          automaticNameDelimiter: "-", // xxx~a~b
          automaticNameMaxLength: 30, // 最长名字打大小
          name: true,
          // maxInitialRequests: 10,
          // minSize: 50000, // 依赖包超过20000bit将被单独打包
          cacheGroups: {
            vendor: {
              //node_modules内的依赖库
              chunks: "all",
              test: /[\\/](node_modules)[\\/]/, // 文件路径里面带有node_modules 都抽离出来做共通
              name: "vendor",
              minChunks: 1, //被不同entry引用次数(import),1次的话没必要提取
              maxInitialRequests: 5,
              minSize: 0,
              priority: 100
              // enforce: true?
            },
            quasar: {
              name: "chunk-quasar",
              priority: 20,
              test: /[\\/]node_modules[\\/]@quasar[\\/]/,
              chunks: "all"
            },
            xlsx: {
              name: "chunk-xlsx",
              priority: 20,
              test: /[\\/]node_modules[\\/]xlsx[\\/]/,
              chunks: "all"
            },
            cpexcel: {
              name: "chunk-cpexcel",
              priority: 20,
              test: /[\\/]node_modules[\\/]cpexcel[\\/]/,
              chunks: "all"
            },
            common: {
              // ‘src/js’ 下的js文件
              chunks: "all",
              test: /[\\/]src[\\/]js[\\/]/, //也可以值文件/[\\/]src[\\/]js[\\/].*\.js/,
              name: "common", //生成文件名，依据output规则
              minChunks: 2,
              maxInitialRequests: 5,
              minSize: 0,
              priority: 1
            },
            styles: {
              name: "styles",
              test: /\.(sa|sc|c)ss$/,
              chunks: "all"
              // enforce: true
            }
          }
        },
        minimize: true,
        // 优化项
        minimizer: [
          new OptimizeCss({
            // 默认是全部的CSS都压缩，该字段可以指定某些要处理的文件
            assetNameRegExp: /\.(sa|sc|c)ss$/g,
            // 指定一个优化css的处理器，默认cssnano
            cssProcessor: require("cssnano"),

            cssProcessorPluginOptions: {
              preset: [
                "default",
                {
                  discardComments: { removeAll: true }, //对注释的处理
                  normalizeUnicode: false // 建议false,否则在使用unicode-range的时候会产生乱码
                }
              ]
            },
            canPrint: true // 是否打印编译过程中的日志
          }), // 压缩css
          new UglifyJsPlugin({
            // 压缩js
            cache: true, // 是否用缓存
            parallel: true, // 并发打包
            sourceMap: false // es6 -> es5 转换时会用到
          })
        ]
      };
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@svg", resolve("./src/tdf/icons/svg"))
      .set("@componets", resolve("src/tdf/components"))
      .set("@folder-outside-request", resolve("src/tdf/utils")) // request的路径，为了动态配置模块中请求地址
      .set(
        "@folder-inside-views-common",
        resolve("src/tdf-sys/views/common/mixins")
      ) // 页面的配置
      .set("@folder-inside-utils", resolve("src/tdf-sys/utils")) // utils的路径-模块内部
      .set("@src", resolve("src")) // 根路径
      .set("tdf-sys", resolve("src/tdf-sys")); // 模块路径
    // config.module.rules.delete("svg"); // 重点:删除默认配置中处理svg,
    // 关闭 npm run build时 webpack性能提示
    config.performance.set("hints", false);
    // const svgRule = config.module.rule('svg')
    // svgRule.uses.clear()
    // config.module
    //   .rule("svg-sprite-loader")
    //   .test(/\.svg$/)
    //   .include.add(resolve("src/tdf/icons/svg")) // 处理svg目录
    //   .add(resolve("src/tdf/assets/tdf.svg")) // 处理svg目录
    //   .end()
    //   .use("svg-sprite-loader")
    //   .loader("svg-sprite-loader")
    //   .options({
    //     symbolId: "icon-[name]"
    //   });
    // config.performance
    //     .maxEntrypointSize(400000)
    //     .maxAssetSize(400000)
    //   生产环境配置
    if (isProduction) {
      // 删除预加载
      config.plugins.delete("preload");
      // 开启压缩代码
      config.optimization.minimize(true);
      // 分割代码
      config.optimization.splitChunks({
        chunks: "all"
      });
    }
  },
  // css 配置相关
  css: {
    // 是否使用css分离插件 ExtractTextPlugin 生产环境下是true,开发环境下是false
    extract: false,
    // 是否开启 CSS source maps 方便开发人员的错误定位 true打包时间大大增加
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      // 要全局使用的scss 变量、Mixin在这里引入（注：这类scss文件需要每个项目都放一份,这个配置也需要每个项目都写一份）
      sass: {
        //老版本是data，新版本是prependData
        prependData: `@import "@/tdf/styles/quasar.scss";
        @import "@/tdf/styles/quasar.variables.scss"; `
      }
    },
    // 启用 CSS modules for all css / pre-process.or files
    requireModuleExtension: true
  },
  devServer: {
    // 本示例项目未使用到
    proxy: {
      // 将所有以/api开头的请求代理到示例站点
      "/api": {
        target: "http://some.api.target.com:7070",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
