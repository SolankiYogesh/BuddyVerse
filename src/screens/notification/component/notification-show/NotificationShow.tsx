import React from 'react';
import {View, Text, Image} from 'react-native';
import ScreenHeader from '../screen-header/ScreenHeader';
import {ms, ScaledSheet} from 'react-native-size-matters';
import {images, fonts} from 'theme';
import colors from 'theme/colors/colors';

const NotificationShow = (props: any) => {
  return (
    <View>
      <ScreenHeader props={props} isBackVisible={true} />
      <View style={styles.notification}>
        <Image source={images.art} />
        <Text style={styles.notificationtext}> No Notifications</Text>
        <Text style={styles.smalltext}>
          You have not received any notification yet.
        </Text>
      </View>
    </View>
  );
};

export default NotificationShow;

const styles = ScaledSheet.create({
  notification: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: ms(60),
  },
  notificationtext: {
    paddingTop: ms(20),
    fontFamily: fonts.primarySemiBoldFont,
    fontSize: ms(24),
    color: colors.blackShade02,
  },
  smalltext: {
    color: colors.grayShade80,
    fontFamily: fonts.primaryMediumFont,
    fontSize: ms(16),
    paddingTop: ms(10),
  },
});
