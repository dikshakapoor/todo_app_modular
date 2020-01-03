// const path = require("path")
// const HtmlWebpackPlugin = require("html-webpack-plugin")
// module.exports = {
//     entry: ["./src/js/index"],
//     output: {
//         path: path.resolve(__dirname, "dist"),
//         filename: "bundle.js",
//         publicPath: "/"
//     },
//     devServer: {
//         // publicPath: '/dist',
//         //  contentBase: './src/js',
//         contentBase: '/dist',
//         inline: false,
//     },
//     plugins: [

//         new HtmlWebpackPlugin({
//             filename: 'index.html',
//             template: "./src/index.html",

//         })
//     ],
//     module: {

//         // loaders: [{
//         //     test: /\.js$/,
//         //     loader: 'babel-loader',
//         //     query: {
//         //         presets: ['es2015']
//         //     }

//         // }],
//         rules: [{
//             test: /\.js$/,
//             exclude: /node_module/,
//             use: {
//                 loader: "babel-loader",
//                 options: {
//                     presets: ['@babel/preset-env', '@babel/preset-react']
//                 }
//             }
//         },
//             // {
//             //     test: /\.jsx?$/,
//             //     exclude: /(node_modules|bower_components)/,
//             //     loader: 'babel-loader',
//             //     query: {
//             //         presets: ['2015']
//             //     }
//             // }
//         ],
//     }


// }

const path = require("path")

module.exports = {
    entry: "./src/js/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/"
    },
    devServer: {
        publicPath: '/dist',
        contentBase: './src/js',
    },
    rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        }
    ]

};