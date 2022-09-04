const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
    mode: "production",
    devtool: 'inline-source-map',
    entry: {
        background: path.resolve(__dirname, "..", "src", "background.ts"),
        contentPage: path.resolve(__dirname, "..", "src", "contentPage.ts"),
    },
    output: {
        path: path.join(__dirname, "../dist"),
        filename: "[name].js",
        clean: true
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: ".", to: ".", context: "public" }]
        }),
    ],
};