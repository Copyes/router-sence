const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");
const config = require("./build/webpack.env.config.js");

config.entry.unshift("");

const compiler = webpack(config);

const server = new webpackDevServer(compiler, {});

server.listen(9999);
