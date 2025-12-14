const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// IMPORTANT: "input" must point to where your global.css is located.
// Based on your screenshot, your file is inside the "app" folder.
module.exports = withNativeWind(config, { input: "./app/global.css" });