const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
console.log("wasm used");
module.exports = {
    mode: 'production',
    plugins: [
        new webpack.NormalModuleReplacementPlugin(/typeorm$/, function (result) {
            result.request = result.request.replace(/typeorm/, "typeorm/browser");
        }),
        new webpack.ProvidePlugin({
            'window.SQL': 'sql.js'
        }),
        // Copy the wasm file to the output dir
        new CopyPlugin({
            patterns: [
                { from: path.resolve('node_modules/sql.js/dist/sql-wasm.wasm'),info: { minimized: true },},
            ]
        }),
    ],
    resolve: {
        fallback: {
          fs: false,
          crypto: false,
          path: require.resolve("path-browserify")
        }
    }
};