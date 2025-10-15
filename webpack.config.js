const path = require('path');

module.exports = {
  mode: 'development',
  entry: ['core-js/stable', 'regenerator-runtime/runtime', './src/jsx/app.jsx'],
  
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'public/dist'),
    publicPath: './dist/',
  },
  
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: '../assets/[name][ext]',
        },
      },
    ],
  },
  
  devServer: {
    port: 8080,
    static: {
      directory: path.join(__dirname, 'public'),
      watch: true,
    },
    devMiddleware: {
      writeToDisk: true,
    },
    open: true,
    historyApiFallback: true,
  },
  
  devtool: 'source-map',
  optimization: {
    minimize: true,
  },
};
