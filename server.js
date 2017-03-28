const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
console.log('start');
const config = require('./build/webpack.dev.config.js')

config.entry.unshift("webpack-dev-server/client?http://localhost:9999/")
const compiler = webpack(config)
const server = new WebpackDevServer(compiler, {})
server.listen(9999)