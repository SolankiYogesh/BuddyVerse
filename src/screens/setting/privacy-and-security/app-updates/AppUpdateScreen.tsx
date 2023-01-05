import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {ms} from 'react-native-size-matters';
import ScreenHeader from 'screens/feed/components/screen-header/ScreenHeader';
import SettingHeader from 'screens/setting/components/SettingHeader';
import SettingSwitch from 'screens/setting/components/SettingSwitch';
import AppUpdateScreenStyle from './AppUpdateScreenStyle';

const AppUpdateScreen = () => {
  return (
    <SafeAreaView>
      {/* <SettingHeader title="Updates" /> */}
      <ScreenHeader isBackVisible={true} title="Updates" />
      <View style={{marginTop: ms(16)}}>
        <View style={{paddingTop: ms(18)}}>
          <SettingSwitch title="Automatically update GreenLync" />
          <Text style={AppUpdateScreenStyle.switchSmallTextContainer}>
            Allow us to auto-update the app over Wi-Fi
          </Text>
        </View>
        <Text style={{marginTop: ms(16), fontSize: ms(12), marginLeft: ms(16)}}>
          ALLOW REQUESTS FROM
        </Text>
        <View style={{marginTop: ms(9)}}>
          <View style={{paddingTop: ms(18)}}>
            <SettingSwitch title="GreenLync update available" />
            <Text style={AppUpdateScreenStyle.switchSmallTextContainer}>
              Be notified when we have available updates
            </Text>
          </View>
          <View style={{paddingTop: ms(18)}}>
            <SettingSwitch title="GreenLync update installed" />
            <Text style={AppUpdateScreenStyle.switchSmallTextContainer}>
              Be notified when we have updated the app
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default AppUpdateScreen;
