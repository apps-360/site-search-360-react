const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/SiteSearch360.js',
  output: {
    path: path.resolve('lib'),
    filename: 'SiteSearch360.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
      }
    ],
  },
  resolve: {
    alias: {
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    }
  },
  plugins: [
	  new CopyPlugin({
		  patterns: [
			  {
				  from: path.resolve(__dirname, 'src', 'SiteSearch360.d.ts'),
				  to: path.resolve(__dirname, 'lib', 'SiteSearch360.d.ts'),
				  flatten: true
			  }
		  ]
	  })
  ],
  externals: {
    // Don't bundle react or react-dom      
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "React"
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "ReactDOM",
      root: "ReactDOM"
    }
  }
};