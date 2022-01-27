const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    plugins: [
        new ESLintPlugin({
          files: './resources/js/ReactApp/src/*.js',
        })
      ],
      resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
      },
}