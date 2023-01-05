import ThemeButton from 'components/theme-button/ThemeButton';
import * as React from 'react';
import {Alert, View, Text, TouchableOpacity, TextInput, Keyboard} from 'react-native';
import {ms} from 'react-native-size-matters';
import RestorePasswordHeader from './components/RestorePasswordHeader';
import RestorePasswordScreenStyle from './RestorePasswordScreenStyle';
import {useNavigation} from '@react-navigation/native';
import screenNameEnum from 'models/screenNameEnum';
import {Auth} from 'aws-amplify';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colorPalates} from 'theme';
import AnnounceMentModal from '../../../components/annoucement-modal/AnnounceMentModal';
import ModalsMessages from '../../../models/ModalsMessages';

const RestorePasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const [messageOops, setMessageOops] = React.useState(false);

  const goToLoginPage = () => {
    navigation.navigate(screenNameEnum.LoginScreen);
  };

  const sendCode = email => async () => {
    Keyboard.dismiss();
    if (email == '') return;
    setIsLoading(true);
    Auth.forgotPassword(email)
      .then(() => {
        setIsLoading(false);
        navigation.navigate(screenNameEnum.VerificationCodeScreen, {email});
      })
      .catch(error => {
        setIsLoading(false);
        //Alert.alert("Oops", error.message)
        setMessageOops(true);
      });
  };

  const removeWhitespace = () => {
    let result = email.trimEnd();
    setEmail(result);
  };

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
      <AnnounceMentModal
        modalVisible={messageOops}
        title={'Oops'}
        buttonText={'Ok'}
        messageText={ModalsMessages.ModalsMassages.weCouldNotFoundEmail}
        onPressButton={() => setMessageOops(false)}
      />
      <SafeAreaView style={RestorePasswordScreenStyle.container}>
        <View style={{alignItems: 'center'}}>
          <RestorePasswordHeader />
          <Text style={RestorePasswordScreenStyle.headerTitle}>
            Restore Password
          </Text>
          <Text style={RestorePasswordScreenStyle.restorePasswordText}>
            Enter your email and we'll send you a code to get back into your
            account.
          </Text>
        </View>

        <View style={{marginHorizontal: ms(16)}}>
          <TextInput
            onChangeText={val => setEmail(val)}
            style={RestorePasswordScreenStyle.restorePasswordTextInput}
            placeholder="Enter Email Address"
            placeholderTextColor={colorPalates.grayShadeAB}
            onEndEditing={removeWhitespace}
          />
        </View>

        <ThemeButton
          containerStyle={RestorePasswordScreenStyle.sendCodeButton}
          titleStyle={RestorePasswordScreenStyle.sendCodeButtonTitle}
          title={'Send Code'}
          onPress={sendCode(email)}
          loading={isLoading}
        />

        <TouchableOpacity
          onPress={goToLoginPage}
          style={RestorePasswordScreenStyle.cancelButton}
        >
          <Text style={{fontSize: ms(16)}}>Cancel</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default RestorePasswordScreen;
