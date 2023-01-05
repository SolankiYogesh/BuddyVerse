import {ms, ScaledSheet} from 'react-native-size-matters';
import {colorPalates} from 'theme';

export default ScaledSheet.create({
  container: {flex: 1},
  loginHeaderTitle: {
    fontSize: ms(24),
    fontWeight: 'bold',
    marginTop: ms(30),
    color: colorPalates.AppTheme.text,
  },

  loginButton: {
    marginHorizontal: ms(16),
    marginTop: ms(32),
    borderRadius: ms(50),
  },
  loginButtonTitle: {fontSize: ms(16)},
  forgotButton: {
    alignItems: 'flex-end',
    marginRight: ms(32),
    marginTop: ms(16),
  },
  loginFormTextInput: {
    height: ms(48),
    padding: ms(14),
    marginTop: ms(16),
    borderColor: '#CCCED2',
    borderWidth: ms(1),
    borderRadius: ms(50),
    fontSize: ms(16),
    color: colorPalates.AppTheme.text,
  },
  appleLogo: {
    borderRadius: ms(56),
    borderColor: colorPalates.grayShadeE9,
    borderWidth: ms(1),
    height: ms(56),
    width: ms(56),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorPalates.black,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: ms(24),
    marginHorizontal: ms(16),
  },
  greenLyncLogo: {
    height: ms(64),
    width: ms(64),
    alignItems: 'center',
    marginTop: ms(64),
  },

  socialButton: {
    borderRadius: ms(56),
    borderColor: colorPalates.grayShadeE9,
    borderWidth: ms(1),
    height: ms(56),
    width: ms(56),
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialLoginContainer2: {
    flex: 1,
    height: 1,
    backgroundColor: colorPalates.grayShade8F,
  },
  socialLoginContainer3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: ms(48),
    marginTop: ms(24),
  },
  signUpContainer: {
    marginTop: ms(32),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpButtonText: {
    fontSize: ms(16),
    color: colorPalates.grayShade8F,
  },
  termsOfServiceContainer: {
    marginTop: ms(16),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
