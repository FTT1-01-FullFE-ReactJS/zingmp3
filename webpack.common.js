const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: {
        mymusic: './src/scripts/pages/mymusic/main.js',
        discover: './src/scripts/pages/discover/main.js',
        login: './src/scripts/pages/login/main.js',
        middleware: './src/scripts/pages/login/middleware.js',
        zingchat: './src/scripts/pages/zingchat/main.js',
        album: './src/scripts/pages/album/main.js',
        // Admin
        admin_songs_list: './src/admin/scripts/pages/songs/list/main.js',
        admin_songs_create: './src/admin/scripts/pages/songs/create/main.js',
        admin_songs_edit: './src/admin/scripts/pages/songs/edit/main.js',
    },
    plugins: [
        new Dotenv(),
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
        // ADMIN
        new HtmlWebpackPlugin({
            title: 'Admin Song | List',
            filename: 'admin/songs/list.html',
            template: './src/admin/pages/songs/list/index.html',
            chunks: ['admin_songs_list']
        }),
        new HtmlWebpackPlugin({
            title: 'Admin Song | Create',
            filename: 'admin/songs/create.html',
            template: './src/admin/pages/songs/create/index.html',
            chunks: ['admin_songs_create']
        }),
        new HtmlWebpackPlugin({
            title: 'Admin Song | Edit',
            filename: 'admin/songs/edit.html',
            template: './src/admin/pages/songs/edit/index.html',
            chunks: ['admin_songs_edit']
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
