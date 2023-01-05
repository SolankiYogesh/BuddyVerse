import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {Switch} from 'react-native-paper';
import {colorPalates} from 'theme';
import SettingSwitchStyle from './SettingSwitchStyle';
import {Notifications} from 'getsocial-react-native-sdk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnnounceMentModal from '../../../components/annoucement-modal/AnnounceMentModal';
import ModalsMessages from '../../../models/ModalsMessages';

export interface SettingSwitchProps {
  title: string;
}
const SettingSwitch = ({title}: SettingSwitchProps) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [error, setError] = useState(false);

  const toggleSwitch = () => {
    Notifications.setPushNotificationsEnabled(!isEnabled);
    AsyncStorage.setItem('@storage_Key', '' + !isEnabled);
    setIsEnabled(previousState => !previousState);
  };

  useEffect(() => {
    AsyncStorage.getItem('@storage_Key').then(res => {
      if (res !== null) {
        setIsEnabled(res === 'true');
      } else {
        try {
          Notifications.arePushNotificationsEnabled().then(check => {
            AsyncStorage.setItem('@storage_Key', '' + check);
            setIsEnabled(check);
          });
        } catch (e) {
          setError(true);
        }
      }
    });
  }, []);

  return (
    <View style={SettingSwitchStyle.switchContainer}>
      <Text style={SettingSwitchStyle.switchTitle}>{title}</Text>

      <Switch
        trackColor={{
          false: colorPalates.grayShadeCC,
          true: colorPalates.AppTheme.primary,
        }}
        onValueChange={toggleSwitch}
        thumbColor={
          isEnabled ? colorPalates.grayShadef4 : colorPalates.grayShadef4
        }
        value={isEnabled}
      />
      <AnnounceMentModal
        modalVisible={error}
        title={'Oops'}
        buttonText={'Ok'}
        messageText={ModalsMessages.ModalsMassages.somethingWentWrong}
        onPressButton={() => setError(false)}
      />
    </View>
  );
};
export default SettingSwitch;
