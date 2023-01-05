import {ms, s, ScaledSheet, vs} from 'react-native-size-matters';
import colorPalates from '../../../../theme/colors/colorPalates';
import colors from '../../../../theme/colors/colors';
import fonts from '../../../../theme/fonts/fonts';

export const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalates.white,
  },
  containerX: {
    flex: 1,

    // borderTopLeftRadius: colorPalates.size.defaultBorderRadius,
    // borderTopRightRadius: colorPalates.size.defaultBorderRadius,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // backgroundColor: colorPalates.white,
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
    // overflow: 'hidden',
  },

  devider: {
    width: '100%',
    height: vs(1),
    backgroundColor: colors.grayShadeEx,
  },
  loader: {
    width: '100%',
    marginVertical: vs(20),
  },
  emptyFeedContainer: {paddingTop: ms(60), alignItems: 'center'},
  noFeedFound: {
    fontFamily: fonts.primarySemiBoldFont,
    fontSize: ms(24),
    marginVertical: ms(8),
    color: colorPalates.AppTheme.text,
  },
  emptyInstruction: {
    fontFamily: fonts.primaryRegularFont,
    fontSize: ms(16),
    color: colorPalates.AppTheme.primary,
    width: '60%',
    textAlign: 'center',
    lineHeight: ms(24),
    marginBottom: ms(10),
  },
  emptyFeedImage: {height: ms(200), width: ms(200), marginBottom: ms(16)},
  listContainer: {
    flex: 1,
  },
});
