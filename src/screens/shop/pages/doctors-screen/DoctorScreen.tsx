import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  TextInput,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './DoctorScreenStyle';
import colorPalates from '../../../../theme/colors/colorPalates';
import MapScreen from '../map-screen/MapScreen';
import FastImage from 'react-native-fast-image';
import images from '../../../../theme/images/images';
import colors from '../../../../theme/colors/colors';
import EndPoints from '../../../../Network/EndPoints';
import APICall from '../../../../Network/APICall';
import {Query} from '../../../../Network/Query';
import DisplayDispensaries from '../../components/display-dispensaris/DisplayDispensaries';
import {convertDistance, getDistance} from 'geolib';
import {validateText} from '../../../../utils/helper/helper';
import _ from 'lodash';
import {shopSliceActions} from '../../../../redux-wrapper/reducers/shop-slice/shopSlice';

const DoctorScreen = props => {
  const info = props?.route;
  const routeName = props?.route?.name;
  const currentLocation = useSelector(
    state => state?.shopData?.currentLocation,
  );
  const [searchText, setSearchText] = useState('');
  const [mapScreenToggle, setMapScreenToggle] = useState(false);
  const feedData = useSelector(state => state?.shopData[routeName]);
  const [listData, setListData] = useState(feedData || []);
  const [range, setRange] = useState(0);
  const [searchRange, setSearchRange] = useState(0);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mapData, setMapListData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [placeResult, setPlaceResult] = useState([]);
  const [isSearchModalVisisble, setSearchModlaVisislbe] = useState(false);
  const [isNotSearchable, setisSearchable] = useState(false);
  const [searchLocation, setSearchLocation] = useState(null);
  const [searchData, setSearchData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (feedData) {
      setListData(feedData);
    }
  }, [feedData]);

  useEffect(() => {
    if (!searchText) {
      getData();
      setPlaceResult([]);
      setSearchModlaVisislbe(false);
    } else {
      setTimeout(() => {
        onPlaceSearch();
      }, 200);
    }
  }, [searchText]);

  useEffect(() => {
    setMapData();
  }, [listData]);

  useEffect(() => {
    if (placeResult.length !== 0) {
      setSearchModlaVisislbe(true);
    }
  }, [placeResult]);

  const onPlaceSearch = () => {
    if (isNotSearchable) {
      return;
    }
    fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${EndPoints.Google_API_Key}&&region=us&input=${searchText}`,
    )
      .then(result => result.json())
      .then(resp => {
        setPlaceResult(resp?.predictions);
      });
  };

  const getCordinates = place_id => {
    return new Promise(resolve => {
      fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?key=${EndPoints.Google_API_Key}&fields=geometry&placeid=${place_id}`,
      )
        .then(result => result.json())
        .then(resp => {
          resolve(resp);
        });
    });
  };

  const getData = (isPagination = false) => {
    if (isPagination && range !== 0) {
      setRange(feedData?.length);
      setIsLoadMore(true);
    }
    if ((isPagination && range === 0) || isLoading) {
      return;
    }
    const header = {
      'x-api-key': EndPoints.APIKEY,
    };

    const query = Query.getDoctorData;

    const payload = {
      query,
      variables: {
        latitude: currentLocation?.latitude,
        longitude: currentLocation?.longitude,
        range: range || 0,
      },
    };
    setIsLoading(!isPagination);
    APICall('post', payload, EndPoints.APIURL, header).then(resp => {
      setIsLoading(false);
      if (resp?.status === 200 && resp?.data?.data) {
        const items = resp?.data?.data?.getDoctorData;

        if (items?.length > 0) {
          const newData =
            listData?.length > 0 && isPagination
              ? [...feedData, ...items]
              : items;

          dispatch(
            shopSliceActions.SetFeedDataAction({
              collection_name: info.params.dataItem.id,
              data: newData,
            }),
          );

          setIsLoadMore(false);
          setIsLoading(false);
          setRange(feedData?.length);
        } else {
          dispatch(
            shopSliceActions.SetFeedDataAction({
              collection_name: info.params.dataItem.id,
              data: feedData,
            }),
          );

          setIsLoadMore(false);
          setIsLoading(false);
          setRange(feedData?.length);
        }
      }
    });
  };

  const setMapData = () => {
    const data = JSON.parse(JSON.stringify(listData));
    const filterMapData = _.filter(data, i => {
      return Number(getMyDistance(i)) < 62.1371;
    });

    setMapListData(filterMapData);
  };

  const getMyDistance = item => {
    const latitude = validateText(item?.latitude) || 0;
    const longitude = validateText(item?.longitude) || 0;

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

  const renderPostItem = ({item}) => {
    const distance = getMyDistance(item);

    return (
      <DisplayDispensaries
        data={item}
        distance={distance}
        routeName={routeName}
        index={item?.shopid}
        isDoctor={true}
      />
    );
  };

  const onPressPlaceItem = async item => {
    setSearchModlaVisislbe(false);
    setisSearchable(true);
    const cords = await getCordinates(item?.place_id);

    const payload = {
      lat: cords?.result?.geometry?.location?.lat,
      lng: cords?.result?.geometry?.location?.lng,
      searchText: cords?.result?.vicinity || cords?.result?.name,
    };

    setSearchLocation(payload);
    setSearchText(item?.description);
    setSearchModlaVisislbe(false);
    setSearchRange(0);
    onPressSearch(false, payload, 0);
  };

  const onPressSearch = (isPagination = false, loadData, rangeCount = 0) => {
    setSearchModlaVisislbe(false);
    if (loadData) {
      Keyboard.dismiss();

      if (isPagination && rangeCount !== 0) {
        setSearchRange(listData?.length);
        setIsLoadMore(true);
      }
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
          latitude: loadData?.lat,
          longitude: loadData?.lng,
          range: rangeCount,
          radius: 50,
        },
      };
      const noCityPayload = {
        latitude: loadData?.lat,
        longitude: loadData?.lng,
      };
      setIsLoading(!isPagination);
      APICall('post', payload, EndPoints.APIURL, header)
        .then(resp => {
          const items =
            resp?.data?.data?.getDoctorByRadius ||
            resp?.data?.data?.getDispensaryByRadius ||
            resp?.data?.data?.getDeliveryByRadius;
          if (items?.length > 0) {
            setIsLoading(false);
            setIsSearching(true);
            const totlaItems = isPagination ? [...listData, ...items] : items;
            setListData(totlaItems);
            setSearchData(totlaItems);
            setMapData();
            setSearchRange(totlaItems?.length);
            setIsLoadMore(false);
          } else {
            !isPagination && setListData([]);
            !isPagination && setSearchData([noCityPayload]);
            setIsLoadMore(false);
            setIsLoading(false);
          }
        })
        .catch(() => {
          setIsLoading(false);
          setIsSearching(false);
        });
    }
  };

  const renderSearchBar = () => {
    return (
      <>
        <View style={styles.searchBarContainer}>
          <View style={styles.searchBar}>
            <View style={styles.search}>
              <FastImage source={images.search} style={styles.icon} />
              <TextInput
                style={styles.textInput}
                placeholder="Search"
                placeholderTextColor={colors.grayShadeAB}
                returnKeyType={'done'}
                value={searchText}
                onChangeText={text => setSearchText(text)}
                onFocus={() => {
                  setisSearchable(false);
                  setSearchModlaVisislbe(true);
                }}
              />
              {searchText?.length !== 0 && (
                <TouchableOpacity
                  onPress={() => {
                    setSearchText('');
                    setTimeout(() => {
                      setSearchModlaVisislbe(false);
                    }, 1000);
                  }}
                >
                  <FastImage source={images.cancel} style={styles.icon} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        <ScrollView
          style={styles.placeListMainStyle}
          contentContainerStyle={styles.placeContainerStyle}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="always"
        >
          {placeResult.length !== 0 &&
            isSearchModalVisisble &&
            _.map(placeResult, (i: any) => {
              return (
                <TouchableOpacity
                  style={styles.placeContainer}
                  onPress={() => onPressPlaceItem(i)}
                  hitSlop={{left: 10, right: 10, bottom: 10, top: 10}}
                >
                  <Text style={styles.placeText} numberOfLines={2}>
                    {i?.description}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </>
    );
  };

  const renderFooterLoader = () => {
    if (isLoadMore) {
      return (
        <View style={styles.bottomLoader}>
          <ActivityIndicator
            size="large"
            color={colorPalates.AppTheme.primary}
          />
        </View>
      );
    }
    return null;
  };

  const renderDispensariesList = () => {
    return (
      <FlatList
        data={listData}
        extraData={useState}
        renderItem={renderPostItem}
        keyExtractor={(item: any, index: any) => `${routeName}-${index}`}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        onEndReached={() =>
          isSearching
            ? onPressSearch(true, searchLocation, searchRange)
            : getData(true)
        }
        ListFooterComponent={renderFooterLoader}
      />
    );
  };

  const renderButton = () => {
    return (
      <TouchableOpacity
        style={[styles.mapIconContainer]}
        onPress={() => {
          setMapScreenToggle(prevState => !prevState);
        }}
      >
        {!mapScreenToggle ? (
          <FastImage style={styles.mapIcon} source={images.mapIcon} />
        ) : (
          <FastImage style={styles.mapIcon} source={images.shpMenuIcon} />
        )}
      </TouchableOpacity>
    );
  };

  const renderMapScreen = () => {
    return (
      <MapScreen
        data={mapData}
        currentLocation={currentLocation}
        routeName={routeName}
        info={info}
        searchLocation={searchLocation}
        searchData={searchData}
        isDoctor={true}
        onDataChange={items => {
          setListData(items);
          setSearchData(items);
        }}
      />
    );
  };

  const renderMapView = () => {
    if (mapScreenToggle) {
      return (
        <>
          {renderMapScreen()}
          {renderButton()}
        </>
      );
    } else {
      return (
        <SafeAreaView style={styles.safeAreaContainer}>
          <View style={styles.mainViewContainer}>
            {renderSearchBar()}

            {isLoading ? (
              <View style={styles.indicatorContainer}>
                <ActivityIndicator
                  animating={true}
                  color={colorPalates.greenShade2A}
                  size={'small'}
                />
              </View>
            ) : listData?.length > 0 ? (
              <View style={{flex: 1}}>
                {renderDispensariesList()}
                {renderButton()}
              </View>
            ) : (
              <ScrollView
                contentContainerStyle={styles.scrollContainer}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.noDataFoundView}>
                  <Text style={styles.noDataFoundText}>No Data Found</Text>
                  {renderButton()}
                </View>
              </ScrollView>
            )}
          </View>
        </SafeAreaView>
      );
    }
  };

  return <View style={styles.container}>{renderMapView()}</View>;
};

export default memo(DoctorScreen);
