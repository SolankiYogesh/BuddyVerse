import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  FlatList,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import _, {debounce} from 'lodash';
import {useSelector} from 'react-redux';
import {styles} from './DispensariesScreenStyle';
import MapScreen from '../map-screen/MapScreen';
import FastImage from 'react-native-fast-image';
import images from '../../../../theme/images/images';
import colors from '../../../../theme/colors/colors';
import colorPalates from '../../../../theme/colors/colorPalates';
import {validateText} from '../../../../utils/helper/helper';
import {convertDistance, getDistance} from 'geolib';
import DispensaryItemView from '../../components/new-dispensary-item/DispensaryItemView';
import EndPoints from '../../../../Network/EndPoints';

const DispensariesScreen = props => {
  const info = props?.route;
  const routeName = props?.route?.name;

  const currentLocation = useSelector(
    (state: any) => state?.shopData?.currentLocation,
  );
  const [isSearchModalVisisble, setSearchModlaVisislbe] = useState(false);
  //   const feedData = useSelector(state => state?.shopData[routeName]);
  const [listData, setListData] = useState([]);
  const [isLoadMore, setIsLoadMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [mapScreenToggle, setMapScreenToggle] = useState(false);
  const [paginationTokens, setPaginationToens] = useState('');
  const [searchText, setSearchText] = useState('');
  const [isNotSearchable, setisSearchable] = useState(false);
  const [placeResult, setPlaceResult] = useState([]);
  const [searchCordinates, setSearchCordinates] = useState<any>(null);
  const handleDebouncing = debounce(onPlaceSearch, 500);
  useEffect(() => {
    if (!searchText) {
      getDataByCordinates();
      setPlaceResult([]);
      setSearchModlaVisislbe(false);
    } else {
      handleDebouncing();
    }
  }, [searchText]);

  useEffect(() => {
    getDataByCordinates(false);
  }, []);

  useEffect(() => {
    if (!!searchCordinates) {
      getDataByCordinates(false, true);
    }
  }, [searchCordinates]);

  useEffect(() => {
    if (placeResult.length !== 0) {
      setSearchModlaVisislbe(true);
    }
  }, [placeResult]);

  const getDataByCordinates = (isPagination = false, isSearch = false) => {
    Keyboard.dismiss();

    if (isPagination && !paginationTokens) {
      setIsLoadMore(false);
      return;
    }

    const lat = isSearch ? searchCordinates?.lat : currentLocation?.latitude;
    const lng = isSearch ? searchCordinates?.lng : currentLocation?.longitude;
    if (!isPagination) {
      setIsLoading(true);
    }
    if (isPagination) {
      setIsLoadMore(true);
    }
    setSearchModlaVisislbe(false);
    fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken${paginationTokens}&fields=rating,formatted_phone_number,formatted_address,place_id,opening_hours,website,name,photo,geometry&location=${lat},${lng}&radius=100000&keyword=cannabis store&key=${EndPoints.Google_API_Key}`,
    )
      .then(resp => resp.json())
      .then(resp => {
        setPaginationToens(resp?.next_page_token);

        if (resp?.results?.length > 0) {
          const filterData = _.filter(
            resp?.results,
            i => i !== undefined && !!i,
          );

          const allData = isPagination
            ? [...listData, ...filterData]
            : filterData;

          setIsLoading(true);
          getAllDetailsByPlaceId(allData)
            .then(r => {
              dataWithImageLink(r)
                .then(result => {
                  setListData(result);

                  setIsLoading(false);
                })
                .catch(() => {
                  setIsLoading(false);
                });
            })
            .catch(() => {
              setIsLoading(false);
            });

          setIsLoadMore(true);
        } else {
          setPaginationToens('');
          const allData = isPagination ? listData : [];

          if (allData?.length !== 0) {
            getAllDetailsByPlaceId(allData)
              .then(r => {
                dataWithImageLink(r)
                  .then(result => {
                    setListData(result);
                    setIsLoading(false);
                  })
                  .catch(() => {
                    setIsLoading(false);
                  });
              })
              .catch(() => {
                setIsLoading(false);
              });
          } else {
            setIsLoading(false);
          }

          setIsLoadMore(true);
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const getAllDetailsByPlaceId = items => {
    return new Promise(resolve => {
      const apiCall = [];
      _.map(items, i => {
        apiCall.push(getPlaceById(i?.place_id));
      });
      Promise.all(apiCall).then(resp => {
        resolve(resp);
      });
    });
  };

  const getPlaceById = id => {
    return new Promise(resolve => {
      fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?key=${EndPoints.Google_API_Key}&fields=review,rating,user_ratings_total,formatted_phone_number,formatted_address,place_id,opening_hours,website,name,photo,geometry&placeid=${id}`,
      )
        .then(result => result.json())
        .then(resp => {
          resolve(resp);
        });
    });
  };

  const dataWithImageLink = async data => {
    return new Promise(resolve => {
      const places = _.map(data, place => {
        return place.result;
      });
      resolve(places);
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

  function onPlaceSearch() {
    if (isNotSearchable) {
      return;
    }
    fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${EndPoints.Google_API_Key}&&region=us&input=${searchText}&types=(cities)`,
    )
      .then(result => result.json())
      .then(resp => {
        setPlaceResult(resp?.predictions);
      });
  }

  const onPressPlaceItem = async item => {
    setSearchModlaVisislbe(false);
    setisSearchable(true);
    const cords = await getCordinates(item?.place_id);

    const location = {
      lat: cords?.result?.geometry?.location?.lat,
      lng: cords?.result?.geometry?.location?.lng,
    };

    setSearchCordinates(location);
    setSearchText(item?.description);
    setSearchModlaVisislbe(false);
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

  const renderSearchBar = () => {
    return (
      <>
        <View style={styles.searchBarContainer}>
          <View style={styles.searchBar}>
            <View style={styles.search}>
              <FastImage source={images.search} style={styles.icon} />
              <TextInput
                style={styles.textInput}
                placeholder="Search City"
                placeholderTextColor={colors.grayShadeAB}
                returnKeyType={'done'}
                value={searchText}
                onChangeText={setSearchText}
                onFocus={() => {
                  setisSearchable(false), setSearchModlaVisislbe(true);
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
            _.map(placeResult, i => {
              return <RenderPlaceItem item={i} />;
            })}
        </ScrollView>
      </>
    );
  };

  const RenderPlaceItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.placeContainer}
        onPress={() => onPressPlaceItem(item)}
        hitSlop={{left: 10, right: 10, bottom: 10, top: 10}}
      >
        <Text style={styles.placeText} numberOfLines={2}>
          {item?.description}
        </Text>
      </TouchableOpacity>
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

  const renderPostItem = ({item}) => {
    const distance = getMyDistance(item);
    return (
      <DispensaryItemView
        item={item}
        distance={distance}
        routeName={routeName}
      />
    );
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
        onEndReached={() => getDataByCordinates(true)}
        ListFooterComponent={renderFooterLoader}
      />
    );
  };

  const renderButton = ND => {
    return (
      <TouchableOpacity
        style={[
          styles.mapIconContainer,
          {
            bottom: Platform.OS === 'ios' && ND ? '15%' : '8%',
          },
        ]}
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
        data={listData}
        currentLocation={currentLocation}
        routeName={routeName}
        info={info}
        searchData={listData}
        onDataChange={items => {
          const newItems = _.filter(items, i => !!i && i !== undefined);
          setIsLoading(true);
          getAllDetailsByPlaceId(newItems)
            .then(r => {
              dataWithImageLink(r)
                .then(result => {
                  setListData(result);
                  setIsLoading(false);
                })
                .catch(() => {
                  setIsLoading(false);
                });
            })
            .catch(() => {
              setIsLoading(false);
            });
        }}
        isDoctor={false}
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
          <View style={styles.container}>
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
                  {renderButton(true)}
                </View>
              </ScrollView>
            )}
          </View>
        </SafeAreaView>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>{renderMapView()}</SafeAreaView>
  );
};

export default memo(DispensariesScreen);
