import {ms, s, ScaledSheet} from 'react-native-size-matters';
import {fonts} from 'theme';
import colors from 'theme/colors/colors';
import colorPalates from '../../../../theme/colors/colorPalates';

export default ScaledSheet.create({
  safeareaViewContainer: {
    flex: 1,
    backgroundColor: colorPalates.white,
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
    marginTop: s(5),
  },
  plusIcon: {
    width: ms(20),
    height: ms(20),
    tintColor: colors.white,
  },
  plusBtnContainer: {
    position: 'absolute',
    width: ms(40),
    height: ms(40),
    borderRadius: ms(1000),
    right: 20,
    bottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  plusContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  onGroupsView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: ms(10),
  },
  onGroupsText: {
    fontSize: ms(16),
    fontFamily: fonts.primaryMediumFont,
    color: colors.grayShade80,
    textAlign: 'center',
  },
});
