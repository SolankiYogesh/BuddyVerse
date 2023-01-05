import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import {styles, dispensaryContainerStyle} from './DisplayDispensariesStyle';
import StarRating from 'react-native-star-rating';
import colors from 'theme/colors/colors';
import {useNavigation} from '@react-navigation/native';
import {Query} from '../../../../Network/Query';
import APICall from 'Network/APICall';
import EndPoints from 'Network/EndPoints';
import {SvgXml} from 'react-native-svg';
import svg from '../../../../theme/images/svg';
import {ms} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import {colorPalates} from 'theme';
import images from '../../../../theme/images/images';
import screenNameEnum from '../../../../models/screenNameEnum';
import {useDispatch, useSelector} from 'react-redux';
import {searchLikeSliceActions} from '../../../../redux-wrapper/reducers/search-slice/searchLikeSlice';
import _ from 'lodash';
import ModalsMessages from '../../../../models/ModalsMessages';
import AnnounceMentModal from '../../../../components/annoucement-modal/AnnounceMentModal';

const DisplayDispensaries = (props: {
  data;
  navigation;
  distance;
  routeName;
  index;
  isDoctor;
}) => {
  const {distance, index, routeName, data, isDoctor = false} = props;

  const navigation = useNavigation();
  const [isImageLoading, setImageLoading] = useState(true);
  const dispatch = useDispatch();
  const likedIDS = useSelector(state => state?.searchLike?.requestedIds);
  const isLikedByMe = _.includes(likedIDS, data?.shopid);
  const [errorModal, setErrormodal] = useState(false);

  const onGoDetails = () => {
    navigation.push(screenNameEnum.DispensaryAboutScreen, {
      data,
      distance: distance,
      routeName: routeName,
      index: index,
      isDoctor: isDoctor,
    });
  };

  const onPressLike = id => {
    if (id) {
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
          shopid: id,
          option: 'like',
        },
      };
      try {
        APICall('post', payload, EndPoints.APIURL, header).then(resp => {
          if (resp?.status === 200 && resp?.data?.data) {
            if (isLikedByMe) {
              dispatch(searchLikeSliceActions.removeId({id: id}));
            } else {
              dispatch(searchLikeSliceActions.addRequestID(id));
            }
          }
        });
      } catch (error) {
        setErrormodal(true);
      }
    }
  };
  const renderRightContainer = () => {
    return (
      <View style={styles.rightContainer}>
        <Text style={styles.name} numberOfLines={2}>
          {data?.business_name || data?.business_na || data?.name}
        </Text>
        <View style={styles.star}>
          <View style={styles.starrate}>
            <StarRating
              disabled={true}
              starSize={15}
              rating={Number(data?.rating)}
              fullStarColor={colors.yellowShadeFFC}
            />
          </View>
          <Text style={styles.rate}>{data?.rating}</Text>
        </View>

        <Text style={styles.miles}>{distance} mile</Text>

        <Text style={styles.cityName}>
          {!isDoctor && data?.plus_code?.compound_code}
          {isDoctor && data?.city === 'NULL' ? '' : data?.city}
          {isDoctor && data?.city !== 'NULL' && ', '}
          {isDoctor && data?.state === 'NULL' ? '' : data?.state}
        </Text>
        <View style={styles.likeContainer}>
          <TouchableOpacity
            style={styles.likeIcon}
            onPress={() => {
              onPressLike(data?.shopid);
            }}
          >
            {isLikedByMe ? (
              <SvgXml xml={svg.like} height={ms(24)} width={ms(24)} />
            ) : (
              <SvgXml xml={svg.unlike} height={ms(24)} width={ms(24)} />
            )}
          </TouchableOpacity>
          <Text style={styles.like}>{isLikedByMe ? 1 : 0}</Text>
        </View>
      </View>
    );
  };

  const renderContainer = () => {
    return (
      <TouchableOpacity
        style={
          routeName !== 'Deliveries'
            ? dispensaryContainerStyle(false).item
            : dispensaryContainerStyle(true).item
        }
        onPress={() => onGoDetails()}
      >
        <View style={styles.leftContainer}>
          <View style={styles.image}>
            <FastImage
              source={data?.image ? {uri: data?.image} : images.greenLyncLogo}
              style={styles.imgSize}
              resizeMode="cover"
              onLoadEnd={() => setImageLoading(false)}
            />
          </View>
          {isImageLoading && (
            <View style={styles.loader}>
              <ActivityIndicator
                color={colorPalates.greenShade2A}
                animating={true}
                size="small"
              />
            </View>
          )}
        </View>
        {renderRightContainer()}
        <AnnounceMentModal
          modalVisible={errorModal}
          title={'Oops'}
          buttonText={'Ok'}
          messageText={ModalsMessages.ModalsMassages.somethingWentWrong}
          onPressButton={() => setErrormodal(false)}
        />
      </TouchableOpacity>
    );
  };

  return renderContainer();
};
export default DisplayDispensaries;
