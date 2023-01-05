import {ScaledSheet} from 'react-native-size-matters';
import {colorPalates} from 'theme';

export default ScaledSheet.create({
  containerCenter: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  flexOne: {flex: 1},
  flexRow: {flexDirection: 'row'},
  container: {
    flex: 1,
    backgroundColor: colorPalates.AppTheme.background,
  },
});
