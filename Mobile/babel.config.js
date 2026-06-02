module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      // This forces Babel to inline environment variables early in the build pipeline
      'transform-inline-environment-variables',
      'react-native-reanimated/plugin',
    ],
  };
};