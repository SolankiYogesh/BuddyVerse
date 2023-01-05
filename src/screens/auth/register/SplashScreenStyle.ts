import {ms, ScaledSheet} from 'react-native-size-matters';
import {colorPalates} from 'theme';

export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalates.blackShade20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {fontSize: ms(16)},
  greenLyncLogo: {
    height: ms(128),
    width: ms(128),
  },
  welcomeText: {
    color: '#E6E6E9',
    fontSize: ms(32),
    marginTop: ms(24),
    fontWeight: 'bold',
  },
});
