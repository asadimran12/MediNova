module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      // If you are using Reanimated, keep this line. 
      // If not, remove it. It must always be listed LAST.
      "react-native-reanimated/plugin",
    ],
  };
};