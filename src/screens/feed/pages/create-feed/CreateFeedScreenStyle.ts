import {Dimensions, Platform} from 'react-native';
import {ms, s, ScaledSheet} from 'react-native-size-matters';
import {colorPalates, fonts} from 'theme';
import colors from '../../../../theme/colors/colors';

export const feedDescriptionInputStyle = (isTextInputActive: boolean) => {
  return {
    borderColor: isTextInputActive
      ? colorPalates.AppTheme.primary
      : colorPalates.grayShadeE6,
    fontFamily: fonts.primaryRegularFont,
    fontSize: ms(14),
    flex: 1,
    color: colorPalates.AppTheme.text,
  };
};

export const feedTypeButtonContainer = (isSelected: boolean) => {
  return {
    borderRadius: ms(5),
    justifyContent: 'center',
    alignItems: 'center',
    height: ms(40),
    backgroundColor: isSelected
      ? colorPalates.AppTheme.primary
      : colorPalates.grayShadeE6,
    width: s(150),
  };
};

export const feedTypeButtonTitle = (isSelected: boolean) => {
  return {
    fontFamily: fonts.primaryMediumFont,
    fontSize: ms(12),
    color: isSelected ? colorPalates.white : colorPalates.AppTheme.text,
  };
};

export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalates.white,
  },
  centerimages: {
    width: '70%',
    height: '60%',
  },
  mainContainer: {
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
  },
  scrollContainer: {
    height: Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textView: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? '25%' : '15%',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    marginTop: 0,
    height: '39%',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  midleText: {
    fontSize: ms(25),
    fontFamily: fonts.primaryMediumFont,
    color: colorPalates.AppTheme.primary,
  },
  mainContainersecond: {
    flex: 1,
    backgroundColor: colors.white,
    height: '100%',
    overflow: 'hidden',
  },
  userProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ms(16),
  },
  profileImage: {width: ms(48), height: ms(48), borderRadius: 1000},
  profileName: {
    fontFamily: fonts.primaryMediumFont,
    fontSize: ms(14),
    color: colorPalates.AppTheme.text,
    marginLeft: ms(16),
  },
  createFeedHeader: {
    flexDirection: 'row',
    backgroundColor: colorPalates.white,
    marginVertical: s(20),
    width: '90%',
    alignSelf: 'center',
  },
  cancelButtonContainer: {minWidth: ms(120)},
  cancelButtonTitle: {
    fontFamily: fonts.primaryRegularFont,
    fontSize: ms(16),
    color: colorPalates.blackShade02,
  },
  createFeedHeaderTitle: {
    fontFamily: fonts.primarySemiBoldFont,
    fontSize: ms(18),
    color: colorPalates.blackShade02,
  },
  feedInstruction: {
    fontFamily: fonts.primarySemiBoldFont,
    fontSize: ms(24),
    color: colorPalates.AppTheme.text,
  },
  pencilIcon: {
    fontFamily: fonts.primarySemiBoldFont,
    fontSize: ms(24),
    color: colorPalates.AppTheme.text,
    paddingRight: ms(8),
  },
  feedTypesListContainer: {
    maxHeight: ms(60),
    marginVertical: ms(12),

    // backgroundColor: 'tan',
  },
  menuContainer: {
    flexDirection: 'row',
    marginBottom: ms(16),
    backgroundColor: colorPalates.white,
    height: ms(50),
    alignItems: 'center',
    borderColor: colorPalates.grayShadeE9,
    borderRadius: ms(30),
    width: '90%',
    paddingHorizontal: s(10),
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderTopWidth: 0.3,
    borderTopColor: colorPalates.grayShade80,
    elevation: 5,
  },
  feedMediaContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButtons: {
    paddingHorizontal: ms(16),
  },
  removeFeedMediaContainer: {
    padding: ms(4),
    position: 'absolute',
    top: ms(24),
    right: ms(4),
  },
  feedImage: {
    width: '100%',
    aspectRatio: 1,
    marginTop: 24,
  },
  profileUserName: {
    fontFamily: fonts.primaryRegularFont,
    fontSize: ms(12),
    color: colorPalates.AppTheme.text,
    lineHeight: ms(18),
    marginLeft: ms(16),
  },
  fileContainer: {
    flex: 1,
    borderRadius: colorPalates.size.defaultBorderRadius,
    overflow: 'hidden',
    justifyContent: 'center',
  },
});
