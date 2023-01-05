import {ms, s, ScaledSheet} from 'react-native-size-matters';
import {fonts} from 'theme';
import colors from 'theme/colors/colors';
import colorPalates from '../../../../theme/colors/colorPalates';

export default ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  searchView: {
    width: '90%',
    alignSelf: 'center',
    padding: ms(10),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: ms(10),
    borderColor: colors.grayShadeE6,
    height: ms(50),
  },
  imageView: {
    width: ms(18),
    height: ms(18),
    tintColor: colors.grayShade80,
  },
  input: {
    flex: 1,
    padding: 0,
    marginLeft: ms(10),
  },
  btnContainer: {
    alignSelf: 'center',
    width: '90%',
    marginBottom: s(15),
  },
  btnSubContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: ms(10),
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%',
    marginVertical: ms(5),
    alignSelf: 'center',
  },
  rowItemVIew: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: ms(10),
    overflow: 'hidden',
    marginVertical: ms(5),
  },
  textName: {
    fontSize: ms(14),
    fontFamily: fonts.primaryMediumFont,
    color: colors.blackShade02,
  },
  noUsersView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: ms(16),
    fontFamily: fonts.primaryMediumFont,
    fontWeight: '500',
    color: colors.white,
  },
  profileView: {
    marginRight: ms(5),
  },
  viewContainer: {
    flex: 1,
    backgroundColor: colors.background,
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
    paddingTop: s(20),
  },
});
