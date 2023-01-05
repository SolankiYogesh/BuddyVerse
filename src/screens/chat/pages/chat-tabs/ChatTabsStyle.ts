import {Platform} from 'react-native';
import {ScaledSheet, vs} from 'react-native-size-matters';
import colorPalates from '../../../../theme/colors/colorPalates';

export default ScaledSheet.create({
  containerF2: {
    flex: 1,
    backgroundColor: colorPalates.white,
    paddingTop: Platform.OS === 'ios' ? vs(50) : 0,
  },
});
