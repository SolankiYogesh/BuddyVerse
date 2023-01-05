import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, SafeAreaView} from 'react-native';
import {ms} from 'react-native-size-matters';
import SettingHeader from 'screens/setting/components/SettingHeader';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {colorPalates} from 'theme';
import ActivityScreenStyle from './ActivityScreenStyle';
import SettingSwitch from 'screens/setting/components/SettingSwitch';
import {RadioButton} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import ScreenHeader from 'screens/feed/components/screen-header/ScreenHeader';
const ActivityScreen = () => {
  const [everyOneComment, setCheckedOff] = useState('true');
  const [friendsOnly, setFriendOnly] = useState('false');
  const [noOneComment, setNoComment] = useState('false');
  const everyCommentRadioButton = () => {
    if (everyOneComment === 'false') {
      setCheckedOff('true');
    } else {
      setCheckedOff('false');
    }
  };
  const friendOnlyCommentRadioButton = () => {
    if (friendsOnly === 'false') {
      setFriendOnly('true');
    } else {
      setFriendOnly('false');
    }
  };
  const noOneCommentRadioButton = () => {
    if (noOneComment === 'false') {
      setNoComment('true');
    } else {
      setNoComment('false');
    }
  };
  const SwitchButton = () => {
    return (
      <View>
        <View style={ActivityScreenStyle.switchContainer}>
          <SettingSwitch title="Hide offensive comments" />
          <Text style={ActivityScreenStyle.switchButtonText}>
            Hide comments that may be offensive from your posts, and live
            streams.
          </Text>
        </View>
        <View style={ActivityScreenStyle.switchContainer}>
          <SettingSwitch title="Manual filter" />
          <Text style={ActivityScreenStyle.switchButtonText}>
            Enter the words or phrase that you want to hide, separated by commas
          </Text>
        </View>
      </View>
    );
  };
  const BlockCommentButton = () => {
    return (
      <View>
        <Text style={{marginTop: ms(16), marginLeft: ms(16), fontSize: ms(14)}}>
          COMMENTS
        </Text>
        <TouchableOpacity style={ActivityScreenStyle.blockCommentButton}>
          <View>
            <Text style={ActivityScreenStyle.blockCommentButtonTitle}>
              Block comments from
            </Text>
          </View>
          <View>
            <View style={ActivityScreenStyle.blockCommentRightContainer}>
              <Text style={{marginRight: ms(10)}}>2 Persons</Text>
              <IconAntDesign size={14} name={'right'} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={{marginBottom:ms(56)}}>
      {/* <SettingHeader title="Activity" /> */}
      <ScreenHeader isBackVisible={true} title="Activity" />
      <ScrollView>

      <BlockCommentButton />
      <SwitchButton />
      <View>
        <TextInput
          style={ActivityScreenStyle.inputTextContainer}
          placeholder="Words separated by commas..."
          placeholderTextColor={colorPalates.grayShadeAB}
          />
      </View>
      <Text style={{marginTop: ms(24), marginLeft: ms(16), fontSize: ms(14)}}>
        COMMENTS
      </Text>
      <View style={ActivityScreenStyle.radioButton}>
        <Text style={ActivityScreenStyle.radioButtonTitle}>Everyone</Text>
        <RadioButton
          color={colorPalates.AppTheme.primary}
          value="true"
          status={everyOneComment === 'true' ? 'checked' : 'unchecked'}
          onPress={everyCommentRadioButton}
          />
      </View>
      <View style={ActivityScreenStyle.radioButton}>
        <Text style={ActivityScreenStyle.radioButtonTitle}>Friends only</Text>
        <RadioButton
          color={colorPalates.AppTheme.primary}
          value="true"
          status={friendsOnly === 'true' ? 'checked' : 'unchecked'}
          onPress={friendOnlyCommentRadioButton}
          />
      </View>
      <View style={ActivityScreenStyle.radioButton}>
        <Text style={ActivityScreenStyle.radioButtonTitle}>No one</Text>
        <RadioButton
          color={colorPalates.AppTheme.primary}
          value="true"
          status={noOneComment === 'true' ? 'checked' : 'unchecked'}
          onPress={noOneCommentRadioButton}
          />
      </View>
          </ScrollView>
    </SafeAreaView>
  );
};
export default ActivityScreen;
