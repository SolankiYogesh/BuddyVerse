import {ms, ScaledSheet} from 'react-native-size-matters';
import {colorPalates} from 'theme';

export default ScaledSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: ms(40),
    padding: ms(16),
  },
  leftContainer: {minWidth: ms(48)},
  titleContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  headerTitle: {
    fontSize: ms(16),
    fontWeight: '600',
    color: colorPalates.blackShade02,
  },
  rightContainer: {
    flexDirection: 'row',
    minWidth: 48,
    justifyContent: 'space-between',
  },
  rightIcon: {height: ms(20), width: ms(20)},
  badgeRightIcon: {
    position: 'absolute',
    right: 1,
    top: 1,
  },
  profileImage: {width: ms(32), height: ms(32), borderRadius: 1000},
});
