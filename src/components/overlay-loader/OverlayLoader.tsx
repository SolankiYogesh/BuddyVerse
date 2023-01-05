import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

const OverlayLoader = () => {
  return (
    <View style={OverlayLoaderStyle.loading}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default OverlayLoader;

const OverlayLoaderStyle = ScaledSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
