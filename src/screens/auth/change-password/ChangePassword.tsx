import {useNavigation} from '@react-navigation/native';
import ThemeButton from 'components/theme-button/ThemeButton';
import React, {useState} from 'react';
import {Alert, View, SafeAreaView, TextInput} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ms} from 'react-native-size-matters';
import SettingHeader from 'screens/setting/components/SettingHeader';
import {colorPalates} from 'theme';
import ChangePasswordStyle from './ChangePasswordStyle';
import {Auth} from 'aws-amplify';
import AnnounceMentModal from '../../../components/annoucement-modal/AnnounceMentModal';
import ScreenHeader from 'screens/chat/components/screen-header/ScreenHeader';
import ModalsMessages from '../../../models/ModalsMessages';

const ChangePassword = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [messageInforation, setMessageInformation] = useState(false);
  const [messageCorrection, setMessageCorrection] = useState(false);

  const [error, setError] = useState('');
  const [messageError, setMessageError] = useState(false);

  let changePassword = () => async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      return (
        //Alert.alert("Information", "Please fill all the fields")
        setMessageInformation(true)
      );
    }
    if (newPassword !== confirmPassword) {
      return (
        //Alert.alert("Oops", "New password and confirm password doesn't match")
        setMessageCorrection(true)
      );
    }
    setIsLoading(true);
    Auth.currentAuthenticatedUser({bypassCache: true})
      .then(user => {
        let userType = JSON.parse(user?.attributes?.identities || '[]')[0]
          ?.providerName;
        if (userType)
          return Alert.alert(
            'Oops',
            'You have logged in with ' +
              userType +
              ", You can't change password",
          );
        Auth.changePassword(user, currentPassword, newPassword)
          .then(() => {
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setModalVisible(true);
            setIsLoading(false);
          })
          .catch(
            ex => {
              let message = ex.message;
              if (message === 'Incorrect username or password.') {
                message = 'Incorrect password.';
              }
              if (
                message ===
                'Attempt limit exceeded, please try after some time.'
              ) {
                message =
                  'Attempt limit exceeded. Please wait a few minutes to try again.';
              }
              if (
                message ===
                'Password did not conform with policy: Password not long enough'
              ) {
                message = 'Password should be Six Character Long';
              }
              setIsLoading(false);
              setError(message), setMessageError(true);
            }, //Alert.alert("dt", error.message)
          );
      })
      .catch(
        e => {
          setIsLoading(false);
          setError(e.message), setMessageError(true);
        },

        //Alert.alert("d", error.message)
      );
  };

  const backToSetting = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={ChangePasswordStyle.container}>
      <AnnounceMentModal
        modalVisible={modalVisible}
        messageText={ModalsMessages.ModalsMassages.passwordReset}
        buttonText={'Back to Home'}
        onPressButton={backToSetting}
      />
      <AnnounceMentModal
        modalVisible={messageInforation}
        buttonText={'Ok'}
        messageText={ModalsMessages.ModalsMassages.plzFillAllFields}
        onPressButton={() => setMessageInformation(false)}
      />
      <AnnounceMentModal
        modalVisible={messageCorrection}
        title={'Oops'}
        buttonText={'Ok'}
        messageText={ModalsMessages.ModalsMassages.paaswordDontMoath}
        onPressButton={() => setMessageCorrection(false)}
      />
      <AnnounceMentModal
        modalVisible={messageError}
        title={'Oops!'}
        buttonText={'Ok'}
        messageText={error}
        onPressButton={() => setMessageError(false)}
      />

      <ScreenHeader isBackVisible title="Change Password" />
      <View style={ChangePasswordStyle.viewContainer}>
        <KeyboardAwareScrollView style={ChangePasswordStyle.container}>
          <View style={ChangePasswordStyle.textInputContainer}>
            <TextInput
              value={currentPassword}
              style={ChangePasswordStyle.changePasswordInput}
              secureTextEntry={true}
              placeholder="Current Password"
              placeholderTextColor={colorPalates.grayShadeAB}
              onChangeText={val => setCurrentPassword(val)}
            />
            <TextInput
              value={newPassword}
              style={ChangePasswordStyle.changePasswordInput}
              secureTextEntry={true}
              placeholder="New Password"
              placeholderTextColor={colorPalates.grayShadeAB}
              onChangeText={val => setNewPassword(val)}
            />
            <TextInput
              value={confirmPassword}
              style={ChangePasswordStyle.changePasswordInput}
              secureTextEntry={true}
              placeholder="Confirm New Password"
              placeholderTextColor={colorPalates.grayShadeAB}
              onChangeText={val => setConfirmPassword(val)}
            />
          </View>
          {/* <PopupContainer/> */}
          {/* <SimpleButton
                    containerStyle={ChangePasswordStyle.forgotButton}
                    title={'Forgot password?'}
                    onPress={() => { }}
                /> */}
          <ThemeButton
            containerStyle={ChangePasswordStyle.changePasswordButton}
            titleStyle={ChangePasswordStyle.changePasswordButtonTitle}
            title={'Change Password'}
            onPress={changePassword()}
            loading={isLoading}
          />
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};
export default ChangePassword;
