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
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        // exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  output: {
    filename: 'always.js',
    path: path.resolve(__dirname, 'public/js'),
    environment: {
      arrowFunction: false,
      const: false,
    },
  },
  optimization: {
    minimize: false,
  },
};
