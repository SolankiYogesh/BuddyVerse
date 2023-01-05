import {ms, ScaledSheet} from 'react-native-size-matters';
import {colorPalates} from 'theme';

export default ScaledSheet.create({
  container: {flex: 1, backgroundColor: colorPalates.white},
  subHeaderTitle: {
    marginRight: ms(24),
    fontSize: ms(18),
    fontWeight: '600',
    color: colorPalates.blackShade20,
    marginLeft: ms(24),
    marginTop: ms(24),
  },
  termsOfUseTextContainer: {
    color: colorPalates.grayShade80,
    marginRight: ms(24),
    fontSize: ms(18),
    fontWeight: '600',
    marginLeft: ms(24),
    marginTop: ms(24),
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
