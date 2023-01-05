import {Dimensions} from 'react-native';
import {ms, ScaledSheet} from 'react-native-size-matters';
import {colorPalates} from 'theme';
import colors from '../../../../theme/colors/colors';

export default ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: ms(40),
    padding: ms(16),
    width: '100%',
    justifyContent: 'space-between',
  },
  leftContainer: {minWidth: ms(48), zIndex: 1000},

  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    position: 'absolute',
  },
  headerTitle: {fontSize: ms(16), fontWeight: '600', color: colorPalates.black},
  rightContainer: {
    flexDirection: 'row',
    // minWidth: 55,
    justifyContent: 'space-between',
  },
  rightIcon: {height: ms(20), width: ms(20), tintColor: colors.blackShade02},
  badgeRightIcon: {
    position: 'absolute',
    right: 1,
    top: 1,
  },
  profileImage: {width: ms(32), height: ms(32), borderRadius: 1000},
});
