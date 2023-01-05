import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {colorPalates} from 'theme';
import commonStyle from 'utils/common-style/commonStyle';

interface LoaderProps {
  color?: string;
}

const LoadingContainer = ({color}: LoaderProps) => {
  return (
    <View style={commonStyle.containerCenter}>
      <ActivityIndicator
        animating={true}
        size="small"
        color={color || colorPalates.AppTheme.primary}
      />
    </View>
  );
};

export default LoadingContainer;
