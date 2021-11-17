const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

//const illumina = path.resolve(__dirname, "./node_modules/@illumina-design-system/");

module.exports = ({ mode }) => {
  return {
    mode,
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      })
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    },
    devtool: mode === 'development' ? 'source-map' : 'none'
  };
};
