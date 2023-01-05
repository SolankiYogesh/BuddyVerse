import React, {useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {ms} from 'react-native-size-matters';
import ScreenHeader from 'screens/feed/components/screen-header/ScreenHeader';
import SettingHeader from 'screens/setting/components/SettingHeader';
import {colorPalates} from 'theme';
import ChatScreenSettingStyle from './ChatScreenSettingStyle';

const AllowRequestContainer = () => {
  const [chatRequestEveryone, setCheckedEveryone] = useState('true');
  const [chatRequestFollow, setCheckedFollow] = useState('false');
  const onPressChatRequestEveryone = () => {
    if (chatRequestEveryone === 'false') {
      setCheckedEveryone('true');
    } else {
      setCheckedEveryone('false');
    }
  };
  const onPressChatRequestFollow = () => {
    if (chatRequestFollow === 'false') {
      setCheckedFollow('true');
    } else {
      setCheckedFollow('false');
    }
  };
  return (
    <View style={{marginTop: ms(9)}}>
      <View style={ChatScreenSettingStyle.radioButton}>
        <Text style={ChatScreenSettingStyle.radioButtonTitle}>Everyone</Text>
        <RadioButton
          color={colorPalates.AppTheme.primary}
          value="true"
          status={chatRequestEveryone === 'true' ? 'checked' : 'unchecked'}
          onPress={onPressChatRequestEveryone}
        />
      </View>
      <View style={ChatScreenSettingStyle.radioButton}>
        <Text style={ChatScreenSettingStyle.radioButtonTitle}>
          People I Follow
        </Text>
        <RadioButton
          color={colorPalates.AppTheme.primary}
          value="true"
          status={chatRequestFollow === 'true' ? 'checked' : 'unchecked'}
          onPress={onPressChatRequestFollow}
        />
      </View>
    </View>
  );
};
const GroupChatContainer = () => {
  const [groupChatEveryone, setCheckedEveryone] = useState('true');
  const [groupChatFollowers, setCheckedFollowers] = useState('false');
  const [groupChatOff, setCheckedOff] = useState('false');

  const onPressGroupChatEveryone = () => {
    if (groupChatEveryone === 'false') {
      setCheckedEveryone('true');
    } else {
      setCheckedEveryone('false');
    }
  };
  const onPressGroupChatFollowers = () => {
    if (groupChatFollowers === 'false') {
      setCheckedFollowers('true');
    } else {
      setCheckedFollowers('false');
    }
  };
  const onPressGroupChatOff = () => {
    if (groupChatOff === 'false') {
      setCheckedOff('true');
    } else {
      setCheckedOff('false');
    }
  };
  return (
    <View style={{marginTop: ms(9)}}>
      <View style={ChatScreenSettingStyle.radioButton}>
        <Text style={ChatScreenSettingStyle.radioButtonTitle}>Everyone</Text>
        <RadioButton
          color={colorPalates.AppTheme.primary}
          value="true"
          status={groupChatEveryone === 'true' ? 'checked' : 'unchecked'}
          onPress={onPressGroupChatEveryone}
        />
      </View>

      <View style={ChatScreenSettingStyle.radioButton}>
        <Text style={ChatScreenSettingStyle.radioButtonTitle}>
          Your Followers
        </Text>
        <RadioButton
          color={colorPalates.AppTheme.primary}
          value="true"
          status={groupChatFollowers === 'true' ? 'checked' : 'unchecked'}
          onPress={onPressGroupChatFollowers}
        />
      </View>
      <View style={ChatScreenSettingStyle.radioButton}>
        <Text style={ChatScreenSettingStyle.radioButtonTitle}>Off</Text>
        <RadioButton
          color={colorPalates.AppTheme.primary}
          value="true"
          status={groupChatOff === 'true' ? 'checked' : 'unchecked'}
          onPress={onPressGroupChatOff}
        />
      </View>
    </View>
  );
};
const ChatSettingScreen = () => {
  return (
    <SafeAreaView>
      {/* <SettingHeader title="Chat" /> */}
      <ScreenHeader isBackVisible={true} title="Chat" />

      <Text style={ChatScreenSettingStyle.header}>ALLOW REQUESTS FROM</Text>
      <View>
        <AllowRequestContainer />
        <Text style={ChatScreenSettingStyle.header}>GROUP CHATS</Text>
        <Text style={ChatScreenSettingStyle.groupChatText}>
          Who can add you to group chats
        </Text>
      </View>
      <GroupChatContainer />
    </SafeAreaView>
  );
};
export default ChatSettingScreen;
