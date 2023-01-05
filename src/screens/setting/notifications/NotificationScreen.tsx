import React from 'react';
import {Text, SafeAreaView, View} from 'react-native';
import {ms} from 'react-native-size-matters';
import SettingSwitch from '../components/SettingSwitch';
import NotificationScreenStyle from './NotificationScreenStyle';
import ScreenHeader from 'screens/feed/components/screen-header/ScreenHeader';
import {colorPalates} from 'theme';

const NotificationScreen = () => {
  // const onPressFeedAndComment = () => {
  //   navigation.navigate(screenNameEnum.FeedAndCommentScreen);
  // };
  // const onPressFollowingAndFollow = () => {
  //   navigation.navigate(screenNameEnum.FollowingAndFollowScreen);
  // };
  // const onPressMessage = () => {
  //   navigation.navigate(screenNameEnum.MessageScreen);
  // };
  // const onPressEvent = () => {
  //   navigation.navigate(screenNameEnum.EventScreen);
  // };
  return (
    <SafeAreaView style={NotificationScreenStyle.container}>
      {/* <SettingHeader title="Notifications" /> */}
      <ScreenHeader isBackVisible={true} title="Notifications" />
      <View style={NotificationScreenStyle.mainContainer}>
        <SettingSwitch title="Pause All" />
        <Text style={{marginLeft: ms(16), color: colorPalates.grayShade8F}}>
          Pause all notifications
        </Text>
      </View>
      {/* <SettingButton
        title="Feed & Comments"
        onPressButton={onPressFeedAndComment}
      />
      <SettingButton
        title="Following & Followers"
        onPressButton={onPressFollowingAndFollow}
      />
      <SettingButton title="Messages" onPressButton={onPressMessage} />
      <SettingButton title="Events" onPressButton={onPressEvent} /> */}
    </SafeAreaView>
  );
};
export default NotificationScreen;
