import React, {useState, useRef, useEffect} from 'react';
import {ms, s} from 'react-native-size-matters';
import MapView, {MAP_TYPES, Marker, PROVIDER_DEFAULT} from 'react-native-maps';
import colors from 'theme/colors/colors';
import {images} from 'theme';
import FastImage from 'react-native-fast-image';
import * as _ from 'lodash';
import {styles} from './MapScreenStyle';
import {mapStyle} from './mapStyle';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import {getDistance, convertDistance} from 'geolib';
import {useSelector} from 'react-redux';
import {useFeedService} from 'services/feed-service/useFeedService';
import {validateText} from 'utils/helper/helper';

import {debugLogs} from 'utils/logs/logs';
import APICall from 'Network/APICall';
import EndPoints from 'Network/EndPoints';
import {Query} from 'Network/Query';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import svg from '../../../../theme/images/svg';
import moment from 'moment';
import screenNameEnum from '../../../../models/screenNameEnum';
import DynamicImageLoading from '../../components/dynamic-image-loading/DynamicImageLoading';
import AnnounceMentModal from '../../../../components/annoucement-modal/AnnounceMentModal';
import ModalsMessages from '../../../../models/ModalsMessages';
import {doctorsShare} from '../../../../utils/helper/helper';
const types = ['In-store shopping', 'In-store pick-up', 'Delivery'];
const MapScreen = (props: {
  routeName;
  currentLocation;
  searchLocation;
  searchData;
  onDataChange;
  isDoctor;
}) => {
  const mapRef = useRef(null);
  const {
    routeName,
    currentLocation,
    searchLocation,
    searchData,
    onDataChange,
    isDoctor = false,
  } = props;

  const {getGooglePlacesReferredSmartLink, getDoctorPlacesReferredSmartLink} =
    useFeedService();
  const [show, setShow] = useState(false);

  const [isLikedByMe, setIsLikeByMe] = useState(false);
  const [data, setData] = useState([]);
  const [likes] = useState(0);
  const [shares] = useState(0);
  const [popUpData, setPopUpData] = useState(null);
  const feedData = useSelector(state => state?.shopData[routeName]);
  const [listData, setListdata] = useState(feedData || []);
  const [range, setRange] = useState(0);
  const navigation = useNavigation();
  const [cordinates, setCordinates] = useState([]);
  const [mapLocation, setMapLocation] = useState(null);
  const [isAPiCalling, setAPICalling] = useState(false);
  const [errorModal, setErrormodal] = useState(false);

  useEffect(() => {
    if (searchData?.length === 0) {
      if (isDoctor) {
        getData();
      } else {
        getDataByCordinates(true);
      }
    } else {
      setData(searchData);
      const filterData = _.filter(searchData, i => !!i);

      const dddc = _.map(filterData, i => ({
        latitude:
          Number(i?.latitude) || Number(i?.geometry?.location?.lat) || 0,
        longitude:
          Number(i?.longitude) || Number(i?.geometry?.location?.lng) || 0,
      }));
      setCordinates(dddc);
    }
  }, [props]);

  useEffect(() => {
    if (searchData?.length === 0) {
      const d = JSON.parse(JSON.stringify(listData));

      const filterMapData = _.filter(d, i => {
        return Number(getMyDistance(i)) < 62.1371;
      });

      const dddc = _.map(filterMapData, i => ({
        latitude:
          Number(i?.latitude) || Number(i?.geometry?.location?.lat) || 0,
        longitude:
          Number(i?.longitude) || Number(i?.geometry?.location?.lng) || 0,
      }));
      setCordinates(dddc);

      setData(filterMapData);
    }
  }, [listData]);

  useEffect(() => {
    setTimeout(() => {
      fitAllMarkers();
    }, 1000);
  }, [cordinates]);

  const getData = () => {
    const header = {
      'x-api-key': EndPoints.APIKEY,
    };

    const query =
      routeName === 'Dispensaries'
        ? Query.getDispensary
        : routeName === 'Deliveries'
        ? Query.getDiliveries
        : Query.getDoctorData;
    const payload = {
      query,
      variables: {
        latitude: searchLocation?.lat || currentLocation?.latitude,
        longitude: searchLocation?.lng || currentLocation?.longitude,
        range: range,
      },
    };
    try {
      APICall('post', payload, EndPoints.APIURL, header).then(resp => {
        if (resp?.status === 200 && resp?.data?.data) {
          const dispensary = resp?.data?.data?.getAllData;
          const deliveries = resp?.data?.data?.getAllDelivery;
          const Doctor = resp?.data?.data?.getDoctorData;
          const items =
            routeName === 'Dispensaries'
              ? dispensary
              : routeName === 'Deliveries'
              ? deliveries
              : Doctor;

          if (items?.length > 0) {
            setListdata(items);

            setRange(feedData?.length);
          } else {
            setListdata(feedData);

            setRange(feedData?.length);
          }
        }
      });
    } catch (error) {
      setErrormodal(true);
    }
  };

  const getImage = () => {
    return new Promise(resolve => {
      fetch(
        `https://maps.googleapis.com/maps/api/place/photo?photoreference=${popUpData?.photos[0]?.photo_reference}&sensor=false&maxheight=100&maxwidth=100&key=${EndPoints.Google_API_Key}`,
      ).then(resp => {
        resolve(resp?.url);
      });
    });
  };

  const getMyDistance = item => {
    const latitude =
      validateText(item?.latitude) ||
      Number(item?.geometry?.location?.lat) ||
      0;
    const longitude =
      validateText(item?.longitude) ||
      Number(item?.geometry?.location?.lng) ||
      0;

    return convertDistance(
      getDistance(
        {
          latitude,
          longitude,
        },
        {
          latitude: currentLocation?.latitude,
          longitude: currentLocation?.longitude,
        },
      ),
      'mi',
    ).toFixed(2);
  };

  const fitAllMarkers = () => {
    mapRef.current?.fitToCoordinates(cordinates, {
      edgePadding: {
        top: 20,
        right: 100,
        bottom: 10,
        left: 100,
      },
      animated: true,
    });
  };

  const renderType = () => {
    return (
      <FlatList
        data={types}
        extraData={types}
        horizontal
        style={styles.textList}
        renderItem={text => {
          return <Text style={styles.ratingText}>{text?.item}</Text>;
        }}
        contentContainerStyle={{alignItems: 'center'}}
        ItemSeparatorComponent={renderItemTextSeperator}
        showsHorizontalScrollIndicator={false}
      />
    );
  };

  const onPressPopUp = () => {
    const distance = getMyDistance(popUpData);
    if (isDoctor) {
      navigation.push(screenNameEnum.DispensaryAboutScreen, {
        data: popUpData,
        distance: distance,
        routeName: routeName,
        index: popUpData?.id,
        isDoctor: isDoctor,
      });
    } else {
      navigation.navigate(screenNameEnum.DispensaryNewAboutScreen, {
        data: popUpData,
      });
    }
  };

  const onPressShare = async () => {
    const obj = JSON.parse(JSON.stringify(popUpData));

    if (isDoctor) {
      getDoctorPlacesReferredSmartLink(obj)
        .then(async shareData => {
          await doctorsShare(shareData, obj);
        })
        .catch(error => {
          debugLogs('shareData error', error);
        });
    } else {
      getGooglePlacesReferredSmartLink(obj)
        .then(async shareData => {
          await doctorsShare(shareData, obj);
        })
        .catch(error => {
          debugLogs('shareData error', error);
        });
    }
    // sharePost(obj);
  };

  const getDataByCordinates = (isMyLocation = false) => {
    const latitude = isMyLocation
      ? currentLocation.latitude
      : mapLocation?.latitude;
    const longitude = isMyLocation
      ? currentLocation.longitude
      : mapLocation?.longitude;
    setAPICalling(true);
    fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&fields=rating,formatted_address,formatted_phone_number,place_id,opening_hours,website,name,photo,geometry&radius=100000&&keyword=cannabis store&key=${EndPoints.Google_API_Key}`,
    )
      .then(resp => resp.json())
      .then(resp => {
        if (resp?.results?.length !== 0) {
          const filterData = _.filter(resp?.results, i => !!i);
          setAPICalling(false);

          const newData = _.map(filterData, i => {
            if (!!i?.photos?.length) {
              getImageFromApi(i?.photos[0]?.photo_reference).then(r => {
                i.image = r;
              });
              return i;
            }
          });
          if (newData?.length !== 0) {
            isMyLocation ? setListdata(newData) : setData(newData);
            onDataChange(newData);
          }
        }
      })
      .catch(() => {
        setAPICalling(false);
      })
      .finally(() => setAPICalling(false));
  };

  const getImageFromApi = preference => {
    return new Promise(resolve => {
      fetch(
        `https://maps.googleapis.com/maps/api/place/photo?photoreference=${preference}&sensor=false&maxheight=1600&maxwidth=1600&key=${EndPoints.Google_API_Key}`,
      )
        .then(resp => {
          if (resp?.url) {
            resolve(resp?.url);
          }
        })
        .catch(() => {
          resolve(null);
        });
    });
  };

  const onMapViewChanged = () => {
    if (isAPiCalling) {
      return;
    }
    if (mapLocation) {
      const query =
        routeName === 'Dispensaries'
          ? Query.getDispensaryByRedius
          : routeName === 'Deliveries'
          ? Query.getDeliveryByRadius
          : Query.getDoctorByRadius;

      const header = {
        'x-api-key': EndPoints.APIKEY,
      };
      const payload = {
        query,
        variables: {
          latitude: mapLocation?.latitude,
          longitude: mapLocation?.longitude,
          range: 0,
          radius: 50,
        },
      };
      try {
        setAPICalling(true);
        APICall('post', payload, EndPoints.APIURL, header)
          .then(resp => {
            setAPICalling(false);
            if (resp?.status === 200 && resp?.data?.data) {
              const items =
                resp?.data?.data?.getDoctorByRadius ||
                resp?.data?.data?.getDispensaryByRadius ||
                resp?.data?.data?.getDeliveryByRadius;

              if (items?.length !== 0) {
                setData(items);
                onDataChange(items);
              }
            }
          })
          .catch(() => {
            setAPICalling(false);
          });
      } catch (error) {
        setErrormodal(true);
      }
    }
  };
  const delayFuction = region => {
    setMapLocation(region);
    // DebounceFuction();
  };

  const onPressLike = () => {
    if (popUpData?.shopid) {
      const header = {
        'x-api-key': EndPoints.APIKEY,
      };
      const query =
        routeName === 'Dispensaries'
          ? Query.likedislikeDispensary
          : routeName === 'Deliveries'
          ? Query.likedislikeDelivery
          : Query.likeDislikeDocotor;
      const payload = {
        query,
        variables: {
          shopid: popUpData?.shopid,
          option: 'like',
        },
      };
      try {
        APICall('post', payload, EndPoints.APIURL, header).then(resp => {
          if (resp?.status === 200 && resp?.data?.data) {
            setIsLikeByMe(true);
          }
        });
      } catch (error) {
        setErrormodal(true);
      }
    }
  };

  const renderCustomMarker = () => {
    let image = null;
    if (routeName === 'Dispensaries') {
      image = images.dispensary_v2;
    } else if (routeName === 'Deliveries') {
      image = images.delivery_40;
    } else if (routeName === 'doctors') {
      image = images.doctor_40;
    }

    return (
      <View style={{alignSelf: 'center'}}>
        <FastImage
          source={image}
          style={{height: ms(25), width: ms(25)}}
          resizeMode="contain"
        />
      </View>
    );
  };

  const renderPopUp = () => {
    return isDoctor ? doctorPopUp() : renderDispensaryPopUp();
  };

  const renderDispensaryPopUp = () => {
    if (!popUpData) {
      return null;
    }

    const distance = getMyDistance(popUpData);
    getImage();
    const closeHours = !!popUpData?.opening_hours?.periods?.length
      ? moment(popUpData?.opening_hours?.periods[0]?.close?.time).format('hh A')
      : '';
    const openHours = !!popUpData?.opening_hours?.periods?.length
      ? moment(popUpData?.opening_hours?.periods[0]?.open?.time).format('hh A')
      : '';

    const isOpen = !!popUpData?.opening_hours?.open_now;
    return (
      <TouchableOpacity style={styles.popUpContainer} onPress={onPressPopUp}>
        <View style={styles.modalCOntainer}>
          <Text style={styles.nameText}>{popUpData?.name}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{popUpData?.rating}</Text>
            <StarRating
              disabled={true}
              starSize={15}
              rating={Number(popUpData?.rating)}
              fullStarColor={colors.yellowShadeFFC}
            />
          </View>
          <View style={styles.ratingContainer}>
            <Text style={styles.storeText}>Cannabis Store</Text>
            {renderItemTextSeperator()}
            <Text style={styles.storeText}>{`${distance} miles`}</Text>
          </View>
          <View style={[styles.ratingContainer, {marginBottom: s(10)}]}>
            <Text
              style={[
                styles.ratingText,
                {color: isOpen ? colors.greenShade2A : colors.redShadeC0},
              ]}
            >
              {isOpen ? 'Open' : 'Closed'}
            </Text>
            {renderItemTextSeperator()}
            <Text style={[styles.ratingText]}>
              {isOpen ? `Closes ${closeHours}` : `Open ${openHours}`}
            </Text>
          </View>
        </View>
        <DynamicImageLoading
          item={popUpData?.photos[0]}
          style={styles.imagePlaceStyle}
          loaderStyle={styles.loaderStyle}
        />
        {renderType()}
      </TouchableOpacity>
    );
  };

  const renderItemTextSeperator = () => {
    return <View style={styles.dotView} />;
  };

  const doctorPopUp = () => {
    const distance = getMyDistance(popUpData);
    return (
      <TouchableOpacity style={styles.item} onPress={onPressPopUp}>
        <View style={styles.imgContainer}>
          <FastImage
            source={{uri: popUpData?.image}}
            style={styles.image}
            resizeMode={'contain'}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={1}>
            {popUpData?.business_name ||
              popUpData?.business_na ||
              popUpData?.name}
          </Text>
          <View style={styles.star}>
            <StarRating
              disabled={false}
              starSize={15}
              rating={Number(popUpData?.rating)}
              fullStarColor={colors.yellowShadeFFC}
            />
            <Text style={styles.rate}>{popUpData?.rating}</Text>
          </View>
          <Text style={styles.smallText} numberOfLines={1}>
            {distance} mi
          </Text>
          <Text style={styles.card} numberOfLines={1}>
            {!isDoctor && popUpData?.plus_code?.compound_code}
            {isDoctor && `${popUpData?.city}, `}
            {isDoctor && popUpData?.state}
          </Text>
          <View style={styles.likecontainer}>
            <TouchableOpacity onPress={() => onPressShare()}>
              <FastImage source={images.share} style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.like}>{shares || 0}</Text>
            <TouchableOpacity
              onPress={() =>
                isDoctor ? onPressLike() : setIsLikeByMe(!isLikedByMe)
              }
            >
              {isLikedByMe ? (
                <SvgXml xml={svg.like} height={ms(18)} width={ms(18)} />
              ) : (
                <SvgXml xml={svg.unlike} height={ms(18)} width={ms(18)} />
              )}
            </TouchableOpacity>
            <Text style={styles.like}>{likes || 0}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderMapView = () => {
    let image = null;
    if (routeName === 'Dispensaries') {
      image = images.dispensary_v2;
    } else if (routeName === 'Deliveries') {
      image = images.delivery_40;
    } else if (routeName === 'doctors') {
      image = images.doctor_40;
    }

    return (
      <MapView
        style={styles.map}
        ref={mapRef}
        onRegionChangeComplete={delayFuction}
        initialRegion={{
          latitude:
            cordinates.length > 0
              ? Number(cordinates[0]?.latitude)
              : searchLocation?.lat || currentLocation?.latitude,
          longitude:
            cordinates.length > 0
              ? Number(cordinates[0]?.longitude)
              : searchLocation?.lng || currentLocation?.longitude,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}
        onMapReady={fitAllMarkers}
        onMapLoaded={fitAllMarkers}
        followsUserLocation={false}
        liteMode={false}
        provider={PROVIDER_DEFAULT}
        userInterfaceStyle={Platform.OS === 'android' ? 'dark' : 'light'}
        mapType={MAP_TYPES.STANDARD}
        showsUserLocation={false}
        pitchEnabled={true}
        showsMyLocationButton={true}
        loadingEnabled={false}
        showsPointsOfInterest={true}
        customMapStyle={mapStyle}
        onPress={() => setShow(false)}
      >
        {_.map(data, (marker, index) => {
          return (
            !!marker && (
              <Marker
                key={`marker?.shopid${index}`}
                coordinate={{
                  latitude:
                    Number(marker?.latitude) ||
                    Number(marker?.geometry?.location?.lat) ||
                    0,
                  longitude:
                    Number(marker?.longitude) ||
                    Number(marker?.geometry?.location?.lng) ||
                    0,
                }}
                tracksViewChanges={Platform.OS === 'ios'}
                icon={Platform.OS === 'android' && image}
                onPress={() => {
                  setPopUpData(marker);
                  setShow(!show);
                  setTimeout(() => {
                    setShow(true);
                  }, 100);
                }}
              >
                {Platform.OS === 'ios' && renderCustomMarker()}
              </Marker>
            )
          );
        })}
        <Marker
          coordinate={{
            latitude: currentLocation?.latitude,
            longitude: currentLocation?.longitude,
          }}
        >
          <FastImage
            source={images.markerCircle}
            resizeMode={'contain'}
            style={{width: ms(50), height: ms(50)}}
          />
        </Marker>
      </MapView>
    );
  };

  const renderSearchButton = () => {
    return (
      <TouchableOpacity
        style={styles.searchBtn}
        disabled={isAPiCalling}
        onPress={() => {
          isDoctor ? onMapViewChanged() : getDataByCordinates();
        }}
        hitSlop={{left: 10, right: 10, bottom: 10, top: 10}}
      >
        {isAPiCalling ? (
          <ActivityIndicator size={'small'} />
        ) : (
          <Text style={styles.searchText}>Search This Area</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <>
      {renderMapView()}
      {renderSearchButton()}
      {show && renderPopUp()}
      <AnnounceMentModal
        modalVisible={errorModal}
        title={'Oops'}
        buttonText={'Ok'}
        messageText={ModalsMessages.ModalsMassages.somethingWentWrong}
        onPressButton={() => setErrormodal(false)}
      />
    </>
  );
};

export default MapScreen;
