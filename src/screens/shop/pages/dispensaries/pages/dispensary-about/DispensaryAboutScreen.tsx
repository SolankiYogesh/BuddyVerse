import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {ms} from 'react-native-size-matters';
import StarRating from 'react-native-star-rating';
import ScreenHeader from 'screens/feed/components/screen-header/ScreenHeader';
import styles from './DispensaryAboutScreenStyle';
import colors from 'theme/colors/colors';
import AboutTabBar from '../../../../components/about-tab-bar/AboutTabBar';
import FastImage from 'react-native-fast-image';
import AppLoadingImage from 'screens/shop/components/AppLoadingImage/AppLoadingImage';
import {debugLogs} from 'utils/logs/logs';
import {useFeedService} from 'services/feed-service/useFeedService';
import {doctorsShare, showToast} from 'utils/helper/helper';
import EndPoints from 'Network/EndPoints';
import APICall from 'Network/APICall';
import svg from '../../../../../../theme/images/svg';
import {SvgXml} from 'react-native-svg';
import images from '../../../../../../theme/images/images';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import {searchLikeSliceActions} from '../../../../../../redux-wrapper/reducers/search-slice/searchLikeSlice';
import AnnounceMentModal from '../../../../../../components/annoucement-modal/AnnounceMentModal';
import ModalsMessages from '../../../../../../models/ModalsMessages';
import LoadingContainer from '../../../../../../components/loading-container/LoadingContainer';
import {Query} from '../../../../../../Network/Query';

const DispensaryAboutScreen = props => {
  const {navigation, route} = props;
  const dispatch = useDispatch();
  const [errorModal, setErrormodal] = useState(false);
  const {distance, routeName} = route.params;

  const shopID = route?.params?.shopID;

  const [data, setData] = useState(route?.params?.data || null);
  const likedIDS = useSelector(state => state?.searchLike?.requestedIds);
  const isLikedByMe = _.includes(likedIDS, data?.shopid || shopID);
  const headerTitle =
    route?.params?.routeName === 'doctors'
      ? 'Doctor'
      : route?.params?.routeName;
  const isDoctor = props?.route?.params?.isDoctor;
  const [loading, setLoading] = useState(false);

  const {getDoctorPlacesReferredSmartLink} = useFeedService();

  const shares = data?.reactionsCount?.share;

  useEffect(() => {
    if (!!shopID) {
      getDoctor();
    }
  }, [shopID]);

  const getDoctor = () => {
    const header = {
      'x-api-key': EndPoints.APIKEY,
    };

    const query = Query.getSingleRecord;
    // routeName === 'Dispensaries'
    //   ? Query.getDispensary
    //   : routeName === 'Deliveries'
    //   ? Query.getDiliveries
    //   : Query.getDoctorData;
    const payload = {
      query,
      variables: {
        shopid: Number(shopID),
      },
    };
    setLoading(true);
    APICall('post', payload, EndPoints.APIURL, header)
      .then(resp => {
        setLoading(false);

        if (resp?.status === 200 && resp?.data?.data) {
          setData(resp?.data?.data?.getDoctorSingleRecoed[0]);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };
  // const dispatch = useDispatch();

  const onPressShare = async () => {
    const obj = JSON.parse(JSON.stringify(data));

    getDoctorPlacesReferredSmartLink(obj)
      .then(async shareData => {
        await doctorsShare(shareData, obj);
      })
      .catch(error => {
        debugLogs('shareData error', error);
      });
  };

  const onPressLike = () => {
    if (data?.shopid) {
      const header = {
        'x-api-key': EndPoints.APIKEY,
      };
      const query =
        routeName === 'dispensary'
          ? Query.likedislikeDispensary
          : routeName === 'Deliveries'
          ? Query.likedislikeDelivery
          : Query.likeDislikeDocotor;
      const payload = {
        query,
        variables: {
          shopid: data?.shopid || shopID,
          option: 'like',
        },
      };

      try {
        APICall('post', payload, EndPoints.APIURL, header)
          .then(resp => {
            if (resp?.status === 200 && resp?.data?.data) {
              if (isLikedByMe) {
                dispatch(
                  searchLikeSliceActions.removeId({id: data?.shopid || shopID}),
                );
              } else {
                dispatch(
                  searchLikeSliceActions.addRequestID(data?.shopid || shopID),
                );
              }
            }
          })
          .catch(() => {
            showToast('oops! Something went wrong, Try again later');
          });
      } catch (error) {
        setErrormodal(true);
      }
    }
  };

  const renderTopImage = () => {
    return (
      <AppLoadingImage
        url={data?.image}
        style={styles.imageURL}
        resizeMode={'cover'}
        isPlaceHolder={true}
        placeHolderImage={images.greenLyncLogo}
      />
    );
  };

  const renderTitle = () => {
    return (
      <View style={styles.textView}>
        <Text style={styles.titleText}>
          {data?.business_name || data?.business_na || data?.name}
        </Text>
        <View style={styles.star}>
          <View style={styles.starrate}>
            <StarRating
              disabled={false}
              starSize={ms(15)}
              rating={Number(data?.rating)}
              fullStarColor={colors.yellowShadeFFC}
            />
          </View>
          <Text style={styles.rate}>{data?.rating}</Text>
        </View>
      </View>
    );
  };

  const renderBottomInfo = () => {
    return (
      <View style={styles.row}>
        <View style={styles.column}>
          <View style={styles.row1}>
            <Text style={styles.secondtext}>{distance} mi</Text>
          </View>
        </View>

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
                {shares || 0}
              </Text>
            </TouchableOpacity>
            <View style={styles.likeBtn}>
              <TouchableOpacity
                onPress={() => {
                  onPressLike();
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

  const renderTopContainer = () => {
    return (
      <>
        {renderTopImage()}
        {renderTitle()}
        {renderBottomInfo()}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader isBackVisible={true} title={headerTitle || ''} />
      {loading ? (
        <LoadingContainer />
      ) : (
        <View style={styles.mainContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
              {renderTopContainer()}
              <AboutTabBar
                navigation={navigation}
                data={data}
                route={route}
                isDoctor={isDoctor}
              />
            </View>
          </ScrollView>
        </View>
      )}

      <AnnounceMentModal
        modalVisible={errorModal}
        title={'Oops'}
        buttonText={'Ok'}
        messageText={ModalsMessages.ModalsMassages.somethingWentWrong}
        onPressButton={() => setErrormodal(false)}
      />
    </SafeAreaView>
  );
};

export default DispensaryAboutScreen;
