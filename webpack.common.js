const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        mymusic: './src/scripts/pages/mymusic/main.js',
        discover: './src/scripts/pages/discover/main.js',
        login: './src/scripts/pages/login/main.js',
        middleware: './src/scripts/pages/login/middleware.js',
        zingchat: './src/scripts/pages/zingchat/main.js',
        album: './src/scripts/pages/album/main.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'mymusic',
            filename: 'mymusic.html',
            template: './src/pages/mymusic/index.html',
            chunks: ['mymusic']
        }),
        new HtmlWebpackPlugin({
            title: 'discover',
            filename: 'index.html',
            template: './src/pages/discover/index.html',
            chunks: ['discover']
        }),
        new HtmlWebpackPlugin({
            title: 'zingchat',
            filename: 'zingchat.html',
            template: './src/pages/zingchat/index.html',
            chunks: ['zinghchat']
        }),
        new HtmlWebpackPlugin({
            title: 'Singer',
            filename: 'singer.html',
            template: './src/pages/singer/index.html',
            chunks: ['singer']
        }),
        new HtmlWebpackPlugin({
            title: 'Album',
            filename: 'album.html',
            template: './src/pages/album/index.html',
            chunks: ['album']
        }),
        new HtmlWebpackPlugin({
            title: 'Login',
            filename: 'login.html',
            template: './src/pages/login/index.html',
            chunks: ['login']
        }),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader', // 3.Inject styles into DOM
                    'css-loader',   // 2.Turns css into commonjs
                ]
                // "css-loader" khi nó tìm thất file css thì nó sẽ biên dịch file css đó thành file javascript
                // và sau đó nó được inject vào dome thông qua "style-loader"
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: "[name].[hash].[ext]",
                        outputPath: "images"
                    }
                }
            },
        ]
    }
}
