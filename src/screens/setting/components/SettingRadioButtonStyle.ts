import {ms, ScaledSheet} from 'react-native-size-matters';
import {colorPalates} from 'theme';

export default ScaledSheet.create({
  container: {flex: 1},
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: ms(16),
    height: ms(56),
  },
  radioButtonTitle: {
    fontSize: ms(16),
    color: colorPalates.blackShade02,
  },
});
