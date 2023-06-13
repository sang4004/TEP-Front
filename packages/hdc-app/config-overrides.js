/******************************************************************************
 * customize-cra load
    - override : react-app-rewired 를 통해 설정을 덮어쓰는? 함수
    - useBabelRc : Babel 플러그인을 사용 하겠다는것을 정의
    - addWebpackAlias : webpack.resolve.alias 를 정의
    - addWebpackPlugin : webpack array plugins 를 추가할수있음.
******************************************************************************/
const path = require("path");
const { useBabelRc, override, addWebpackAlias, addWebpackPlugin } = require("customize-cra");

// moment.js locale plugin
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");

// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

// addWebpackPlugin 대신 이런식으로 함수를 만들어서 array 에 push 하여 사용할 수 있다.
const addPlugin = config => {
    config.plugins.push(new MomentLocalesPlugin());
    return config;
};


module.exports = override(
    // webpack plugins : 플러그인 추가
    addPlugin,
    // use babelrc : .babelrc 파일 사용 환경설정
    useBabelRc(),
    // webpack plugins : 플러그인 추가
    // addWebpackPlugin(new BundleAnalyzerPlugin()),
    // webpack alias : 단축 경로 사용
    addWebpackAlias({
        ["@fuse_app"]: path.resolve(__dirname, "src/@fuse_app"),
        ["@fuse"]: path.resolve(__dirname, "src/@fuse"),
        ["@lodash"]: path.resolve(__dirname, "src/@lodash"),
        ["@history"]: path.resolve(__dirname, "src/@history"),
    })
);
