import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {ms} from 'react-native-size-matters';
import SettingHeader from 'screens/setting/components/SettingHeader';
import SettingSwitch from 'screens/setting/components/SettingSwitch';
import FeedAndCommentScreenStyle from './FeedAndCommentScreenStyle';

const FeedAndCommentScreen = () => {
  return (
    <SafeAreaView style={FeedAndCommentScreenStyle.container}>
      <SettingHeader title="Feed & Comments" />
      <View style={{marginTop: ms(16)}}>
        <View style={FeedAndCommentScreenStyle.switchContainer}>
          <SettingSwitch title="Show Notification" />
        </View>
        <View style={FeedAndCommentScreenStyle.switchContainer}>
          <SettingSwitch title="Sound" />
        </View>
        <View style={FeedAndCommentScreenStyle.switchContainer}>
          <SettingSwitch title="Vibration" />
        </View>
        <View style={FeedAndCommentScreenStyle.switchContainer}>
          <SettingSwitch title="Show on the lock screen" />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default FeedAndCommentScreen;
