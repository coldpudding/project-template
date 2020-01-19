const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');


module.exports = {
  entry: {
    index: path.resolve(__dirname, "../src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "main.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use:
          'file-loader'
      },
      {
        test: /\.scss$/,
        use: extractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
        // use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template:'./index.html'
      // filename:'./dist/index.html'
    }),
    new extractTextWebpackPlugin('style.css'),
    new SpritesmithPlugin({
      // 目标小图标            
      src: {
        //下面的路径，根据自己的实际路径配置
        cwd: path.resolve(__dirname, '../src/assets'),
        glob: '*.png'
      },
      // 输出雪碧图文件及样式文件            
      target: {//下面的路径，根据自己的实际路径配置
        image: path.resolve(__dirname, '../static/sprite.png'),
        css: path.resolve(__dirname, '../src/scss/sprite.css')
      },
      // 样式文件中调用雪碧图地址写法            
      apiOptions: {// 这个路径根据自己页面配置           
        cssImageRef: '../../static/sprite.png',
        padding:6
      },
      spritesmithOptions: {
        algorithm: 'top-down'
      }
    })
  ]
}