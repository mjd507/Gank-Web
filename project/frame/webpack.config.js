var path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'build'), // 文件放至当前路径下的 public 文件夹
        filename: 'bundle.js',  // 将打包后的输出文件命名为 bundle.js
        publicPath: '/static/'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                include: path.join(__dirname, 'src')
            },
        ]
    },

    resolve: {
        extensions: ['.js', '.json']
    }
};