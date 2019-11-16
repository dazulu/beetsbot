const path = require("path");

module.exports = {
  // Use prod optimisations
  mode: "production",

  // To target node environment
  target: "node",

  // App entry point for compilation target
  entry: "./src/index.js",

  // Target for compiled bundle
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },

  // Including bufferutil & utf-8-validate removes superfluous warnings
  externals: ["bufferutil", "utf-8-validate"]
};
