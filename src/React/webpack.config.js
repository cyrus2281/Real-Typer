const path = require('path');

module.exports = {
  entry: './src/index.ts',
  mode: 'production',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'real-typer-react.js',
    sourceMapFilename: `real-typer-react.js.map`,
    libraryTarget: 'umd',
    library: 'MediaQuery',
    globalObject: 'this',
  },
  optimization: {},
  devtool: 'source-map',
  resolve: {
    modules: [path.resolve('src'), 'node_modules'],
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: [/\.ts$/, /\.tsx$/],
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
