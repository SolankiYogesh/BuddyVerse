import {StyleSheet} from 'react-native';
import {ms, s, ScaledSheet} from 'react-native-size-matters';
import colorPalates from '../../../../theme/colors/colorPalates';
import fonts from '../../../../theme/fonts/fonts';

export const styles = ScaledSheet.create({
  container: {flex: 1},
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colorPalates.grayShade80,
  },
  tabBarButton: {
    marginHorizontal: s(16),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: colorPalates.AppTheme.primary,
    paddingBottom: ms(12),
    width: '40%',
  },
  tabBarTitle: {fontSize: ms(14), fontFamily: fonts.primaryRegularFont},
});
