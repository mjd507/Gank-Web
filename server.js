/**
 * Created by mjd on 2017/3/27.
 */
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');

var server = new WebpackDevServer(webpack(config),{
    publicPath: config.output.publicPath
});

server.listen(3000, 'localhost', function(err) {
    if (err) {
        return console.log(err);
    }
    return console.log('listening at locahost:3000...');
})