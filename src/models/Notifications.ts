import PushNotification from 'react-native-push-notification';

export const ShowNotification = () => {
  PushNotification.localNotification({
    channelId: 'PostChannel',
    message: 'Your Video has posted',
    autoCancel: true,
  });
};
