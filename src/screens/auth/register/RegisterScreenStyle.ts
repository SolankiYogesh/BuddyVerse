import {ms, ScaledSheet} from 'react-native-size-matters';
import {colorPalates} from 'theme';
export default ScaledSheet.create({
  container: {flex: 1},
  header: {fontSize: ms(24), fontWeight: 'bold', marginTop: ms(30)},
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: ms(16),
    //width: '60%',
    marginTop: ms(20),
  },
  nameTextInput: {
    height: ms(48),
    width: '46%',
    padding: ms(16),
    borderColor: '#CCCED2',
    borderWidth: ms(1),
    borderRadius: ms(4),
    fontSize: ms(16),
  },

  registrationTextInput: {
    height: ms(48),
    padding: ms(14),
    marginTop: ms(16),
    borderColor: '#CCCED2',
    borderWidth: ms(1),
    borderRadius: ms(50),
    fontSize: ms(16),
    color: colorPalates.AppTheme.text,
  },
  signUpButton: {
    marginHorizontal: ms(16),
    marginTop: ms(16),
    backgroundColor: '#CCCED2',
    height: ms(48),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ms(8),
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

  socialButtonIcon: {
    borderRadius: ms(56),
    borderColor: colorPalates.grayShadeE9,
    borderWidth: ms(1),
    height: ms(56),
    width: ms(56),
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    fontSize: ms(16),
    color: colorPalates.grayShade80,
  },
  loginButtonContainer: {
    marginTop: ms(32),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // alignSelf: 'flex-end',
  },
  termsOfServiceContainer: {
    marginTop: ms(16),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
