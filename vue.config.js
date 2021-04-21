module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        // target: 'http://82.156.186.60:3000'1,
        changeOrigin: true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        ws: true,
        pathRewrite: {
          // 路径重写，
          '^/api': '', // 替换target中的请求地址，也就是说/api=/target，请求target这个地址的时候直接写成/api即可。
        },
      },
    },
  },
};
