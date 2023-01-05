import {ms, s, ScaledSheet} from 'react-native-size-matters';
import colorPalates from '../../../../theme/colors/colorPalates';
import colors from '../../../../theme/colors/colors';

export const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalates.white,
  },
  tabBatTitle: {
    margin: s(8),
    color: colors.grayShade80,
  },

  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: ms(40),
    padding: ms(16),
    backgroundColor: colorPalates.white,
  },
  titleText: {
    flex: 1,
    textAlign: 'center',
    fontSize: ms(16),
    fontWeight: '600',
    color: colorPalates.blackShade02,
    marginRight: s(10),
  },
  tabviewBackContainer: {
    borderTopLeftRadius: colorPalates.size.defaultBorderRadius,
    borderTopRightRadius: colorPalates.size.defaultBorderRadius,
    backgroundColor: colorPalates.white,
  },
});
