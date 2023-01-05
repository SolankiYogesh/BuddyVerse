import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {ms} from 'react-native-size-matters';
import SettingHeader from 'screens/setting/components/SettingHeader';
import SettingSwitch from 'screens/setting/components/SettingSwitch';
import FollowingAndFollowScreenStyle from './FollowingAndFollowScreenStyle';

const FollowingAndFollowScreen = () => {
  return (
    <SafeAreaView style={FollowingAndFollowScreenStyle.container}>
      <SettingHeader title="Following & Followers" />
      <View style={{marginTop: ms(16)}}>
        <View style={FollowingAndFollowScreenStyle.switchContainer}>
          <SettingSwitch title="Show Notification" />
        </View>
        <View style={FollowingAndFollowScreenStyle.switchContainer}>
          <SettingSwitch title="Sound" />
        </View>
        <View style={FollowingAndFollowScreenStyle.switchContainer}>
          <SettingSwitch title="Vibration" />
        </View>
        <View style={FollowingAndFollowScreenStyle.switchContainer}>
          <SettingSwitch title="Show on the lock screen" />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default FollowingAndFollowScreen;
