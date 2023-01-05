import * as React from 'react';
import {View, Text, Image} from 'react-native';
import {images} from 'theme';
import SplashScreenStyle from './SplashScreenStyle';

const SplashScreen = () => {
  return (
    <View style={SplashScreenStyle.container}>
      <Image
        style={SplashScreenStyle.greenLyncLogo}
        source={images.greenLyncLogo}
      />
      <Text style={SplashScreenStyle.welcomeText}>Welcome Aboard!</Text>
    </View>
  );
};

export default SplashScreen;
