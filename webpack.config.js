// webpack.config.js
const path = require('node:path');

module.exports = {
  entry: './src/index.tsx', // Update this to your entry file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devtool: 'source-map', // Optional: for debugging
  mode: 'development', // Change to 'production' for production build
};
