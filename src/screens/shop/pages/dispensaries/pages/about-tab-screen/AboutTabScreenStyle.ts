import {ms, ScaledSheet} from 'react-native-size-matters';
import {colorPalates, fonts} from 'theme';
import colors from 'theme/colors/colors';

export default ScaledSheet.create({
  container: {
    backgroundColor: colorPalates.AppTheme.background,
  },
  column: {flexDirection: 'column', paddingHorizontal: ms(16)},
  row: {
    flexDirection: 'row',
    marginTop: ms(5),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  aboutTxt: {
    fontSize: ms(12),
    fontFamily: fonts.primaryRegularFont,
    color: colors.blackShade02,
    marginLeft: ms(10),
  },
  callText:{
    fontSize: ms(12),
    fontFamily: fonts.primaryRegularFont,
    color: colors.blueShade02,
    marginLeft: ms(10),
  },
  locationColumn: {
    flexDirection: 'column',
    flex: 2,
  },
  locationColumn1: {
    flexDirection: 'column',
    flex: 2,
    alignItems: 'flex-end',
  },
  mapButton: {
    borderWidth: 2,
    borderRadius: ms(50),
    paddingHorizontal: ms(10),
    width: ms(120),
    height: ms(40),
    borderColor: colors.greenShade2A,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapBtnText: {
    fontSize: ms(14),
    fontFamily: fonts.primaryMediumFont,
    color: colors.greenShade2A,
  },
  map: {
    height: ms(150),
    width: '100%',
    marginVertical: ms(10),
  },
  icon: {
    width: ms(16),
    height: ms(16),
  },
  bottomText: {
    fontFamily: fonts.primaryRegularFont,
    fontSize: ms(12),
    marginBottom: 10,
    color: colorPalates.grayShade80,
  },
});
