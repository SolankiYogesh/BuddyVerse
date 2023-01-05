import React, {useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {ms} from 'react-native-size-matters';
import SettingHeader from 'screens/setting/components/SettingHeader';
import SettingSwitch from 'screens/setting/components/SettingSwitch';
import {colorPalates} from 'theme';
import MessageScreenStyle from './MessageScreenStyle';

const VideoChatContainer = () => {
  const [offRadioButton, setCheckedOff] = useState('true');
  const [followRadioButton, setCheckedFollow] = useState('false');
  const [everyOneRadioButton, setCheckedEveryOne] = useState('true');
  const offVideoChats = () => {
    if (offRadioButton === 'false') {
      setCheckedOff('true');
    } else {
      setCheckedOff('false');
    }
  };
  const followVideoChats = () => {
    if (followRadioButton === 'false') {
      setCheckedFollow('true');
    } else {
      setCheckedFollow('false');
    }
  };
  const everyOneVideoChats = () => {
    if (everyOneRadioButton === 'false') {
      setCheckedEveryOne('true');
    } else {
      setCheckedEveryOne('false');
    }
  };
  return (
    <View>
      <View style={MessageScreenStyle.videoChatsContainer}>
        <Text style={MessageScreenStyle.videoChatTitle}>VIDEO CHATS</Text>
      </View>
      <View style={MessageScreenStyle.radioButton}>
        <Text style={MessageScreenStyle.radioButtonTitle}>Off</Text>
        <RadioButton
          color={colorPalates.AppTheme.primary}
          value="true"
          status={offRadioButton === 'true' ? 'checked' : 'unchecked'}
          onPress={offVideoChats}
        />
      </View>
      <View style={MessageScreenStyle.radioButton}>
        <Text style={MessageScreenStyle.radioButtonTitle}>
          From people I follow
        </Text>
        <RadioButton
          color={colorPalates.AppTheme.primary}
          value="true"
          status={followRadioButton === 'true' ? 'checked' : 'unchecked'}
          onPress={followVideoChats}
        />
      </View>
      <View style={MessageScreenStyle.radioButton}>
        <Text style={MessageScreenStyle.radioButtonTitle}>From Everyone</Text>
        <RadioButton
          color={colorPalates.AppTheme.primary}
          value="true"
          status={everyOneRadioButton === 'true' ? 'checked' : 'unchecked'}
          onPress={everyOneVideoChats}
        />
      </View>
    </View>
  );
};
const MessageScreen = () => {
  return (
    <SafeAreaView style={MessageScreenStyle.container}>
      <SettingHeader title="Messages" />
      <View style={{marginTop: ms(16)}}>
        <View style={MessageScreenStyle.switchContainer}>
          <SettingSwitch title="Show Notification" />
        </View>
        <View style={MessageScreenStyle.switchContainer}>
          <SettingSwitch title="Sound" />
        </View>
        <View style={MessageScreenStyle.switchContainer}>
          <SettingSwitch title="Vibration" />
        </View>
        <View style={MessageScreenStyle.switchContainer}>
          <SettingSwitch title="Show on the lock screen" />
        </View>
        <VideoChatContainer />
      </View>
    </SafeAreaView>
  );
};
export default MessageScreen;
