module.exports = {
  pwa: {
    name: "Debugify",
    themeColor: "#0277bd",
    msTileColor: "#000000",
    assetsVersion: "KmnAgxvbQ6",
    iconPaths: {
      favicon32: "img/icons/favicon-32x32.png",
      favicon16: "img/icons/favicon-16x16.png",
      appleTouchIcon: "img/icons/apple-touch-icon.png",
      maskIcon: "img/icons/safari-pinned-tab.svg",
      msTileImage: "img/icons/mstile-icon-144x144.png"
    },
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "src/service-worker.js"
    }
  },
  pluginOptions: {
    critical: {
      inline: true,
      base: "dist/",
      width: 1300,
      height: 900,
      minify: true,
      extract: true
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all"
          }
        }
      }
    }
  }
};
