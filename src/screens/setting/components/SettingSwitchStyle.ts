import {ms, ScaledSheet} from 'react-native-size-matters';
import {colorPalates} from 'theme';

export default ScaledSheet.create({
  container: {flex: 1},
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: ms(16),
    //marginTop: ms(16),
  },
  switchTitle: {fontSize: ms(16), color: colorPalates.blackShade20},
});
