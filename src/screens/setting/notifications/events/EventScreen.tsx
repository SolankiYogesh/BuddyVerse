import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {ms} from 'react-native-size-matters';
import SettingHeader from 'screens/setting/components/SettingHeader';
import SettingSwitch from 'screens/setting/components/SettingSwitch';
import {colorPalates, fonts} from 'theme';
import EventScreenStyle from './EventScreenStyle';

const EventScreen = () => {
  return (
    <SafeAreaView style={{marginBottom: ms(56)}}>
      <SettingHeader title="Events" />
      <ScrollView>
        <View style={EventScreenStyle.switchButtonContainer}>
          <SettingSwitch title="Show Notifications" />
        </View>
        <View style={EventScreenStyle.switchButtonContainer}>
          <SettingSwitch title="Sound" />
        </View>
        <View style={EventScreenStyle.switchButtonContainer}>
          <SettingSwitch title="Vibration" />
        </View>
        <View style={EventScreenStyle.switchButtonContainer}>
          <SettingSwitch title="Show on the lock screen" />
        </View>

        <View>
          <Text
            style={{
              fontFamily: fonts.primarySemiBoldFont,
              color: colorPalates.AppTheme.text,
              fontSize: ms(12),
              marginTop: ms(20),
              marginLeft: ms(16),
              marginBottom: ms(9),
            }}
          >
            RECEIVE NOTIFICATIONS FOR
          </Text>
          <View style={EventScreenStyle.switchButtonContainer}>
            <SettingSwitch title="Activity" />
          </View>
          <View style={EventScreenStyle.switchButtonContainer}>
            <SettingSwitch title="Reminders" />
          </View>
          <View style={EventScreenStyle.switchButtonContainer}>
            <SettingSwitch title="Changes and updates" />
          </View>
          <View style={EventScreenStyle.switchButtonContainer}>
            <SettingSwitch title="Event subscriptions" />
          </View>
          <View style={EventScreenStyle.switchButtonContainer}>
            <SettingSwitch title="Suggestions" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default EventScreen;
