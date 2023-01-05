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
  aboutGreenLyncTextContainer: {
    textAlign: 'justify',
    marginHorizontal: ms(20),
    fontSize: ms(14),
    marginTop: ms(25),
    color: colorPalates.blackShade20,
  },
  unorderedListContainer: {
    flexDirection: 'row',
    marginHorizontal: ms(20),
  },
  listStyleContainer: {
    color: colorPalates.blackShade02,
    fontSize: ms(14),
  },
  listStyleText: {
    marginLeft: ms(10),
    fontSize: ms(14),
    color: colorPalates.blackShade20,
  },
  mainCOntainer: {
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
