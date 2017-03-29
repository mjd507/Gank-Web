var path = require('path');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src'); //__dirname 中的src目录，以此类推
var BUILD_PATH = path.resolve(ROOT_PATH, 'build/'); //发布文件所存放的目录

module.exports = {
    entry: './src/index.js',
    output: {
        path: BUILD_PATH, // 文件放至当前路径下的 public 文件夹
        filename: 'bundle.js',  // 将打包后的输出文件命名为 bundle.js
        publicPath: '/static/' //编译好的文件，在服务器的路径,这是静态资源引用路径
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /^node_modules$/
            },
            {
                test: /\.css$/,
                exclude: /^node_modules$/,
                loader: 'style-loader!css-loader?modules'
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx', '.css'],
    }
};