import {ms, ScaledSheet, vs} from 'react-native-size-matters';
import colors from '../../theme/colors/colors';

export default ScaledSheet.create({
  feedImage: {
    borderRadius: ms(10),
    width: '100%',
  },
  feedVideo: {
    width: '100%',
    aspectRatio: 1,
    marginTop: ms(24),
    alignSelf: 'center',
    borderRadius: ms(10),
  },
  container: {
    width: '100%',
    overflow: 'hidden',
    shadowOpacity: 0.7,
    shadowRadius: 3,
    borderRadius: ms(20),
  },
  videoContainer: {
    width: '100%',
    position: 'absolute',
  },
  loaderConntainer: {
    flex: 1,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  landScapeStyle: {
    height: vs(300),
  },
  portaiteStyle: {
    height: vs(463),
  },
  loaderContainer: {
    width: '100%',
    minHeight: 100,
    borderRadius: ms(10),
    overflow: 'hidden',
    position: 'absolute',
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playImg: {
    justifyContent: 'center',
    width: ms(76),
    height: ms(76),
    borderRadius: ms(76),
  },
  mutedView: {
    borderRadius: ms(300),
    width: vs(20),
    height: vs(20),
    backgroundColor: '#02091F',
    opacity: 0.7,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  mutedStyle: {
    width: '45%',
    height: '45%',
    tintColor: colors.white,
  },
  parentView: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
