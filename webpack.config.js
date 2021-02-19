module.exports = {
  entry: './src/app.js',
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
      },
      // {
      //   test: /\.(scss)$/,
      //   use: [
      //     {
      //       // Interprets `@import` and `url()` like `import/require()` and will resolve them
      //       loader: 'css-loader',
      //       options: {
      //         sourceMap: true
      //       }
      //     },
      //     {
      //       // Loader for webpack to process CSS with PostCSS
      //       loader: 'postcss-loader',
      //       options: {
      //         postcssOptions: {
      //           plugins: function () {
      //             return [
      //               require('precss'),
      //               require('autoprefixer')
      //             ];
      //           }
      //         }
      //       }
      //     },
      //     {
      //       // Loads a SASS/SCSS file and compiles it to CSS
      //       loader: 'sass-loader',
      //       options: {
      //         sassOptions: {
      //           sourceMap: true,
      //           includePaths: ['./node_modules']
      //         }
      //       }
      //     }
      //   ]
      // }
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
