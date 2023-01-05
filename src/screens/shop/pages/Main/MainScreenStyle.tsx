import {ms, ScaledSheet} from 'react-native-size-matters';
import colorPalates from '../../../../theme/colors/colorPalates';
import colors from '../../../../theme/colors/colors';

export const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalates.white,
  },
  indicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStyle: {
    width: '49%',
  },
  btnSsetyle: {
    width: '49%',
    backgroundColor: colors.grayShadeC8,
    height: ms(48),
    borderRadius: ms(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
