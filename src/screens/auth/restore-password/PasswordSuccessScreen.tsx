import ThemeButton from 'components/theme-button/ThemeButton';
import * as React from 'react';
import {View, Text, Image, SafeAreaView} from 'react-native';
import {images} from 'theme';
import RestorePasswordHeader from './components/RestorePasswordHeader';
import PasswordSuccessScreenStyle from './PasswordSuccessScreenStyle';
import {useNavigation} from '@react-navigation/native';
import screenNameEnum from 'models/screenNameEnum';

const PasswordSuccessScreen = () => {
  const navigation = useNavigation();
  const goToLogin = () => {
    navigation.navigate(screenNameEnum.LoginScreen);
  };
  return (
    <SafeAreaView style={PasswordSuccessScreenStyle.container}>
      <View style={{alignItems: 'center'}}>
        <RestorePasswordHeader />
        <Image
          style={PasswordSuccessScreenStyle.checkMark}
          source={images.checkMark}
        />
        <Text style={PasswordSuccessScreenStyle.passwordSuccessText}>
          Password was{'\n'}Successfully changed
        </Text>
      </View>

      <ThemeButton
        containerStyle={PasswordSuccessScreenStyle.goToLoginButton}
        titleStyle={PasswordSuccessScreenStyle.goToLoginButtonTitle}
        title={'Go to Login'}
        onPress={goToLogin}
      />
    </SafeAreaView>
  );
};

export default PasswordSuccessScreen;
