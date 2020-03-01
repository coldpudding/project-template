const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');


module.exports = {
  //入口文件路径
  entry: {
    index: path.resolve(__dirname, "../src/index.js")
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
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      //解释图片文件
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: 'file-loader'
      },
      //解析sass文件
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  //插件
  plugins: [
    //输出index.html文件
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    // 输出雪碧图
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
        padding: 6
      }
    }),
    // 输出style.css文件
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ]
}