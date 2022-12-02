const { useBabelRc, override, addWebpackAlias, addWebpackPlugin } = require("customize-cra");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const path = require("path");

module.exports = override(
    useBabelRc(),
    addWebpackAlias({
        ['@fuse_app'] : path.resolve(__dirname, "src/@fuse_app"),
        ['@fuse'] : path.resolve(__dirname, "src/@fuse"),
        ['@lodash'] : path.resolve(__dirname, "src/@lodash"),
        ['@history'] : path.resolve(__dirname, "src/@history"),
    }),
);
// addWebpackPlugin(new BundleAnalyzerPlugin()),