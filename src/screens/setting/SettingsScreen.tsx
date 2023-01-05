import React from 'react';
import {SafeAreaView, View} from 'react-native';
import SettingHeader from './components/SettingHeader';
import SettingButton from './components/SettingButton';
import {useNavigation} from '@react-navigation/native';
import screenNameEnum from 'models/screenNameEnum';
import ScreenHeader from 'screens/feed/components/screen-header/ScreenHeader';

const SettingsScreen = () => {
  const navigation = useNavigation();

  const onPressButtonNotification = () => {
    navigation.navigate(screenNameEnum.NotificationScreen);
  };
  const onPressButtonPrivacyAndSecurity = () => {
    navigation.navigate(screenNameEnum.PrivacyAndSecurityScreen);
  };
  const onPressButtonLegalScreen = () => {
    navigation.navigate(screenNameEnum.LegalScreen);
  };
  const onPressButtonSupport = () => {
    navigation.navigate(screenNameEnum.SupportScreen);
  };
  return (
    <SafeAreaView>
      <ScreenHeader isBackVisible={true} title="Setting" />
      <View>
        <SettingButton
          title="Notifications"
          onPressButton={onPressButtonNotification}
        />
        {/* <SettingButton
          title="Privacy and Security"
          onPressButton={onPressButtonPrivacyAndSecurity}
        /> */}
        {/* <SettingButton title="Updates" />
        <SettingButton title="FAQ" />
        <SettingButton title="Support" /> */}
        {/* <SettingButton title="Legal" onPressButton={onPressButtonLegalScreen} />
        <SettingButton
          title="Support"
          onPressButton={onPressButtonSupport}
        /> */}
      </View>
    </SafeAreaView>
  );
};
export default SettingsScreen;
