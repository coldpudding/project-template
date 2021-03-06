const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');

module.exports = {
  //入口文件路径
  entry: {
    index: path.resolve(__dirname, "../src/index.js"),
  },
  //输出文件路径
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "main.js"
  },
  //loader
  module: {
    rules: [
      //解释css文件
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      //解释图片文件
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: 'file-loader'
      },
      //解析sass文件
      {
        test: /\.scss$/,
        use: extractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  //插件
  plugins: [
    //输出index.html文件
    new htmlWebpackPlugin({
      template: './index.html'
    }),
    //输出style.css文件
    new extractTextWebpackPlugin('style.css'),
    //输出雪碧图
    new SpritesmithPlugin({
      //需要整合的小图标的文件夹和格式           
      src: {
        cwd: path.resolve(__dirname, '../src/assets'),
        glob: '*.png'
      },
      //输出雪碧图文件及样式文件            
      target: {
        //下面的路径，根据自己的实际路径配置
        image: path.resolve(__dirname, '../static/sprite.png'),
        css: path.resolve(__dirname, '../src/scss/sprite.css')
      },
      //样式文件中调用雪碧图地址写法            
      apiOptions: {
        cssImageRef: '../../static/sprite.png',
      },
      //雪碧图排列方式和间距
      spritesmithOptions: {
        algorithm: 'left-right',
        padding: 10
      }
    })
  ]
}