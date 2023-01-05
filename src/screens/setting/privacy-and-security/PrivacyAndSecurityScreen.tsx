import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import SettingHeader from '../components/SettingHeader';
import SettingButton from '../components/SettingButton';
import PrivacyAndSecurityScreenStyle from './PrivacyAndSecurityScreenStyle';
import {useNavigation} from '@react-navigation/native';
import screenNameEnum from 'models/screenNameEnum';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const onPressActivity = () => {
    navigation.navigate(screenNameEnum.ActivityScreen);
  };
  const onPressChatSetting = () => {
    navigation.navigate(screenNameEnum.ChatSettingScreen);
  };
  const onPressMyLocation = () => {
    navigation.navigate(screenNameEnum.MyLocationScreen);
  };
  const onPressAppUpdate = () => {
    navigation.navigate(screenNameEnum.AppUpdateScreen);
  };
  return (
    <SafeAreaView>
      <SettingHeader title="Privacy & Security" />
      <View>
        <Text style={PrivacyAndSecurityScreenStyle.header}>PRIVACY</Text>
        <SettingButton title="Activity" onPressButton={onPressActivity} />
        <SettingButton title="Chat" onPressButton={onPressChatSetting} />
        <SettingButton title="My Location" onPressButton={onPressMyLocation} />
        <SettingButton title="App Updates" onPressButton={onPressAppUpdate} />
      </View>
    </SafeAreaView>
  );
};
export default SettingsScreen;
