import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Linking,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './DispensaryNewAboutStyle';
import StarRating from 'react-native-star-rating';
import colors from '../../../../theme/colors/colors';
import MapsImageRender from '../../components/dynamic-maps-images/MapsImageRender';
import ScreenHeader from '../../components/screen-header/ScreenHeader';
import LinearGradient from 'react-native-linear-gradient';
import colorPalates from '../../../../theme/colors/colorPalates';
import OverviewTab from '../../components/about-screens-tabs/OverviewTab';
import ReviewTab from '../../components/about-screens-tabs/ReviewTab';
import {doctorsShare, openDirections} from '../../../../utils/helper/helper';
import _ from 'lodash';
import MultiImageViewing from '../../../../components/multi-images-viewer/MultiImageViewing';
import FastImage from 'react-native-fast-image';
import {SvgXml} from 'react-native-svg';
import svg from '../../../../theme/images/svg';
import {ms} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {searchLikeSliceActions} from '../../../../redux-wrapper/reducers/search-slice/searchLikeSlice';
import EndPoints from '../../../../Network/EndPoints';
import LoadingContainer from '../../../../components/loading-container/LoadingContainer';
import {useFeedService} from '../../../../services/feed-service/useFeedService';
import images from '../../../../theme/images/images';

const DispensaryNewAboutScreen = props => {
  const [data, setData] = useState(props?.route?.params?.data || null);
  const placeID = props?.route?.params?.placeID;
  const {getGooglePlacesReferredSmartLink} = useFeedService();
  const [index, setIndex] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);
  const [visible, setIsVisible] = useState(false);
  const phoneNumber = data?.formatted_phone_number;
  const [shareCount, setShareCount] = useState(0);
  const dispatch = useDispatch();
  const likedIDS = useSelector(state => state?.searchLike?.requestedIds);
  const isLikedByMe = _.includes(likedIDS, data?.place_id || placeID);
  const [loading, setLoading] = useState(false);
  const [Images, setImages] = useState(props?.route?.params?.images || []);

  useEffect(() => {
    if (Images?.length === 0) {
      getAllImagesData().then(resp => {
        setImages(resp);
      });
    }
  }, []);

  const getAllImagesData = async () => {
    return new Promise(resolve => {
      const newData = [];
      const d = [data?.photos[0], data?.photos[1], data?.photos[2]];

      _.map(d, i => {
        newData.push(
          fetch(
            `https://maps.googleapis.com/maps/api/place/photo?photoreference=${i?.photo_reference}&sensor=false&maxheight=800&maxwidth=800&key=${EndPoints.Google_API_Key}`,
          ),
        );
      });
      Promise.all(newData).then(resp => {
        const imagesD = _.map(resp, i => {
          return i?.url;
        });
        resolve(imagesD);
      });
    });
  };

  useEffect(() => {
    if (!!placeID) {
      setLoading(true);
      fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?key=${EndPoints.Google_API_Key}&fields=review,rating,user_ratings_total,formatted_phone_number,formatted_address,place_id,opening_hours,website,name,photo,geometry&placeid=${placeID}`,
      )
        .then(result => result.json())
        .then(resp => {
          setData(resp?.result);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [placeID]);

  const onPressDirections = () => {
    const destinationLat = data?.geometry?.location?.lat;
    const destinationLong = data?.geometry?.location?.lng;
    openDirections(destinationLat, destinationLong, data?.name);
  };

  const onPressShare = async () => {
    const obj = JSON.parse(JSON.stringify(data));

    getGooglePlacesReferredSmartLink(data).then(async shareData => {
      const isShare = await doctorsShare(shareData, obj);
      if (isShare) {
        setShareCount(shareCount + 1);
      }
    });
  };

  const onPressCall = () => {
    let number = '';
    if (Platform.OS === 'android') {
      number = `tel:${data?.formatted_phone_number}`;
    } else {
      number = `telprompt:${data?.formatted_phone_number}`;
    }
    Linking.openURL(number);
  };

  const renderTopImageView = () => {
    return (
      <MapsImageRender
        Images={Images}
        onPress={item => {
          const id = _.findIndex(Images, i => i === item);
          setImageIndex(id);
          setIsVisible(true);
        }}
      />
    );
  };

  const renderAboutView = () => {
    return (
      <View style={styles.aboutContainer}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{data?.rating}</Text>
          <StarRating
            disabled={true}
            starSize={15}
            rating={Number(data?.rating)}
            fullStarColor={colors.yellowShadeFFC}
          />
          <Text
            style={styles.ratingText}
          >{`(${data?.user_ratings_total})`}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Text style={[styles.ratingText]}>Cannabis Store</Text>
        </View>

        {renderButtons()}
      </View>
    );
  };

  const renderButtons = () => {
    return (
      <View style={styles.btnContainer}>
        <LinearGradient
          start={{x: 0.0, y: 2.5}}
          end={{x: 1.5, y: 2.5}}
          locations={[0, 0.5]}
          colors={[colorPalates.greenShade60, colorPalates.AppTheme.primary]}
          style={styles.directionBtn}
        >
          <TouchableOpacity
            style={styles.gradientCOntainer}
            onPress={onPressDirections}
          >
            <Image source={images.directions} style={styles.directionsIcon} />
            <Text style={styles.directionBtnText}>Directions</Text>
          </TouchableOpacity>
        </LinearGradient>

        {!!phoneNumber && (
          <TouchableOpacity
            style={[styles.directionBtn, {backgroundColor: colors.white}]}
            onPress={onPressCall}
          >
            <Image
              source={images.call}
              style={[styles.directionsIcon, {tintColor: colors.greenShade60}]}
            />
            <Text
              style={[styles.directionBtnText, {color: colors.greenShade60}]}
            >
              Call to Order
            </Text>
          </TouchableOpacity>
        )}
        <View style={styles.column}>
          <View style={styles.row2}>
            <TouchableOpacity
              style={styles.likeBtn}
              onPress={() => {
                onPressShare();
              }}
            >
              <FastImage source={images.share} style={styles.icon} />
              <Text style={[styles.openBtnTxt, styles.likeText]}>
                {shareCount || 0}
              </Text>
            </TouchableOpacity>
            <View style={styles.likeBtn}>
              <TouchableOpacity
                onPress={() => {
                  if (isLikedByMe) {
                    dispatch(
                      searchLikeSliceActions.removeId({
                        id: data?.place_id || placeID,
                      }),
                    );
                  } else {
                    dispatch(
                      searchLikeSliceActions.addRequestID(
                        data?.place_id || placeID,
                      ),
                    );
                  }
                }}
              >
                {isLikedByMe ? (
                  <SvgXml xml={svg.like} height={ms(24)} width={ms(24)} />
                ) : (
                  <SvgXml xml={svg.unlike} height={ms(24)} width={ms(24)} />
                )}
              </TouchableOpacity>
              <Text style={[styles.openBtnTxt, styles.likeText]}>
                {isLikedByMe ? 1 : 0}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader isBackVisible title="Dispensaries" />

      {!loading ? (
        <View style={styles.mainContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{flex: 1}}
            contentContainerStyle={{flexGrow: 1}}
          >
            {renderTopImageView()}
            {renderAboutView()}

            <View style={styles.tavContainer}>
              <TouchableOpacity
                style={[
                  styles.btnContainerTab,
                  index === 1 && styles.focusButton,
                ]}
                onPress={() => setIndex(1)}
              >
                <Text
                  style={[styles.tabBarTitle, index === 1 && styles.focusText]}
                >
                  OVERVIEW
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.btnContainerTab,
                  index === 2 && styles.focusButton,
                ]}
                onPress={() => {
                  setIndex(2);
                }}
              >
                <Text
                  style={[styles.tabBarTitle, index === 2 && styles.focusText]}
                >
                  REVIEWS
                </Text>
              </TouchableOpacity>
            </View>
            {index === 1 ? (
              <OverviewTab
                data={data}
                onSwipe={() => setIndex(2)}
                onPressDirections={onPressDirections}
              />
            ) : (
              <ReviewTab data={data} onSwipe={() => setIndex(1)} />
            )}
          </ScrollView>
        </View>
      ) : (
        <LoadingContainer />
      )}

      {visible && Images?.length !== 0 && (
        <MultiImageViewing
          isVisible={visible}
          Urls={Images}
          onClose={() => setIsVisible(false)}
          intialIndex={imageIndex}
        />
      )}
    </SafeAreaView>
  );
};

export default DispensaryNewAboutScreen;
