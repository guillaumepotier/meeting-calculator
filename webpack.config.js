var webpack = require('webpack')

module.exports =  {
  entry: __dirname + "/app/main.js",
  output: {
    path: __dirname + '/build',
    filename: 'app.js'
  },
  devtool: 'source-maps',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify("developpment") // developpment|production
      }
    })
  ],
  loaders: [
    {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015']
      }
    }
  ]
}
