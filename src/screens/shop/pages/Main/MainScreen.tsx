import React, {useEffect, useState} from 'react';
import {ActivityIndicator, AppState, SafeAreaView, View} from 'react-native';
import {styles} from './MainScreenStyle';
import TopTabBar from '../../components/top-tab-bar/TopTabBar';
import {Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {useDispatch} from 'react-redux';
import {shopSliceActions} from 'redux-wrapper/reducers';
import {colorPalates} from 'theme';
import Permission from '../../../../models/Permission';
import {openSettings} from 'react-native-permissions';
import {useNavigation} from '@react-navigation/native';
import ScreenHeader from '../../../feed/components/screen-header/ScreenHeader';
import images from '../../../../theme/images/images';
import AnnounceMentModal from '../../../../components/annoucement-modal/AnnounceMentModal';
import ModalsMessages from '../../../../models/ModalsMessages';

const MainScreen = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [route, setRoute] = useState('');
  const [isDenied, setIsDenied] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    getLocationPermissions();
  }, []);

  useEffect(() => {
    AppState.addEventListener('change', state => {
      if (state === 'active') {
        getLocationPermissions();
      }
    });
  }, []);

  const getLocationPermissions = () => {
    Permission.getLocationPermission().then(resp => {
      if (resp) {
        setIsDenied(false);
        _enableGPS();
      } else {
        setIsDenied(true);
      }
    });
  };

  const _enableGPS = () => {
    Permission.getLocationPermission().then(resp => {
      if (resp) {
        setIsLoading(true);
        if (Platform.OS === 'android') {
          RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
            interval: 1000,
            fastInterval: 1000,
          })
            .then(() => {
              getCurrentLocation();
            })
            .catch(() => {
              getCurrentLocation();
            });
        } else {
          getCurrentLocation();
        }
      } else {
        setIsLoading(false);
      }
    });
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      info => {
        const lat = Number(info?.coords?.latitude) || 0;
        const long = Number(info?.coords?.longitude) || 0;

        const initialRegion = {
          latitude: Number(lat) || 0,
          longitude: Number(long) || 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        dispatch(shopSliceActions.SetLocationAction(initialRegion));
        setIsLoading(false);
      },
      e => {
        const initialRegion = {
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        dispatch(shopSliceActions.SetLocationAction(initialRegion));
        setIsLoading(false);
      },
      {
        showLocationDialog: true,
        forceRequestLocation: true,
        forceLocationManager: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  };

  useEffect(() => {
    getLocationPermissions();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        isImage
        svgData={images.searchButton}
        isBackVisible={true}
        title={route}
      />
      {!isLoading && !isDenied ? (
        <TopTabBar
          onChange={txt => {
            setRoute(txt);
          }}
        />
      ) : (
        !isDenied && (
          <View style={styles.indicatorContainer}>
            <ActivityIndicator size="small" color={colorPalates.greenShade2A} />
          </View>
        )
      )}
      {isDenied && (
        <AnnounceMentModal
          buttonStyle={styles.btnStyle}
          modalVisible={isDenied}
          onPressButton={() => {
            openSettings().then(() => {
              getLocationPermissions();
            });
          }}
          secondButton
          secondButtonStyle={styles.btnSsetyle}
          onPressSecondButton={() => {
            setIsDenied(false);
            navigation.canGoBack() && navigation.goBack();
          }}
          secondButtonText={'Cancel'}
          buttonText="Settings"
          messageText={
            ModalsMessages.ModalsMassages.thisFeatureRequiredLocation
          }
        />
      )}
    </SafeAreaView>
  );
};

export default MainScreen;
