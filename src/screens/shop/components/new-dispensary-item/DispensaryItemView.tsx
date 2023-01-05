import {
  FlatList,
  Image,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './DispensaryItemViewStyle';
import StarRating from 'react-native-star-rating';
import colors from '../../../../theme/colors/colors';
import images from '../../../../theme/images/images';
import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';
import screenNameEnum from '../../../../models/screenNameEnum';
import DynamicImageLoading from '../dynamic-image-loading/DynamicImageLoading';
import LinearGradient from 'react-native-linear-gradient';
import colorPalates from '../../../../theme/colors/colorPalates';
import {openDirections} from '../../../../utils/helper/helper';
import MultiImageViewing from '../../../../components/multi-images-viewer/MultiImageViewing';
import RenderLikeButton from '../../../feed/pages/feed-detail/components/RenderLikeButton';
import {useDispatch, useSelector} from 'react-redux';
import {searchLikeSliceActions} from '../../../../redux-wrapper/reducers/search-slice/searchLikeSlice';
import EndPoints from '../../../../Network/EndPoints';

const types = ['In-store shopping', 'In-store pick-up', 'Delivery'];

const DispensaryItemView = ({item}) => {
  const [visible, setIsVisible] = useState(false);
  const [imagesData, setImages] = useState(item?.images || []);
  const navigation = useNavigation();
  const [imageIndex, setImageIndex] = useState(0);
  const dispatch = useDispatch();
  const likedIDS = useSelector(state => state?.searchLike?.requestedIds);
  const isLikedByMe = _.includes(likedIDS, item?.place_id);
  const isOpen = item?.opening_hours?.open_now;
  const phoneNumber = item?.formatted_phone_number;

  useEffect(() => {
    getAllImagesData().then(resp => {
      setImages(resp);
    });
  }, []);

  const getAllImagesData = async () => {
    return new Promise(resolve => {
      const newData = [];
      const data = [item?.photos[0], item?.photos[1], item?.photos[2]];
      _.map(data, i => {
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

  const onPressDirections = () => {
    const destinationLat = item?.geometry?.location?.lat;
    const destinationLong = item?.geometry?.location?.lng;
    openDirections(destinationLat, destinationLong, item?.name);
  };

  const onPressCall = () => {
    let number = '';
    if (Platform.OS === 'android') {
      number = `tel:${item?.formatted_phone_number}`;
    } else {
      number = `telprompt:${item?.formatted_phone_number}`;
    }
    Linking.openURL(number);
  };

  const onPressImage = index => {
    setImageIndex(index);
    setIsVisible(true);
  };

  const onpressItemAboutScreen = () => {
    navigation.navigate(screenNameEnum.DispensaryNewAboutScreen, {
      data: item,
      images: imagesData,
    });
  };

  const renderImages = () => {
    return (
      !!item?.photos?.length &&
      item?.photos?.length !== 0 && (
        <View style={styles.imageListStyle}>
          <DynamicImageLoading
            item={item?.photos[0]}
            onPress={() => onPressImage(0)}
          />
          <DynamicImageLoading
            item={item?.photos[1]}
            onPress={() => onPressImage(1)}
          />
          <DynamicImageLoading
            item={item?.photos[2]}
            onPress={() => onPressImage(2)}
          />
        </View>
        // <FlatList
        //   data={item?.photos}
        //   extraData={useState}
        //   renderItem={renderImageView}
        //   keyExtractor={(t, index) => `images${index}`}
        //   horizontal
        //   style={styles.imageListStyle}
        // />
      )
    );
  };

  const renderItemTextSeperator = () => {
    return <View style={styles.dotView} />;
  };

  const renderType = () => {
    return (
      <FlatList
        data={types}
        extraData={types}
        horizontal
        keyExtractor={(_, i) => `Tom&Jerry${i}`}
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <RenderLikeButton
            onPressLike={() => {
              if (isLikedByMe) {
                dispatch(searchLikeSliceActions.removeId({id: item?.place_id}));
              } else {
                dispatch(searchLikeSliceActions.addRequestID(item?.place_id));
              }
            }}
            isLikedByMe={isLikedByMe}
          />
          <Text style={styles.like}>{isLikedByMe ? 1 : 0}</Text>
        </View>
      </View>
    );
  };

  const renderAboutView = () => {
    return (
      <TouchableOpacity onPress={onpressItemAboutScreen}>
        <Text style={styles.nameText}>{item?.name}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{item?.rating}</Text>
          <StarRating
            disabled={true}
            starSize={15}
            rating={Number(item?.rating)}
            fullStarColor={colors.yellowShadeFFC}
          />
        </View>
        <View style={styles.ratingContainer}>
          <Text
            style={[
              styles.ratingText,
              {color: isOpen ? colors.greenShade2A : colors.redShadeC0},
            ]}
          >
            {isOpen ? 'Open' : 'Closed'}
          </Text>
        </View>

        {renderType()}
        {renderButtons()}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      {renderImages()}
      {renderAboutView()}

      {visible && imagesData.length !== 0 && (
        <MultiImageViewing
          isVisible={visible}
          Urls={imagesData}
          onClose={() => setIsVisible(false)}
          intialIndex={imageIndex}
        />
      )}
    </View>
  );
};

export default DispensaryItemView;
