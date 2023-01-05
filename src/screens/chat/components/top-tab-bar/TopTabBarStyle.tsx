import {StyleSheet} from 'react-native';
import {ms, ScaledSheet} from 'react-native-size-matters';
import colorPalates from '../../../../theme/colors/colorPalates';
import fonts from '../../../../theme/fonts/fonts';

export default ScaledSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colorPalates.grayShade80,
    marginBottom: ms(8),
  },
  tabBarButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: colorPalates.AppTheme.primary,
    paddingBottom: ms(12),
  },
  tabBarTitle: {fontSize: ms(14), fontFamily: fonts.primaryRegularFont, color: colorPalates.grayShade80},
});
