/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const basePlugins = [new CleanWebpackPlugin()];

module.exports = {
    mode: "production",
    entry: "./src/App.tsx",
    devtool: "source-map",
    context: resolve(__dirname, "../src"),
    output: {
        filename: "client.min.js",
        path: resolve(__dirname, "../dist"),
        publicPath: "/",
    },
    performance: {
        hints: false,
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                test: /\.json(\?.*)?$/i,
            }),
        ],
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "../src"),
        },
        extensions: [
            ".cjs",
            ".mjs",
            ".ts",
            ".tsx",
            ".js",
            ".json",
            ".jpeg",
            ".png",
            ".gif",
        ],
        modules: ["node_modules", "src"],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["babel-loader", "source-map-loader"],
                exclude: /node_modules/,
            },
            {
                test: /\.tsx?$/,
                use: ["babel-loader", "ts-loader"],
                exclude: /node_modules/,
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    "file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]",
                    "image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false",
                ],
            },
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: "javascript/auto",
            },
        ],
    },
    plugins: process.env.BUNDLE_ANALYZER
        ? [
              ...basePlugins,
              new BundleAnalyzerPlugin(
                  new BundleAnalyzerPlugin({
                      // "static" generates file instead of starting a web server
                      analyzerMode: "server",
                      analyzerHost: "localhost",
                      analyzerPort: 8888,
                      reportFilename: "report.html",
                      defaultSizes: "parsed",
                      openAnalyzer: true,
                      generateStatsFile: false,
                      statsFilename: "stats.json",
                      statsOptions: null,
                      logLevel: "info",
                  }),
              ),
          ]
        : basePlugins,
};
