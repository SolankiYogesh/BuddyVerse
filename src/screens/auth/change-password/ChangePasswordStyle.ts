import {ScaledSheet, ms} from 'react-native-size-matters';
import {colorPalates} from 'theme';

export default ScaledSheet.create({
  container: {flex: 1, backgroundColor: colorPalates.white},
  changePasswordButton: {marginHorizontal: ms(16), marginTop: ms(16)},
  changePasswordButtonTitle: {fontSize: ms(16)},
  viewContainer: {
    flex: 1,
    backgroundColor: colorPalates.white,
    borderTopLeftRadius: colorPalates.size.defaultBorderRadius,
    borderTopRightRadius: colorPalates.size.defaultBorderRadius,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingTop: ms(10),
  },
  changePasswordInput: {
    height: ms(48),
    padding: ms(16),
    marginTop: ms(16),
    borderColor: '#CCCED2',
    borderWidth: ms(1),
    borderRadius: ms(4),
    fontSize: ms(16),
    color: colorPalates.AppTheme.text,
  },
  forgotButton: {
    alignItems: 'flex-end',
    marginRight: ms(32),
    marginTop: ms(16),
  },
  popupText: {
    marginTop: ms(32),
    textAlign: 'center',
    fontSize: ms(18),
    color: colorPalates.AppTheme.text,
  },
  popupContainer: {
    margin: ms(24),
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: colorPalates.blackShade02,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  popupCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorPalates.blackShade02,
    opacity: 0.9,
  },
  backToSettingButton: {
    marginTop: ms(32),
    marginBottom: ms(32),
    height: ms(48),
    width: ms(295),
  },
  textInputContainer: {
    marginHorizontal: ms(16),
  },
});
