module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
  };
};
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ["./assets/fonts/"],
};
