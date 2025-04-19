const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    admin: './admin.js',
    quiz: './quiz.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    clean: true,
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.json$/,
        type: 'json'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      template: './admin.html',
      filename: 'admin.html',
      chunks: ['admin']
    }),
    new HtmlWebpackPlugin({
      template: './quiz.html',
      filename: 'quiz.html',
      chunks: ['quiz']
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'database',
          to: 'database',
          globOptions: {
            ignore: ['**/*.md']
          }
        },
        {
          from: 'styles.css',
          to: 'styles.css'
        }
      ]
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    compress: true,
    port: 8080,
    open: true,
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@database': path.resolve(__dirname, 'database')
    }
  }
}; 