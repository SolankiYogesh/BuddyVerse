import React from 'react';
import {View, Text, Linking, Platform} from 'react-native';
import {ms} from 'react-native-size-matters';
import {images} from 'theme';
import colors from 'theme/colors/colors';
import SimpleButton from 'components/button/SimpleButton';
import MapView, {Marker} from 'react-native-maps';
import styles from './AboutTabScreenStyle';
import FastImage from 'react-native-fast-image';
import {validateText} from 'utils/helper/helper';
import {openDirections} from '../../../../../../utils/helper/helper';

const AboutTabScreen = (props: {
  navigation: any;
  data: object;
  route: any;
  isDoctor: boolean;
}) => {
  const {data, route, isDoctor} = props;

  const onPressDirections = () => {
    const destinationLat = data?.latitude || 0;
    const destinationLong = data?.longitude || 0;

    openDirections(destinationLat, destinationLong, data?.name);
  };
  const renderUpperView = () => {
    const state = validateText(data?.state);
    const city = validateText(data?.city);
    const phoneNumber = validateText(data?.phone_number);
    const onPressCall = () => {
      let Number = '';
      if (Platform.OS === 'android') {
        Number = `tel:${phoneNumber}`;
      } else {
        Number = `telprompt:${phoneNumber}`;
      }
      Linking.openURL(Number);
    };
    return (
      <>
        <View style={styles.row}>
          <FastImage source={images.case} style={styles.icon} />
          <Text style={styles.aboutTxt}> Monday - Saturday</Text>
        </View>
        <View style={styles.row}>
          <FastImage source={images.clock} style={styles.icon} />
          <Text style={styles.aboutTxt}>11:00 AM - 8:00 PM</Text>
        </View>

        {isDoctor && (
          <View style={styles.row}>
            <FastImage source={images.call} style={styles.icon} />
            <Text style={styles.callText} onPress={onPressCall}>
              {phoneNumber}
            </Text>
          </View>
        )}
        <View style={styles.row}>
          <View style={styles.locationColumn}>
            <View style={styles.row}>
              <FastImage source={images.markerGray} style={styles.icon} />
              <Text style={styles.aboutTxt}>
                {!isDoctor && data?.plus_code?.compound_code}
                {isDoctor && `${city}, ${state} `}
              </Text>
            </View>
          </View>
          <View style={styles.locationColumn1}>
            <SimpleButton
              containerStyle={styles.mapButton}
              title={'Directions'}
              onPress={() => onPressDirections()}
              buttonTitleStyle={styles.mapBtnText}
            />
          </View>
        </View>
      </>
    );
  };

  const renderMapView = () => {
    let image = null;
    if (route?.params?.routeName === 'Dispensaries') {
      image = images.dispensary_v2;
    } else if (route?.params?.routeName === 'Deliveries') {
      image = images.delivery_40;
    } else if (route?.params?.routeName === 'doctors') {
      image = images.doctor_40;
    }

    return (
      <View style={styles.row}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude:
              Number(data?.latitude) ||
              Number(data?.geometry?.location?.lat) ||
              0,
            longitude:
              Number(data?.longitude) ||
              Number(data?.geometry?.location?.lng) ||
              0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={onPressDirections}
          scrollEnabled={false}
          rotateEnabled={false}
          zoomEnabled={false}
          showsMyLocationButton={false}
          loadingEnabled={true}
          loadingIndicatorColor={colors.greenShade2A}
        >
          <Marker
            coordinate={{
              latitude:
                Number(data?.latitude) ||
                Number(data?.geometry?.location?.lat) ||
                0,
              longitude:
                Number(data?.longitude) ||
                Number(data?.geometry?.location?.lng) ||
                0,
            }}
          >
            <FastImage
              source={image}
              style={{height: ms(28), width: ms(28)}}
              resizeMode="contain"
            />
          </Marker>
        </MapView>
      </View>
    );
  };
  const renderBottomText = () => {
    return (
      <View style={styles.row}>
        <Text style={styles.bottomText}>{data?.about}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.column}>
        {renderUpperView()}

        {renderMapView()}
        {renderBottomText()}
      </View>
    </View>
  );
};

export default AboutTabScreen;
