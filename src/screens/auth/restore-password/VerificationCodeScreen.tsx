import React, {useState} from 'react';

import {View, Text, TextInput, SafeAreaView, Keyboard} from 'react-native';
import {ms} from 'react-native-size-matters';
import VerificationCodeScreenStyle from './VerificationCodeScreenStyle';
import RestorePasswordHeader from './components/RestorePasswordHeader';
import ThemeButton from 'components/theme-button/ThemeButton';
import {useNavigation} from '@react-navigation/native';
import screenNameEnum from 'models/screenNameEnum';
import {Auth} from 'aws-amplify';
import {useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {colorPalates} from 'theme';
import AnnounceMentModal from '../../../components/annoucement-modal/AnnounceMentModal';
import ModalsMessages from '../../../models/ModalsMessages';

const VerificationCodeScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [limitErrorPopUp, setLimitErrorPopUp] = useState(false);

  const [messagePassword, SetMessagePassword] = useState(false);
  const [messageConfirmPassword, setMessageConfirmPassword] = useState(false);
  const [messageCode, setMessageCode] = useState(false);
  const [messagCorrection, setMessageCorrection] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [messageInvalidCode, setMessageInvalidCode] = useState(false);
  const [resendCodeMessage, setResendCodeMessage] = useState(false);
  const [invalidPass, setInvalidPass] = useState(false);

  const verifyCode = code => async () => {
    Keyboard.dismiss();
    if (code === '') {
      setMessageCode(true);
      return;
    }

    if (password === '') {
      SetMessagePassword(true);
      return;
    }
    if (confirmPassword === '') {
      setMessageConfirmPassword(true);
      return;
    }
    if (password !== confirmPassword) {
      setMessageCorrection(true);
      return;
    }
    if (password.length < 6) {
      setInvalidPass(true);
      return;
    }

    setVerifyLoading(true);
    console.log(route?.params?.email);
    Auth.forgotPasswordSubmit(route?.params?.email, code, password)
      .then(data => {
        setVerifyLoading(false);
        navigation.navigate(screenNameEnum.PasswordSuccessScreen);
      })
      .catch(err => {
        setVerifyLoading(false);
        const error = JSON.parse(JSON.stringify(err));

        console.log(error?.code === 'LimitExceededException');

        if (error?.code === 'LimitExceededException') {
          setLimitErrorPopUp(true);
        } else {
          setMessageInvalidCode(true);
        }

        //Alert.alert("Oops", err.message); //invalid verification code providded,please try again
      });
  };

  // const goToChangePassword = () => {
  //   navigation.navigate(screenNameEnum.ChangePasswordScreen);
  // };

  const resendCode = () => async () => {
    setIsLoading(true);
    Auth.forgotPassword(route?.params?.email)
      .then(() => {
        setIsLoading(false);
        setResendCodeMessage(true);
        //Alert.alert("Success", "Code has been sent to your email");
      })
      .catch(error => {
        setIsLoading(false);
        if (error?.code === 'LimitExceededException') {
          setLimitErrorPopUp(true);
        }
        // Alert.alert("d", error.message)
        // setMessageError(true);
      });
  };

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="always" style={VerificationCodeScreenStyle.container}>
      <AnnounceMentModal
        modalVisible={messagePassword}
        title={'Oops'}
        buttonText={'Ok'}
        messageText={ModalsMessages.ModalsMassages.pleaseEnterBothPassword}
        onPressButton={() => SetMessagePassword(false)}
      />
      <AnnounceMentModal
        modalVisible={messageConfirmPassword}
        title={'Oops'}
        buttonText={'Ok'}
        messageText={ModalsMessages.ModalsMassages.pleaseEnterBothPassword}
        onPressButton={() => setMessageConfirmPassword(false)}
      />
      <AnnounceMentModal
        modalVisible={messageCode}
        title={'Oops'}
        buttonText={'Ok'}
        messageText={ModalsMessages.ModalsMassages.PleaseEnterVarification}
        onPressButton={() => setMessageCode(false)}
      />
      <AnnounceMentModal
        modalVisible={messagCorrection}
        title={'Oops'}
        buttonText={'Ok'}
        messageText={ModalsMessages.ModalsMassages.paaswordDontMoath}
        onPressButton={() => setMessageCorrection(false)}
      />
      <AnnounceMentModal
        modalVisible={limitErrorPopUp}
        title={'Oops'}
        buttonText={'Ok'}
        messageText={ModalsMessages.ModalsMassages.attemptLimitExceeded}
        onPressButton={() => setLimitErrorPopUp(false)}
      />
      <AnnounceMentModal
        modalVisible={messageError}
        title={'Oops'}
        buttonText={'Ok'}
        messageText={ModalsMessages.ModalsMassages.paaswordDontMoath}
        onPressButton={() => setMessageError(false)}
      />
      <AnnounceMentModal
        modalVisible={messageInvalidCode}
        title={'Oops'}
        buttonText={'Try Again'}
        buttonStyle={{width: ms(100)}}
        messageText={ModalsMessages.ModalsMassages.InvalidVerificationCode}
        onPressButton={() => setMessageInvalidCode(false)}
      />
      <AnnounceMentModal
        modalVisible={resendCodeMessage}
        title={''}
        buttonText={'Ok'}
        messageText={ModalsMessages.ModalsMassages.codeResent}
        onPressButton={() => setResendCodeMessage(false)}
      />
      <AnnounceMentModal
        modalVisible={invalidPass}
        title={''}
        buttonText={'Ok'}
        messageText={ModalsMessages.ModalsMassages.passwordShouldBe}
        onPressButton={() => setInvalidPass(false)}
      />

      <SafeAreaView>
        <View style={{alignItems: 'center'}}>
          <RestorePasswordHeader />
          <Text style={VerificationCodeScreenStyle.headerTitle}>
            Restore Password
          </Text>
          <Text style={VerificationCodeScreenStyle.verificationCodeText}>
            Enter 6-Digit Verification Code.
          </Text>
        </View>

        <View style={{marginHorizontal: ms(16)}}>
          <TextInput
            keyboardType="number-pad"
            onChangeText={val => setCode(val)}
            style={VerificationCodeScreenStyle.verificationCodeTextInput}
            placeholder="Enter Verification Code"
            placeholderTextColor={colorPalates.grayShadeAB}
          />
          <TextInput
            onChangeText={val => setPassword(val)}
            secureTextEntry={true}
            style={VerificationCodeScreenStyle.verificationCodeTextInput}
            placeholder="New Password"
            placeholderTextColor={colorPalates.grayShadeAB}
          />
          <TextInput
            onChangeText={val => setConfirmPassword(val)}
            secureTextEntry={true}
            style={VerificationCodeScreenStyle.verificationCodeTextInput}
            placeholder="Confirm New Password"
            placeholderTextColor={colorPalates.grayShadeAB}
          />
        </View>

        <ThemeButton
          containerStyle={VerificationCodeScreenStyle.resendButton}
          titleStyle={VerificationCodeScreenStyle.resendButtonTitle}
          title={'Verify'}
          onPress={verifyCode(code)}
          loading={verifyLoading}
        />

        <ThemeButton
          containerStyle={VerificationCodeScreenStyle.resendButton}
          titleStyle={VerificationCodeScreenStyle.resendButtonTitle}
          title={'Resend Code'}
          onPress={resendCode()}
          loading={isLoading}
        />
        <Text style={VerificationCodeScreenStyle.verificationCodeTextContainer}>
          This verification code is valid for the next {'\n'}10 minutes.
        </Text>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default VerificationCodeScreen;
