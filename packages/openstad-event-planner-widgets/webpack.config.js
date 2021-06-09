const path = require('path');

module.exports = {
  target: ['web', 'es2015'],
  entry: './src/index.jsx',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  output: {
    filename: 'event-manager.js',
    path: path.resolve(__dirname, 'public/js'),
    library: 'savvycodes',
    libraryTarget: 'window',
    environment: {
      arrowFunction: false,
      const: false,
    },
  },
};
