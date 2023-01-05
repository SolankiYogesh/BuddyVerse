module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          src: './src',
          assets: './src/assets',
          components: './src/components',
          navigation: './src/navigation',
          reduxWrapper: './src/redux-wrapper',
          screen: './src/screens',
          apiWrapper: './src/api-wrapper',
          theme: './src/theme',
          utils: './src/utils',
          models: './src/models',
          services: './src/services',
        },
      },
    ],
  ],
};
