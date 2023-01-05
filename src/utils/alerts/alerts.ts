import {Alert} from 'react-native';

// Libs
import {getApplicationName} from 'react-native-device-info';
import {showMessage, MessageOptions} from 'react-native-flash-message';

export const alertWithButtons = (
  message: string,
  title = getApplicationName(),
  yesButton = 'Yes',
  noButton = 'No',
  onPressYes = () => {
    console.log('on press yes');
  },
  onPressNo = () => {
    console.log('on press no');
  },
) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: yesButton,
        onPress: onPressYes,
      },
      {
        text: noButton,
        onPress: onPressNo,
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ],
    {cancelable: false},
  );
};

export const errorAlert = (message: string, restProps?: MessageOptions) => {
  showMessage({
    type: 'danger',
    message: message,
    icon: {icon: 'auto', position: 'left'},
    style: {paddingTop: 25},
    ...restProps,
  });
};

export const successAlert = (message: string, restProps?: MessageOptions) => {
  showMessage({
    type: 'success',
    message: message,
    icon: {icon: 'auto', position: 'left'},
    style: {paddingTop: 25},
    ...restProps,
  });
};

const alerts = {alertWithButtons, errorAlert, successAlert};

export default alerts;
