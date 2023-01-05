import {ms, ScaledSheet} from 'react-native-size-matters';
import {colorPalates} from 'theme';

export default ScaledSheet.create({
  container: {
    height: ms(48),
    minWidth: ms(48),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorPalates.AppTheme.primaryButtonColor,
    borderRadius: ms(8),
    overflow: 'hidden',
  },
  linearGradientContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTextStyle: {
    color: colorPalates.AppTheme.primaryButtonTextColor,
    fontSize: ms(16),
  },
});
