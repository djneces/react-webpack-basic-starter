const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '',
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        //js files
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        //css files
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          //injecting into html
          { loader: 'style-loader' },
          //imports
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: { localIdentName: '[name]__[local]__[hash:base64:5]' },
            },
          },
          {
            loader: 'postcss-loader',
            options: { ident: 'postcss', plugins: () => [autoprefixer()] },
          },
        ],
      },
      //images
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader?limit=8000&name=images/[name].[ext]',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
  ],
};
