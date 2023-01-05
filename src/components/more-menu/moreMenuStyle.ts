import {Platform} from 'react-native';
import {ScaledSheet, ms} from 'react-native-size-matters';
import {colorPalates, fonts} from 'theme';

export const styles = ScaledSheet.create({
  flex: {flex: 1},
  absoluteBackground: {
    position: 'absolute',
    bottom: '100%',
    width: '100%',
    height: '100%',
    backgroundColor: colorPalates.blackShade20,
    opacity: 0.5,
  },
  outerContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'android' ? '-550%' : '-500%',
    left: '30%',
    width: ms(500),
    height: ms(500),
  },

  container: {
    width: ms(250),
    height: ms(250),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  circlesContainer: {
    width: ms(60),
    height: ms(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  circles: {
    width: ms(48),
    height: ms(48),
    backgroundColor: colorPalates.greenShade2A,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 48,
    elevation: 5,
  },
  icon: {
    width: ms(24),
    height: ms(24),
    tintColor: colorPalates.white,
  },
  titleName: {
    color: colorPalates.white,
    fontFamily: fonts.primaryMediumFont,
    fontSize: ms(12),
    fontWeight: '500',
    alignSelf: 'center',
  },
});
