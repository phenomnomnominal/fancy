const path = require('path');
const webpack = require('webpack');

module.exports = function (env) {
    return {
        plugins: [
            new webpack.NormalModuleReplacementPlugin(/@phenomnomnominal\/fancy/, function (resource) {
                // resource.request = require.resolve('@phenomnomnominal/fancy').replace('index.js', 'index.prod.js');
            })
        ],
        entry: path.resolve(__dirname, './src/index.js'),
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, './dist')
        }
    };
};
