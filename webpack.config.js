module.exports = {
  entry: './src/ts/main.ts',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /.ts$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
      // {
      //   test: /\.m?js$/,
      //   exclude: /node_modules/,
      //   use: {
      //       loader: 'babel-loader',
      //       options: {
      //           presets: ['@babel/preset-env']
      //       }
      //   }
      // }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  }
}
