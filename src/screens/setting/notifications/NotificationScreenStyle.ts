import {ms, ScaledSheet} from 'react-native-size-matters';
import colorPalates from '../../../theme/colors/colorPalates';

export default ScaledSheet.create({
  container: {flex: 1, backgroundColor: colorPalates.white},
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: ms(16),
  },
  mainContainer: {
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
    paddingTop: ms(10),
  },
});
