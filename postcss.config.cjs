module.exports = (config) => {
  const isProduction = config.env === "production";
  const postcssJitProps = require("postcss-jit-props");
  const OpenProps = require("open-props");

  const postcssPresetEnv = require("postcss-preset-env");
  const plugins = [postcssJitProps(OpenProps), postcssPresetEnv()];

  if (isProduction) {
    plugins.push(require("cssnano"));
  }

  return {
    plugins,
    map: {
      inline: false,
    },
  };
};
