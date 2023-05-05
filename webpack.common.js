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
        admins_pages_songs_create:'./src/admins/scripts/pages/songs/create/main.js',
        admins_pages_album_create:'./src/admins/scripts/pages/album/create/main.js',
        admins_pages_albums_songs_create:'./src/admins/scripts/pages/albums-songs/create/main.js',
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
            // pages songs
        new HtmlWebpackPlugin({
            title: 'Admin Song | Create - song',
            filename: 'admins/pages/songs/create-song.html',
            template: './src/admins/pages/songs/create/index.html',
            chunks: ['admins_pages_songs_create']
        }),
        new HtmlWebpackPlugin({
            title: 'Admin Song | Edit - songs',
            filename: 'admins/pages/songs/edit.html',
            template: './src/admins/pages/songs/edit/index.html',
            chunks: ['admins_pages_songs_edit']
        }),
        new HtmlWebpackPlugin({
            title: 'Admin Song | List - songs',
            filename: 'admins/pages/songs/list.html',
            template: './src/admins/pages/songs/list/index.html',
            chunks: ['admins_pages_songs_list']
        }),
            //

            // page album
        new HtmlWebpackPlugin({
            title: 'Admin Album | Create - album',
            filename: 'admins/pages/album/create-album.html',
            template: './src/admins/pages/album/create/index.html',
            chunks: ['admins_pages_album_create']
        }),
        new HtmlWebpackPlugin({
            title: 'Admin Album | Edit - album',
            filename: 'admins/pages/album/edit-album.html',
            template: './src/admins/pages/album/edit/index.html',
            chunks: ['admins_pages_album_edit']
        }),
        new HtmlWebpackPlugin({
            title: 'Admin Album | List - album',
            filename: 'admins/pages/album/list-album.html',
            template: './src/admins/pages/album/list/index.html',
            chunks: ['admins_pages_album_list']
        }),
            //

            // page albums-songs
        new HtmlWebpackPlugin({
            title: 'Admin Albums - Songs | Create-albums-songs',
            filename: 'admins/pages/albums-songs/create-albums-songs.html',
            template: './src/admins/pages/albums-songs/create/index.html',
            chunks: ['admins_pages_albums_songs_create']
        }),
        new HtmlWebpackPlugin({
            title: 'Admin Albums - Songs | Edit-albums-songs',
            filename: 'admins/pages/albums-songs/edit-albums-songs.html',
            template: './src/admins/pages/albums-songs/create/index.html',
            chunks: ['admins_pages_albums_songs_edit']
        }),
        new HtmlWebpackPlugin({
            title: 'Admin Albums - Songs | List-albums-songs',
            filename: 'admins/pages/albums-songs/list-albums-songs.html',
            template: './src/admins/pages/albums-songs/create/index.html',
            chunks: ['admins_pages_albums_songs_list']
        }),
            //

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
