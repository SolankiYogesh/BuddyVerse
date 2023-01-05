import {Platform} from 'react-native';
import {PERMISSIONS, request} from 'react-native-permissions';

const getCameraPermission = () => {
  return new Promise(resolve => {
    request(
      Platform.select({
        android: PERMISSIONS.ANDROID.CAMERA,
        ios: PERMISSIONS.IOS.CAMERA,
      }),
    )
      .then(response => {
        if (response === 'granted') {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(() => resolve(false));
  });
};

const getStoragePermission = () => {
  return new Promise(resolve => {
    request(
      Platform.select({
        android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
      }),
    )
      .then(response => {
        if (response === 'granted' || response === 'limited') {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(() => resolve(false));
  });
};

const getCalendarPermission = () => {
  return new Promise(resolve => {
    request(
      Platform.select({
        android: PERMISSIONS.ANDROID.WRITE_CALENDAR,
        ios: PERMISSIONS.IOS.CALENDARS,
      }),
    )
      .then(response => {
        if (response === 'granted') {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(() => resolve(false));
  });
};

const getLocationPermission = () => {
  return new Promise(resolve => {
    request(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,

        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      }),
    )
      .then(response => {
        if (response === 'granted') {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(() => resolve(false));
  });
};

const getMicPermission = () => {
  return new Promise(resolve => {
    request(
      Platform.select({
        android: PERMISSIONS.ANDROID.RECORD_AUDIO,

        ios: PERMISSIONS.IOS.MICROPHONE,
      }),
    )
      .then(response => {
        if (response === 'granted') {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(() => resolve(false));
  });
};

const Permission = {
  getCameraPermission,
  getStoragePermission,
  getCalendarPermission,
  getLocationPermission,
  getMicPermission,
};

export default Permission;
