import {ms, ScaledSheet} from 'react-native-size-matters';
import {colorPalates} from 'theme';

export default ScaledSheet.create({
  container: {flex: 1, backgroundColor: colorPalates.white},
  headerTitle: {
    fontSize: ms(32),
    marginLeft: ms(24),
    marginTop: ms(16),
    color: colorPalates.blackShade02,
    fontWeight: 'bold',
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
  subHeaderTitle: {
    marginRight: ms(24),
    fontSize: ms(18),
    fontWeight: '600',
    color: colorPalates.blackShade20,
    marginLeft: ms(24),
    marginTop: ms(24),
  },
  termsOfUseTextContainer: {
    textAlign: 'justify',
    marginHorizontal: ms(24),
    marginTop: ms(20),
    color: colorPalates.blackShade20,
  },
});
