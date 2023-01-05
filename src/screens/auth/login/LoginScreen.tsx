import SimpleButton from 'components/button/SimpleButton';
import ThemeButton from 'components/theme-button/ThemeButton';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Keyboard,
  TextInput,
  Pressable,
} from 'react-native';
import {ms} from 'react-native-size-matters';
import {colorPalates, fonts, images} from 'theme';
import LoginScreenStyle from './LoginScreenStyle';
import {useNavigation} from '@react-navigation/native';
import screenNameEnum from 'models/screenNameEnum';
import {Auth} from 'aws-amplify';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaView} from 'react-native-safe-area-context';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import AnnounceMentModal from '../../../components/annoucement-modal/AnnounceMentModal';
import ModalsMessages from '../../../models/ModalsMessages';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [messageOops, setMessageOops] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [termsAcceptPopup, setTermsAcceptPopup] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passVisibility, setPassVisibility] = useState(true);
  const [icon, setIcon] = useState('eye');

  let signIn = (email, password) => async () => {
    Keyboard.dismiss();
    if (!isChecked) {
      if (email == '' || password == '') return;
      setIsLoading(true);
      try {
        const user = await Auth.signIn(email, password);
      } catch (error) {
        if (error.message[0] === '2') {
          setEmailError(true);
        } else {
          setMessageOops(true);
          let message = error.message;
          if (message === 'User does not exist.') {
            message = 'Username doesn’t exist.';
          }

          setErrorMessage(message);
        }
        //  Alert.alert('Oops', error.message);
        // setEmailError(true)
      }
      setIsLoading(false);
    } else {
      setTermsAcceptPopup(true);
      setErrorMessage('Please agree to the terms and conditions');
    }
  };

  const SocialButton = ({
    icon,
    onPress,
  }: {
    icon: React.ReactNode;
    onPress: () => void;
  }) => {
    return (
      <TouchableOpacity style={LoginScreenStyle.socialButton} onPress={onPress}>
        {icon}
      </TouchableOpacity>
    );
  };

  const SocialLoginContainer = () => {
    return (
      <>
        <AnnounceMentModal
          modalVisible={messageOops}
          title={''}
          buttonText={'Try Again'}
          messageText={errorMessage}
          onPressButton={() => setMessageOops(false)}
        />
        <AnnounceMentModal
          modalVisible={emailError}
          title={'Failed'}
          buttonText={'Ok'}
          messageText={ModalsMessages.ModalsMassages.enterValidEmail}
          onPressButton={() => setEmailError(false)}
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
          /> */}

        {/* <SocialButton
            icon={<IconFontAwesome name={'apple'} size={30} color={'black'} />}
            onPress={async () => {
              Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Apple })
              .catch(error => { console.log(error);});
            }}
          /> */}
        {/* <TouchableOpacity
            style={LoginScreenStyle.appleLogo}
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
      </>
    );
  };

  const onPressGoToSignUp = () => {
    navigation.navigate(screenNameEnum.RegisterScreen);
  };

  const GoToSignUpContainer = () => {
    return (
      <View style={LoginScreenStyle.signUpContainer}>
        <Text style={LoginScreenStyle.signUpButtonText}>
          {" I don't have an account.\t"}
        </Text>
        <SimpleButton
          buttonTitleStyle={{
            fontSize: ms(14),
            fontFamily: fonts.primaryRegularFont,
          }}
          title={'Sign Up'}
          onPress={onPressGoToSignUp}
          containerStyle={undefined}
        />
      </View>
    );
  };

  const goToRestorePassword = () => {
    navigation.navigate(screenNameEnum.RestorePasswordScreen);
  };

  const removeWhitespace = () => {
    let result = email.trimEnd();
    setEmail(result);
  };

  const handlePasswordVisibility = () => {
    if (icon === 'eye') {
      setIcon('eye-off');
      setPassVisibility(!passVisibility);
    } else if (icon === 'eye-off') {
      setIcon('eye');
      setPassVisibility(!passVisibility);
    }
  };

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
      <SafeAreaView style={LoginScreenStyle.container}>
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
          <Text style={LoginScreenStyle.loginHeaderTitle}>Login</Text>
        </View>

        <View style={{marginHorizontal: ms(16)}}>
          <View>
            <TextInput
              style={LoginScreenStyle.loginFormTextInput}
              placeholder="Email"
              placeholderTextColor={colorPalates.grayShadeAB}
              onChangeText={val => setEmail(val)}
              onEndEditing={removeWhitespace}
            />
          </View>
          <View
            style={{
              borderColor: '#CCCED2',
              borderWidth: ms(1),
              borderRadius: ms(50),

              flexDirection: 'row',
              height: ms(48),
              marginTop: ms(16),
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: ms(12),
            }}
          >
            <TextInput
              style={{
                fontSize: ms(16),
                width: '90%',
                color: colorPalates.AppTheme.text,
              }}
              secureTextEntry={passVisibility}
              placeholder="Password"
              placeholderTextColor={colorPalates.grayShadeAB}
              onChangeText={val => setPassword(val)}
            />
            <Pressable onPress={handlePasswordVisibility}>
              <IconIonicons
                name={icon}
                size={20}
                color={colorPalates.grayShadeAB}
              />
            </Pressable>
          </View>
        </View>

        <SimpleButton
          containerStyle={LoginScreenStyle.forgotButton}
          title={'Forgot password?'}
          onPress={goToRestorePassword}
        />
        <ThemeButton
          containerStyle={LoginScreenStyle.loginButton}
          titleStyle={LoginScreenStyle.loginButtonTitle}
          title={'Login'}
          loading={isLoading}
          onPress={signIn(email, password)}
        />
        <SocialLoginContainer />
        <GoToSignUpContainer />
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
