import * as React from 'react';
import {View, Text, Image, ImageBackground, SafeAreaView} from 'react-native';
import {ms} from 'react-native-size-matters';
import {colorPalates, images} from 'theme';
import MainSplashScreenStyle from './MainSplashScreenStyle';

const MainSplashScreen = () => {
  return (
    <ImageBackground
      source={images.agePrivacyBg}
      style={MainSplashScreenStyle.container}
    >
      <SafeAreaView style={MainSplashScreenStyle.greenLyncLogoContainer}>
        <Image
          style={{height: ms(128), width: ms(128)}}
          source={images.greenLyncLogo}
        />
        <View>
          <Text style={MainSplashScreenStyle.greenLyncText}>GREENLYNC</Text>
          <Text style={{color: colorPalates.white, fontSize: ms(16)}}>
            The Social Hub for Everything Cannabis
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default MainSplashScreen;
