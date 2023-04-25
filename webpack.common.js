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
        // ADMIN
        admins_pages_songs_create:'./src/admins/scripts/pages/songs/create/main.js'
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
            title: 'Admin Song | Create',
            filename: 'admins/pages/songs/create.html',
            template: './src/admins/pages/songs/create/index.html',
            chunks: ['admins_pages_songs_create']
        }),
        new HtmlWebpackPlugin({
            title: 'Admin Song | Edit',
            filename: 'admins/pages/songs/edit.html',
            template: './src/admins/pages/songs/edit/index.html',
            chunks: ['admins_pages_songs_edit']
        }),
        new HtmlWebpackPlugin({
            title: 'Admin Song | Create',
            filename: 'admins/pages/songs/list.html',
            template: './src/admins/pages/songs/list/index.html',
            chunks: ['admins_pages_songs_list']
        }),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
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
