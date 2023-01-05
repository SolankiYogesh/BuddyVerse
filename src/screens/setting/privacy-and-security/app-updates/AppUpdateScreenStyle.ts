import {ms, ScaledSheet} from 'react-native-size-matters';
import {colorPalates} from 'theme';

export default ScaledSheet.create({
  container: {flex: 1},
  switchSmallTextContainer: {
    marginLeft: ms(16),
    fontSize: ms(14),
    marginBottom: ms(16),
  },
});
