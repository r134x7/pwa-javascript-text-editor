const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({ // to generate the HTML file and inject the bundles
        template: "./index.html",
        title: "J.A.T.E.",
        favicon: "./favicon.ico" // method to add the favicon to the html
      }),

      new InjectManifest({ // injects the service worker
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),

      new WebpackPwaManifest({ // creates the manifest.json file
        fingerprints: false,
        inject: true,
        name: "Just Another Text Editor",
        short_name: "J.A.T.E.",
        description: "Takes notes with JavaScript syntax highlighting.",
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 512], // only using 96x96 and 512x512 sizes
            destination: path.join('assets', 'icons'),
          },
        ],

      })
    ],

    module: {
      rules: [
        {
          test: /\.css$/i, // searches every CSS file
          use: ["style-loader", "css-loader"], // uses these loaders which will have the CSS in the JavaScript bundle
        },
        {
          test: /\.m?js$/, // searches for every JS or MJS file
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader', // using babel-loader to transpile code into ES5
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/transform-runtime'],
            },
          },
        }
      ],
    },
  };
};
