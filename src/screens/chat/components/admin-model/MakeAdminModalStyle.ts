import {ms, ScaledSheet} from 'react-native-size-matters';
import colors from 'theme/colors/colors';
export const styles = ScaledSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: ms(10),
    elevation: 5,
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: ms(10),
    width: '100%',
  },
});
