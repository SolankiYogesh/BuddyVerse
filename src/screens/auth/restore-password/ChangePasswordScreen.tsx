import * as React from 'react';
import {View, Text, TextInput, SafeAreaView} from 'react-native';
import {ms} from 'react-native-size-matters';
import ChangePasswordScreenStyle from './ChangePasswordScreenStyle';
import ThemeButton from 'components/theme-button/ThemeButton';
import RestorePasswordHeader from './components/RestorePasswordHeader';
import {useNavigation} from '@react-navigation/native';
import screenNameEnum from 'models/screenNameEnum';
import {colorPalates} from 'theme';

const PasswordTextInput = () => {
  return (
    <View style={{marginHorizontal: ms(16)}}>
      <TextInput
        style={ChangePasswordScreenStyle.passwordTextContainer}
        placeholder="New Password"
        placeholderTextColor={colorPalates.grayShadeAB}
      />
      <TextInput
        style={ChangePasswordScreenStyle.passwordTextContainer}
        placeholder="Confirm Password"
        placeholderTextColor={colorPalates.grayShadeAB}
      />
    </View>
  );
};
const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const goToPasswordSuccess = () => {
    navigation.navigate(screenNameEnum.PasswordSuccessScreen);
  };
  return (
    <SafeAreaView style={ChangePasswordScreenStyle.container}>
      <View style={{alignItems: 'center'}}>
        <RestorePasswordHeader />
        <Text style={ChangePasswordScreenStyle.changePasswordTitle}>
          Change Password
        </Text>
        <Text style={ChangePasswordScreenStyle.passwordTermTextTop}>
          Your password must be a minimum of 8{'\n'} characters and a mix of
          letters and at least{'\n'} one number and special symbol like{'\n'}{' '}
          (!@$%#)
        </Text>
      </View>

      <PasswordTextInput />

      <ThemeButton
        containerStyle={ChangePasswordScreenStyle.savePasswordButton}
        titleStyle={ChangePasswordScreenStyle.savePasswordTitle}
        title={'Save Password'}
        onPress={goToPasswordSuccess}
      />
      <Text style={ChangePasswordScreenStyle.passwordTermTextBottom}>
        Your password must be a minimum of 8{'\n'}characters, a mix of letters,
        at least one number {'\n'}and a special symbol (!@$%#)
      </Text>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;
