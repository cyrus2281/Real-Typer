module.exports = {
  mode: "production", 
  entry: "./src/RealTyper.js",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
    ],
  },
  output: {
    filename: "real-typer.min.js", 
    library: 'RealTyper',
    publicPath: '/dist/'
  },
};
