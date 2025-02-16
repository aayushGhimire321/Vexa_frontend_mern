module.exports = {
    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: "pre",
          use: ["source-map-loader"],
          exclude: [/node_modules\/react-file-image-to-base64/, /node_modules\/timeago.js/],
        },
      ],
    },
  };
  