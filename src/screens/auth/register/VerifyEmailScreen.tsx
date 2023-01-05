import React, {useState} from 'react';
import {
  Alert,
  View,
  Text,
  TextInput,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import {ms} from 'react-native-size-matters';

import RestorePasswordHeader from './../restore-password/components/RestorePasswordHeader';
import ThemeButton from 'components/theme-button/ThemeButton';
import {useNavigation} from '@react-navigation/native';
import screenNameEnum from 'models/screenNameEnum';
import VerifyEmailScreenStyle from './VerifyEmailScreenStyle';

import {Auth} from 'aws-amplify';
import {useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {colorPalates} from 'theme';
import AnnounceMentModal from '../../../components/annoucement-modal/AnnounceMentModal';
import ModalsMessages from '../../../models/ModalsMessages';

const VerifyEmailScreen = () => {
  const route = useRoute();

  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [otp, setOtp] = useState('');

  const [messageSuccess, setMessageSuccess] = useState(false);
  const [messageVerifyEmail, setMessageVerifyEmail] = useState(false);
  const [messageOops, setMessageOops] = useState(false);
  const [emptyField, setemptyField] = useState(false);

  let resendCode = () => async () => {
    setIsLoading(true);

    Auth.resendSignUp(route?.params?.email)
      .then(() => {
        setIsLoading(false);
        //Alert.alert("Success", "Code has been resent Successfully, Check Your Email for Code");
        setMessageSuccess(true);
      })
      .catch(error => {
        //
        Alert.alert('Oops', error.message);
        setIsLoading(false);
        // setMessageOops(true);
      });
  };

  let verifyEmail = otp => async () => {
    if (!otp) {
      setemptyField(true);
    }
    setVerifyLoading(true);
    Auth.confirmSignUp(route?.params?.email, otp)
      .then(async () => {
        await Auth.signIn(route?.params?.email, route?.params?.password);
        setVerifyLoading(false);
        Keyboard.dismiss();
        // navigation.navigate(screenNameEnum.LoginScreen);
      })
      .catch(error => {
        setVerifyLoading(false);
        setMessageVerifyEmail(true);
      });
  };

  return (
    <KeyboardAwareScrollView>
      <AnnounceMentModal
        modalVisible={messageSuccess}
        title={'Success'}
        buttonText={'Ok'}
        messageText={ModalsMessages.ModalsMassages.codeWassSucee}
        onPressButton={() => setMessageSuccess(false)}
      />
      <AnnounceMentModal
        modalVisible={messageVerifyEmail}
        title={'Oops'}
        buttonText={'Try again'}
        messageText={ModalsMessages.ModalsMassages.wrongCOnfirmation}
        onPressButton={() => setMessageVerifyEmail(false)}
      />
      <AnnounceMentModal
        modalVisible={messageOops}
        title={'Oops'}
        buttonText={'Ok'}
        messageText={ModalsMessages.ModalsMassages.somethingWentWrong}
        onPressButton={() => setMessageOops(false)}
      />
      <AnnounceMentModal
        modalVisible={emptyField}
        buttonText={'Ok'}
        messageText={ModalsMessages.ModalsMassages.enterVarification}
        onPressButton={() => setemptyField(false)}
      />

      <SafeAreaView style={VerifyEmailScreenStyle.container}>
        <View style={{alignItems: 'center'}}>
          <RestorePasswordHeader />
          <Text style={VerifyEmailScreenStyle.headerTitle}>Verify Email</Text>
          <Text style={VerifyEmailScreenStyle.verificationCodeText}>
            Enter 6-Digit Verification Code.
          </Text>
        </View>

        <View style={{marginHorizontal: ms(16)}}>
          <TextInput
            onChangeText={val => setOtp(val)}
            keyboardType="number-pad"
            maxLength={6}
            style={VerifyEmailScreenStyle.verificationCodeTextInput}
            placeholder="Enter Verification Code"
            placeholderTextColor={colorPalates.grayShadeAB}
          />
        </View>

        <ThemeButton
          containerStyle={VerifyEmailScreenStyle.verifyEmailButton}
          titleStyle={VerifyEmailScreenStyle.resendButtonTitle}
          loading={verifyLoading}
          title={'Verify Email'}
          onPress={verifyEmail(otp)}
        />
        <ThemeButton
          containerStyle={VerifyEmailScreenStyle.resendButton}
          titleStyle={VerifyEmailScreenStyle.resendButtonTitle}
          loading={isLoading}
          title={'Resend Code'}
          onPress={resendCode()}
        />
        <Text style={VerifyEmailScreenStyle.verificationCodeTextContainer}>
          We emailed a code to your email address. {'\n'}Please enter the code
          to sign in.
        </Text>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default VerifyEmailScreen;
