module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./src/assets/fonts/'],
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null,
      },
    },
    'react-native-code-push': {
      platforms: {
        android: null,
      },
    },
  },
};
