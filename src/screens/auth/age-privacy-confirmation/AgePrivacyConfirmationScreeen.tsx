import ThemeButton from 'components/theme-button/ThemeButton';
import screenNameEnum from 'models/screenNameEnum';
import * as React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  useWindowDimensions,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {ms} from 'react-native-size-matters';
import {colorPalates, images} from 'theme';
import AgePrivacyConfirmationScreenStyle from './AgePrivacyConfirmationScreenStyle';
import {useNavigation} from '@react-navigation/native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
const AgePrivacyConfirmationScreen = () => {
  const navigation = useNavigation();
  const {width} = useWindowDimensions();

  return (
    <ImageBackground
      source={images.agePrivacyBg}
      style={AgePrivacyConfirmationScreenStyle.container}
    >
      <SafeAreaView
        style={AgePrivacyConfirmationScreenStyle.greenLyncLogoContainer}
      >
        <Image
          style={{height: ms(120), width: ms(120)}}
          source={images.greenLyncLogo}
        />
        {/* <View>
          <Text style={AgePrivacyConfirmationScreenStyle.greenLyncText}>
            GREENLYNC
          </Text>
        </View> */}
        <View style={{width: width}}>
          <Text style={AgePrivacyConfirmationScreenStyle.welcomeTextContainer}>
            <Text style={AgePrivacyConfirmationScreenStyle.welcomeText}>
              Welcome {'\n'}to GREEN
            </Text>
            LYNC!
          </Text>
          <Text
            style={
              AgePrivacyConfirmationScreenStyle.agePrivacyConfirmationContainer
            }
          >
            <Text style={{color: colorPalates.grayShadeAE, fontSize: ms(16)}}>
              By Clicking Yes, you verify that you are 21 or older and agree to
              Greenlync’s{' '}
              <Text
                style={{color: colorPalates.white, fontSize: ms(16)}}
                onPress={() => {
                  navigation.navigate(screenNameEnum.LegalStack);
                }}
              >
                Terms, Data & Privacy Policy
              </Text>
            </Text>
          </Text>
          <ThemeButton
            containerStyle={AgePrivacyConfirmationScreenStyle.Button}
            titleStyle={AgePrivacyConfirmationScreenStyle.ButtonTitle}
            title={'Yes, I’m 21+ and agree'}
            onPress={() => {
              navigation.navigate(screenNameEnum.LoginScreen);
            }}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default AgePrivacyConfirmationScreen;
