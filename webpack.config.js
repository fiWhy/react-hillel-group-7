const HtmlWebpackPlugn = require('html-webpack-plugin');

module.exports = () => ({
  entry: ['./src/index.jsx', './src/style.scss'],
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
      {
        test: /\.s[ca]ss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugn({
      template: './src/index.html',
    }),
  ],
});
