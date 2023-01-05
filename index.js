/**
 * @format
 */

import {AppRegistry, LogBox, Platform} from 'react-native';
import 'react-native-gesture-handler';
import awsconfig from './src/aws-exports';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import App from './src/App';
import {name as appName} from './app.json';
import Amplify from 'aws-amplify';

LogBox.ignoreAllLogs();
// import { withAuthenticator } from 'aws-amplify-react-native'

PushNotification.createChannel(
  {
    channelId: 'PostChannel', // (required)
    channelName: 'PostChannel', // (required)
    channelDescription: 'Post Uploaded!', // (optional) default: undefined.
    playSound: false, // (optional) default: true
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  },
  created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: Platform.OS === 'ios',
});

async function urlOpener(url, redirectUrl) {
  // await InAppBrowser.isAvailable();
  // const {type, url: newUrl} = await InAppBrowser.openAuth(url, redirectUrl, {
  //   showTitle: false,
  //   enableUrlBarHiding: true,
  //   enableDefaultShare: false,
  //   ephemeralWebSession: false,
  // });
  // if (type === 'success') {
  //   Linking.openURL(newUrl);
  // }
}

Amplify.configure({
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    urlOpener,
  },
});

AppRegistry.registerComponent(appName, () => App);
