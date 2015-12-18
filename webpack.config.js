/**
 * webpack.config.js
 */

module.exports = {

    entry: {
        app: ["./public/js/client.js"]
    },

    output: {
        filename: "./build/bundle.js"
    },

    module: {
        loaders: [
          { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: "babel?stage=0" },
          { test: /\.css$/, loader: "style-loader!css-loader" },
          { test: /\.(png|jpg|gif)$/, loader: "url-loader?limit=8192"},
          { test: /\.json$/, loader: "json-loader" },
          { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&minetype=application/font-woff" },
          { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?name=[name].[ext]" },
          { test: /node_modules\/auth0-lock\/.*\.js$/,
            loaders: [
                "transform-loader/cacheable?brfs",
                "transform-loader/cacheable?packageify"
            ]
          },
          { test: /node_modules\/auth0-lock\/.*\.ejs$/,
            loader: "transform-loader/cacheable?ejsify"
          }
        ]
    },

    resolve: {
        extensions: ["", ".js", ".jsx", ".json"]
    }
};
