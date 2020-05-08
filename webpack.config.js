const HtmlWebpackPlugn = require('html-webpack-plugin');

module.exports = () => ({
  entry: './src/index.jsx',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugn({
      template: './src/index.html',
    }),
  ],
});
