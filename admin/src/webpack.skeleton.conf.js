"use strict";

const path = require("path");
const merge = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = merge({
  target: "node",
  devtool: false,
  entry: {
    app: resolve("./entry-skeleton.js")
  },
  output: Object.assign(
    {},
    {
      libraryTarget: "commonjs2"
    }
  ),
  externals: nodeExternals({
    whitelist: /\.css$/
  }),
  plugins: []
});
