module.exports = function (api) {
  api.cache(true);
  return {
    ignore: [new RegExp("d3-array/dist/d3-array.js")],
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "~/src": "./src",
          },
        },
      ],
    ],
  };
};
