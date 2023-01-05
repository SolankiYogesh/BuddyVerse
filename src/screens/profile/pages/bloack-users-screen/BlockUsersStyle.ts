import {ScaledSheet} from 'react-native-size-matters';
import {colorPalates} from '../../../../theme';
export const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalates.white,
  },
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
  },
  img: {
    tintColor: colorPalates.AppTheme.primary,
    width: '50%',
    height: '50%',
  },
});
