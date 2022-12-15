const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  // 设置全局样式调用
  css: {
    loaderOptions: {
      scss: {
        //prependData: `@import "~@/assets/common/css/ict_global.scss";`
        additionalData: `@import "~@/assets/common/ict_global.scss";`,
      },
    },
  },
  //设置标签栏logo
  pwa: {
    iconPaths: {
      favicon32: "logo.png",
      favicon16: "logo.png",
      appleTouchIcon: "logo.png",
      maskIcon: "logo.png",
      msTileImage: "logo.png",
    },
  },
  devServer: {
    port: 8888,
  },
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "static",
});

// css 属性指定了加载和处理 .scss 文件的选项，包括通过导入一个 SCSS 文件来设置全局样式。pwa 属性用于配置渐进式网络应用，包括指定不同设备上 logo 图像的路径。devServer 属性设置了开发服务器的端口号，publicPath 和 outputDir 属性分别指定项目的公共 URL 和输出目录。最后，assetsDir 属性指定静态资源应存储的目录。
