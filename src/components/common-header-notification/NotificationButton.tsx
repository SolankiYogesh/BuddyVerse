import {TouchableOpacity} from 'react-native';
import React from 'react';
import {ms, ScaledSheet} from 'react-native-size-matters';
import {Badge} from 'react-native-paper';
import {SvgXml} from 'react-native-svg';
import svg from '../../theme/images/svg';

const NotificationButton = ({onPress, isBadge = false}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <SvgXml xml={svg.notificationIconWhite} height={ms(20)} width={ms(20)} />
      {isBadge && <Badge style={styles.badgeRightIcon} size={8} />}
    </TouchableOpacity>
  );
};

export default NotificationButton;

const styles = ScaledSheet.create({
  rightIcon: {height: ms(20), width: ms(20)},
  badgeRightIcon: {
    position: 'absolute',
    right: 1,
    top: 1,
  },
});
