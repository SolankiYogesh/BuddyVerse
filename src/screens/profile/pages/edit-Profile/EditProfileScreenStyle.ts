import {ms, s, ScaledSheet, vs} from 'react-native-size-matters';
import {colorPalates, fonts} from 'theme';
import colors from '../../../../theme/colors/colors';

export const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalates.AppTheme.background,
  },
  deleteViewstyle: {
    flexDirection: 'row',
    backgroundColor: colorPalates.white,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  renderImDataView: {
    flex: 1,
    marginHorizontal: ms(20),
  },
  renderImDataSubView: {marginTop: ms(40), alignItems: 'center'},
  imTextStyle: {
    color: colorPalates.AppTheme.text,
    fontSize: ms(18),
    fontFamily: fonts.primarySemiBoldFont,
  },
  imDataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderColor: colorPalates.AppTheme.primary,

    borderWidth: 1,
    borderRadius: ms(50),
    padding: ms(5),
    paddingHorizontal: ms(10),
    margin: ms(5),
  },
  imDataItemText: {
    marginLeft: ms(5),
    fontSize: ms(14),
  },
  selectMaxText: {
    marginLeft: ms(5),
    color: colorPalates.grayShade80,
    fontSize: ms(14),
  },
  imDataList: {
    marginTop: ms(15),
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aboutLength: {
    color: colors.grayShade80,
    fontSize: ms(15),
    fontFamily: fonts.primaryMediumFont,
  },
  loaderView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    zIndex: 1000,
  },
  loadingContainer: {
    opacity: 0.3,
  },
  chatCommentTextStyle: {
    marginRight: ms(5),
    fontFamily: fonts.primarySemiBoldFont,
  },
  inputMergeStyle: {
    maxWidth: ms(250),
    width: ms(250),
  },
  nameTextStyle: {
    marginTop: ms(16),
    color: colorPalates.grayShade80,
  },
  headerButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: ms(16),
    marginTop: ms(16),
    height: vs(50),
  },
  profileImage: {
    width: ms(90),
    height: ms(90),
    borderRadius: 1000,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorPalates.grayShadeAB,
  },
  marginTop28: {
    marginTop: ms(28),
  },
  verifyProfile: {},
  editProfileText: {
    fontSize: ms(18),
    color: colorPalates.AppTheme.text,
    fontFamily: fonts.primarySemiBoldFont,
  },

  textInputContainer: {
    height: ms(40),
    // marginTop: ms(16),
    borderColor: colorPalates.grayShadeCC,
    borderWidth: ms(1),
    borderRadius: ms(4),
    fontSize: ms(14),
    marginRight: ms(16),
    paddingLeft: ms(16),
    backgroundColor: colorPalates.AppTheme.background,
    color: colorPalates.AppTheme.text,
    textAlignVertical: 'center',
  },
  btnDateView: {
    height: ms(40),
    marginRight: ms(16),
    paddingLeft: ms(16),
    backgroundColor: colorPalates.AppTheme.background,
    borderColor: colorPalates.grayShadeE6,
    justifyContent: 'center',
    borderWidth: ms(1),
    borderRadius: ms(4),
  },
  dateText: {
    fontSize: ms(14),
    color: colorPalates.AppTheme.text,
  },

  usernameTxtStyle: {
    marginTop: ms(16),
    color: colorPalates.AppTheme.text,
  },
  saveCancelButton: {
    fontSize: ms(16),
    color: colorPalates.AppTheme.text,
    fontFamily: fonts.primaryRegularFont,
  },
  verificationContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: ms(16),
    paddingHorizontal: ms(16),
    marginTop: ms(16),
    borderRadius: ms(20),
    elevation: 2,
    shadowColor: 'white',
    shadowBottomColor: colorPalates.AppTheme.text,
  },
  verificationTextContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: ms(28),
  },
  textInputView: {
    marginTop: ms(16),
    marginLeft: ms(16),
  },
  genederViewstyle: {
    flex: 1,
    flexDirection: 'row',
    marginTop: ms(8),
  },
  aboutViewStyle: {
    minHeight: ms(100),
    height: ms(100),
    flex: 1,
  },
  textInputText: {
    color: colorPalates.AppTheme.text,
    fontSize: ms(14),
  },
  textInputLocation: {
    width: ms(346),
    borderColor: '#CCCED2',
    borderWidth: ms(1),
    borderRadius: ms(4),
  },
  selectedMaleButton: {
    backgroundColor: colorPalates.AppTheme.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ms(50),
    width: ms(56),
    height: ms(32),
  },
  unSelectedFemaleButton: {
    backgroundColor: colorPalates.grayShadeCC,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ms(50),
    width: ms(72),
    marginLeft: ms(8),
    height: ms(32),
  },
  unSelectedMaleButton: {
    backgroundColor: colorPalates.grayShadeCC,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ms(50),
    width: ms(56),
    height: ms(32),
  },
  selectedFemaleButton: {
    backgroundColor: colorPalates.AppTheme.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ms(50),
    width: ms(72),
    marginLeft: ms(8),
    height: ms(32),
  },
  redText: {
    alignSelf: 'center',
    width: '100%',
    textAlign: 'center',
    marginTop: ms(10),
    color: colorPalates.red,
  },
  nonRedText: {
    alignSelf: 'center',
    width: '100%',
    textAlign: 'center',
    marginTop: ms(10),
    color: colorPalates.AppTheme.text,
  },
  hintText: {
    color: colorPalates.AppTheme.text,
    fontSize: ms(16),
    width: '100%',
    textAlign: 'center',
    lineHeight: 25,
    fontFamily: fonts.primaryRegularFont,
    paddingHorizontal: ms(20),
  },
  redDotText: {
    color: colorPalates.red,
    fontSize: ms(16),
    width: '100%',
    textAlign: 'center',
    lineHeight: 25,
    fontFamily: fonts.primaryRegularFont,
  },
  unSelectedNonBinaryButton: {
    backgroundColor: colorPalates.grayShadeCC,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ms(50),
    marginLeft: ms(8),
    width: ms(90),
    height: ms(32),
  },
  selectedNonBinaryButton: {
    backgroundColor: colorPalates.AppTheme.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ms(50),
    marginLeft: ms(8),
    width: ms(90),
    height: ms(32),
  },
  selectedGenderText: {
    fontSize: ms(16),
    color: colorPalates.white,
  },
  unSelectedGenderText: {
    fontSize: ms(16),
    color: colorPalates.AppTheme.text,
  },
  lableStyle: {
    fontSize: ms(12),
    color: colorPalates.white,
    margin: 0,
    marginRight: -5,
  },
  inActivelableStyle: {
    fontSize: ms(12),
    color: colorPalates.white,
    margin: 0,
    marginLeft: -5,
  },
  logoutButtonTitle: {
    color: colorPalates.redShadeDF,
    fontSize: ms(16),
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: ms(16),
    alignSelf: 'center',
    backgroundColor: colorPalates.white,
    borderRadius: ms(50),
    overflow: 'hidden',
    padding: s(10),
    justifyContent: 'center',
    marginVertical: s(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderWidth: 1,
    borderColor: '#80848FAB',
  },
  themeContainer: {
    width: '100%',
    paddingHorizontal: s(15),
  },
  chatCommentText: {
    fontSize: ms(13),
    fontFamily: fonts.primaryRegularFont,
    color: colorPalates.grayShade80,
    marginLeft: ms(15),
  },
  rowThemeView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: s(10),
  },
  editProfileTextgg: {
    color: colorPalates.AppTheme.primary,
    fontSize: ms(12),
    fontFamily: fonts.primaryRegularFont,
  },
});

export const EditProfileTextInput = (textInputActive: boolean) => {
  return {
    borderColor: textInputActive
      ? colorPalates.AppTheme.primary
      : colorPalates.grayShadeE6,
    borderWidth: ms(1),
    borderRadius: ms(4),
    fontSize: ms(14),
    marginRight: ms(16),
    paddingLeft: ms(16),
    backgroundColor: colorPalates.AppTheme.background,
    textAlignVertical: 'center',
    height: ms(40),
    color: colorPalates.AppTheme.text,
  };
};

export const AboutTextInput = (aboutTextActive: boolean) => {
  return {
    borderColor: aboutTextActive
      ? colorPalates.AppTheme.primary
      : colorPalates.grayShadeE6,
    borderWidth: 1,
    borderRadius: ms(4),
    fontSize: ms(14),
    marginRight: ms(16),
    paddingLeft: ms(16),
    paddingTop: ms(8),
    backgroundColor: colorPalates.AppTheme.background,
  };
};
