module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["@babel/plugin-transform-flow-strip-types"],
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      ["@babel/plugin-transform-class-static-block"],
      ["@babel/plugin-transform-class-properties", { loose: true }],
      "babel-plugin-transform-typescript-metadata",
      "babel-plugin-parameter-decorator",
      "nativewind/babel",
      // ...other plugins
    ],
  };
};
