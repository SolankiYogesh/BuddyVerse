import {ms, ScaledSheet} from 'react-native-size-matters';
import {colorPalates} from 'theme';

export default ScaledSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 1000,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  header: {fontSize: ms(16)},
  greenLyncLogoContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: ms(246),
  },
  greenLyncText: {
    color: colorPalates.white,
    fontSize: ms(40),
    textAlign: 'center',
  },
});
