var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin'); //打包html的插件
var ExtractTextPlugin = require("extract-text-webpack-plugin");   //打包css的插件
var uglifyjs = require('uglifyjs-webpack-plugin') // 压缩js

module.exports = {
    entry: {
        bundle: "./app/js/main.js"//已多次提及的唯一入口文件
    },
    output: {
        path: __dirname + "/public",//打包后的文件存放的地方
        filename: "js/bundle.[chunkHash:5].js"//打包后输出文件的文件名
    },

    //插件
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader",
                    publicPath: '../' // 路径公共配置
                })
            },
            // {
            //     test: /\.(png|jpg)$/,
            //     loader: 'file-loader?limit=100&name=img/[hash:8].[name].[ext]'

            // },
            {//处理 html 中通过 img 引入的图片，background-image 设置的图片不可以
                test: /\.html$/,
                use: "html-loader"
            },
            { // 图片资源的加载及压缩
                test: /\.(png|jpg|gif|svg)$/i,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: '/[hash:8].[name].[ext]', // 输入的图片路径
                        outputPath: 'img' // 图片公共文件夹
                    }
                },
                { // 压缩图片用的 loader
                    loader: 'image-webpack-loader'
                }
                ]
            },
            {
                test: /\.js$/,  
                exclude: /node_modules/,  
                loader: 'babel-loader'    
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['bundle'], // 加载的js 
            filename: 'index.html', // 加载的html
            template: 'app/index.html'// 参照的模板
        }),
        // new ExtractTextPlugin({
        //     filename: 'css/[name].css',
        //     disable: false,
        //     allChunks: false
        // })
        new ExtractTextPlugin("css/index.css"),
        new uglifyjs()
    ]
}