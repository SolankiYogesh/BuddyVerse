import {ms, ScaledSheet} from 'react-native-size-matters';
import { colorPalates } from 'theme';
import colors from 'theme/colors/colors';

export default ScaledSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: ms(50),
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: ms(10),
  },
  container: {
    height: ms(50),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.grayShadeBorder,
    borderRadius: ms(10),
    paddingHorizontal: ms(10),
    width: '80%',
  },
  searchIcon: {
    width: ms(20),
    height: ms(20),
    tintColor: colors.grayShade80,
  },
  editIcon: {
    width: '100%',
    height: '100%',
    tintColor: colors.white,
  },
  btnView: {
    width: ms(50),
    height: ms(50),
    borderRadius: ms(10),
    overflow: 'hidden',
  },
  inputContainer: {
    flex: 1,
    color:colorPalates.AppTheme.text
  },
  gradientContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: ms(15),
  },
});
