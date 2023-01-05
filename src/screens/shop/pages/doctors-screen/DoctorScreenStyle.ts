import {Dimensions} from 'react-native';
import {ms, s, ScaledSheet, vs} from 'react-native-size-matters';
import {colorPalates, fonts} from 'theme';
import colors from 'theme/colors/colors';

export const styles = ScaledSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: colorPalates.white,
  },
  mainViewContainer: {
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
  },
  container: {
    flex: 1,
    backgroundColor: colorPalates.white,
  },
  placeListMainStyle: {
    width: '97%',
    paddingHorizontal: ms(16),
    margin: 0,
    position: 'absolute',
    top: 55,
    zIndex: 1000,
    backgroundColor: '#ffffff',
  },
  placeText: {
    flex: 1,
    paddingVertical: ms(10),
  },
  placeContainerStyle: {
    borderBottomEndRadius: ms(5),
    borderBottomStartRadius: ms(5),
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopColor: colorPalates.AppTheme.container,
    borderLeftColor: colorPalates.AppTheme.container,
    borderRightColor: colorPalates.AppTheme.container,
    flexGrow: 1,
  },
  placeContainer: {
    width: '100%',
    justifyContent: 'center',
    borderBottomWidth: 1,
    paddingLeft: ms(15),
    borderBottomColor: colorPalates.AppTheme.container,
    alignItems: 'flex-start',
  },
  indicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vs(10),
    marginHorizontal: s(16),
  },
  bottomLoader: {
    width: '100%',
    height: vs(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  search: {
    flexDirection: 'row',
    height: ms(50),
    paddingHorizontal: s(10),
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    fontSize: ms(14),
    fontFamily: fonts.primaryRegularFont,
    paddingHorizontal: s(10),
    color: colorPalates.black,
  },
  searchBar: {
    flex: 1,
    marginRight: ms(10),
    borderWidth: ms(1),
    borderRadius: ms(10),
    borderColor: colorPalates.AppTheme.container,
    lineHeight: ms(4),
  },
  settingsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearGradient: {
    borderRadius: ms(10),
    width: ms(50),
    height: ms(50),
    alignItems: 'center',
    justifyContent: 'center',
  },

  mapIconContainer: {
    backgroundColor: colors.white,
    borderRadius: ms(56),
    borderWidth: 1,
    borderColor: colors.grayShade80,
    height: ms(45),
    width: ms(45),
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    right: '10%',
    bottom: '8%',
    shadowColor: colors.grayShade80,
    shadowOffset: {
      width: 1,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5.22,
    elevation: 4,
    zIndex: 1000,
  },
  mapIcon: {
    width: ms(20),
    height: ms(20),
  },
  icon: {
    width: ms(20),
    height: ms(20),
  },
  noDataFoundView: {
    flex: 1,
    justifyContent: 'center',
    top: -150,
    alignItems: 'center',
  },
  noDataFoundText: {
    fontSize: ms(15),
    fontFamily: fonts.primaryMediumFont,
    color: colorPalates.grayShade80,
  },
  scrollContainer: {
    height: Dimensions.get('window').height,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
