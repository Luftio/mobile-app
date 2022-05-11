module.exports = function (api) {
  api.cache(true);
  return {
    ignore: [new RegExp("d3-array/dist/d3-array.js")],
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
      [
        "module-resolver",
        {
          alias: {
            "~/src": "./src",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
