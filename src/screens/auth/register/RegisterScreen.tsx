import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import {ms} from 'react-native-size-matters';
import {colorPalates, fonts, images} from 'theme';
import RegisterScreenStyle from './RegisterScreenStyle';
import SimpleButton from 'components/button/SimpleButton';
import LoginScreenStyle from '../login/LoginScreenStyle';
import ThemeButton from 'components/theme-button/ThemeButton';
import {useNavigation} from '@react-navigation/native';
import screenNameEnum from 'models/screenNameEnum';
import {Auth} from 'aws-amplify';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CheckBox from 'react-native-check-box';
import AnnounceMentModal from '../../../components/annoucement-modal/AnnounceMentModal';
import ModalsMessages from '../../../models/ModalsMessages';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [messageFailed, setMessageFaild] = useState(false);
  const [messagePromocode, setMessgePromocode] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState(false);
  const [error, setError] = useState('');
  const [messageError, setMessageError] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [termsAcceptPopup, setTermsAcceptPopup] = useState(false);
  const [invalidPass, setInvalidPass] = useState(false);

  let signUp = (email, password, confirmPassword) => async () => {
    Keyboard.dismiss();
    if (!email || !password || !confirmPassword) return;
    if (password.length < 6) {
      setInvalidPass(true);
      return;
    }

    if (password !== confirmPassword) {
      setMessageFaild(true);
      return;
    }
    if (!isChecked) {
      setTermsAcceptPopup(true);
      setError('Please accept the terms and conditions');
      return;
    }
    setIsLoading(true);
    Auth.signUp({username: email, password})
      .then(() => {
        setIsLoading(false);

        navigation.navigate(screenNameEnum.VerifyEmailScreen, {
          email,
          password,
        });
      })
      .catch(error => {
        setIsLoading(false);
        let message = error.message;
        if (message === 'Username should be an email.') {
          message = 'Please enter a valid email address';
        }
        setError(message), setMessageError(true);
      });
  };

  const SocialButton = ({
    icon,
    onPress,
  }: {
    icon: React.ReactNode;
    onPress: () => void;
  }) => {
    return (
      <TouchableOpacity
        style={RegisterScreenStyle.socialButtonIcon}
        onPress={onPress}
      >
        {icon}
      </TouchableOpacity>
    );
  };

  const SocialLoginContainer = () => {
    return (
      <View>
        <AnnounceMentModal
          modalVisible={messageFailed}
          title={ModalsMessages.ModalsTitles.failed}
          buttonText={'Try Again'}
          messageText={ModalsMessages.ModalsMassages.paaswordDontMoath}
          onPressButton={() => setMessageFaild(false)}
        />
        <AnnounceMentModal
          modalVisible={invalidPass}
          title={''}
          buttonText={'Ok'}
          messageText={ModalsMessages.ModalsMassages.passwordShouldBe}
          onPressButton={() => setInvalidPass(false)}
        />
        <AnnounceMentModal
          modalVisible={messagePromocode}
          title={''}
          buttonText={'Try Again'}
          messageText={ModalsMessages.ModalsMassages.promoCode}
          onPressButton={() => setMessgePromocode(false)}
        />
        <AnnounceMentModal
          modalVisible={messageSuccess}
          title={'Success'}
          buttonText={'Ok'}
          messageText={ModalsMessages.ModalsMassages.promoCOdeClaimed}
          onPressButton={() => setMessageSuccess(false)}
        />
        <AnnounceMentModal
          modalVisible={messageError}
          title={ModalsMessages.ModalsTitles.oops}
          buttonText={'Ok'}
          messageText={error}
          onPressButton={() => setMessageError(false)}
        />
        <AnnounceMentModal
          modalVisible={termsAcceptPopup}
          title={''}
          buttonText={'Ok'}
          messageText={error}
          onPressButton={() => setTermsAcceptPopup(false)}
        />

        {/* <View style={LoginScreenStyle.socialLoginContainer}>
          <View style={LoginScreenStyle.socialLoginContainer2} />
          <View>
            <Text
              style={{textAlign: 'center', color: colorPalates.grayShade8F}}
            >
              {' '}
              or Sign up with{' '}
            </Text>
          </View>

          <View style={LoginScreenStyle.socialLoginContainer2} />
        </View> */}
        {/* <View style={LoginScreenStyle.socialLoginContainer3}>
          <SocialButton
            icon={
              <IconFontAwesome name={'facebook'} size={30} color={'blue'} />
            }
            onPress={async () => {
              Auth.federatedSignIn({
                provider: CognitoHostedUIIdentityProvider.Facebook,
              }).catch(error => {
                console.log(error);
              });
            }}
          />
          <SocialButton
            icon={<IconFontAwesome name={'google'} size={30} color={'red'} />}
            onPress={async () => {
              Auth.federatedSignIn({
                provider: CognitoHostedUIIdentityProvider.Google,
              }).catch(error => {
                console.log(error);
              });
            }}
          />
          <TouchableOpacity
            style={RegisterScreenStyle.appleLogo}
            onPress={async () => {
              Auth.federatedSignIn({
                provider: CognitoHostedUIIdentityProvider.Apple,
              }).catch(error => {
                console.log(error);
              });
            }}
          >
            <IconFontAwesome
              name={'apple'}
              size={30}
              color={colorPalates.white}
            />
          </TouchableOpacity>
        </View> */}
      </View>
    );
  };

  const onPressGoToLogin = () => {
    navigation.navigate(screenNameEnum.LoginScreen);
  };
  const [checkPromoCode, setPromoCode] = useState('');
  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="always"
      style={{marginBottom: ms(16)}}
    >
      <SafeAreaView style={RegisterScreenStyle.container}>
        <View style={{alignItems: 'center'}}>
          <Image
            style={LoginScreenStyle.greenLyncLogo}
            source={images.greenLyncLogo}
          />
          <Text
            style={{
              fontSize: ms(20),
              marginTop: ms(16),
              color: colorPalates.AppTheme.text,
            }}
          >
            <Text style={{fontWeight: 'bold'}}>GREEN</Text>LYNC
          </Text>
          <Text
            style={{
              fontSize: ms(24),
              fontWeight: 'bold',
              marginTop: ms(30),
              color: colorPalates.AppTheme.text,
            }}
          >
            Create account
          </Text>
        </View>
        {/* <View style={RegisterScreenStyle.nameContainer}>
          <TextInput
            style={RegisterScreenStyle.nameTextInput}
            placeholder="First Name"
            placeholderTextColor={colorPalates.grayShadeAB}
            onChangeText={(val) => setFirstName(val)}
          />
          <TextInput
            style={RegisterScreenStyle.lastNameTextInput}
            placeholder="Last Name"
            placeholderTextColor={colorPalates.grayShadeAB}
            onChangeText={(val) => setLastName(val)}
          />
        </View> */}
        <View style={{marginHorizontal: ms(16)}}>
          <TextInput
            style={RegisterScreenStyle.registrationTextInput}
            keyboardType="email-address"
            placeholder="Email"
            placeholderTextColor={colorPalates.grayShadeAB}
            onChangeText={val => setEmail(val)}
          />
          <TextInput
            style={RegisterScreenStyle.registrationTextInput}
            secureTextEntry={true}
            placeholder="Create Password"
            placeholderTextColor={colorPalates.grayShadeAB}
            onChangeText={val => setPassword(val)}
          />
          <TextInput
            style={RegisterScreenStyle.registrationTextInput}
            secureTextEntry={true}
            placeholder="Repeat Password"
            placeholderTextColor={colorPalates.grayShadeAB}
            onChangeText={val => setConfirmPassword(val)}
          />
          {/* <TextInput
            style={RegisterScreenStyle.registrationTextInput}
            placeholder="Enter Referral Code"
            placeholderTextColor={colorPalates.grayShadeAB}
            onChangeText={code => setPromoCode(code)}
          /> */}
        </View>
        <View style={RegisterScreenStyle.termsOfServiceContainer}>
          <CheckBox
            onClick={() => {
              setIsChecked(!isChecked);
            }}
            isChecked={isChecked}
            style={{marginRight: ms(8)}}
          />
          <Text style={{fontSize: ms(14), color: colorPalates.grayShade8F}}>
            Yes, I agree to GreenLync's{' '}
          </Text>
          <SimpleButton
            buttonTitleStyle={{
              fontSize: ms(14),
              fontFamily: fonts.primaryRegularFont,
            }}
            title={'Terms of Service'}
            onPress={() => {
              navigation.navigate(screenNameEnum.LegalStack);
            }}
            containerStyle={undefined}
          />
        </View>
        <ThemeButton
          containerStyle={LoginScreenStyle.loginButton}
          titleStyle={LoginScreenStyle.loginButtonTitle}
          title={'Sign Up'}
          loading={isLoading}
          onPress={signUp(email, password, confirmPassword, checkPromoCode)}
        />
        <SocialLoginContainer />
        <View style={RegisterScreenStyle.loginButtonContainer}>
          <Text style={RegisterScreenStyle.loginButtonText}>
            I already have an account.{' '}
          </Text>
          <SimpleButton
            buttonTitleStyle={{
              fontSize: ms(14),
              fontFamily: fonts.primaryRegularFont,
            }}
            title={'Login'}
            onPress={onPressGoToLogin}
            containerStyle={undefined}
          />
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default RegisterScreen;
