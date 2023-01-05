import {ms, ScaledSheet, vs} from 'react-native-size-matters';
import colorPalates from '../../../../theme/colors/colorPalates';
import colors from '../../../../theme/colors/colors';
import fonts from '../../../../theme/fonts/fonts';

export const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalates.white,
  },
  containerx: {
    flex: 1,
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
