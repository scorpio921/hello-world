module.exports = {
  lintOnSave: false,
  devServer:{
    port:8222, // 启动端口
    open:true,  // 启动后是否自动打开网页,
    proxy: {
      '/api': {
          target: 'http://82.156.65.143:6622',
          changeOrigin: true,
          ws: true,
          pathRewrite: {
            '^/api': ''
          }
      }
  }
}

};
