const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const clientConfig = {
    entry: {
        contentScript: "./src/content-scripts/content-script.js",
        popup: "./src/popup/popup.js",
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    mode: "development",
    watch: true,
    devtool: "source-map",
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "static",
                    to: "static",
                    globOptions: {
                        ignore: ["**/manifest.json"],
                    },
                },
                {
                    from: "static/manifest.json",
                    to: "manifest.json",
                },
            ],
        }),
    ],
};

module.exports = [clientConfig];
