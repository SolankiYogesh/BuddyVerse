import {ms, ScaledSheet} from 'react-native-size-matters';
import {colorPalates, fonts} from 'theme';

export default ScaledSheet.create({
  container: {
    width: '100%',
  },
  tabBarContainer: {
    flexDirection: 'row',
    borderBottomWidth: 0.8,
    borderBottomColor: colorPalates.grayShade80,
    marginBottom: ms(8),
  },
  tabBarButton: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: colorPalates.blackShade02,
    paddingBottom: ms(12),
    height: ms(50),
    flexDirection: 'column',
  },
  tabBarTitle: {fontSize: ms(14), fontFamily: fonts.primaryRegularFont},
});
