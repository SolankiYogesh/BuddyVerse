import {ms, ScaledSheet} from 'react-native-size-matters';
import colors from 'theme/colors/colors';

export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  videoContainer: {
    flex: 1,
  },
  backImage: {
    width: ms(30),
    height: ms(30),
    tintColor: colors.white,
  },
  header: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, .5)',
    height: ms(45),
    justifyContent: 'center',
    paddingHorizontal: ms(10),
    zIndex: 1000,
    position: 'absolute',
    top: 45,
  },
  loadingContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
