import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import ScreenHeader from 'screens/feed/components/screen-header/ScreenHeader';
import SettingSwitch from 'screens/setting/components/SettingSwitch';
import MyLocationScreenStyle from './MyLocationScreenStyle';

const MyLocationScreen = () => {
  return (
    <SafeAreaView style={MyLocationScreenStyle.container}>
      {/* <SettingHeader title="My Location" /> */}
      <ScreenHeader isBackVisible={true} title="My Loaction" />

      <View style={MyLocationScreenStyle.switchButton}>
        <SettingSwitch title="Share my location" />
        <Text style={MyLocationScreenStyle.switchButtonSmallText}>
          Everyone will see your location
        </Text>
      </View>
    </SafeAreaView>
  );
};
export default MyLocationScreen;
