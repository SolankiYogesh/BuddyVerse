import React, {useEffect, useState} from 'react';
import {TouchableOpacity, ActivityIndicator, View} from 'react-native';
import {ms, s, ScaledSheet, vs} from 'react-native-size-matters';
import EndPoints from '../../../../Network/EndPoints';
import colors from '../../../../theme/colors/colors';
import images from '../../../../theme/images/images';
import CachedImage from 'react-native-image-cache-wrapper';

const DynamicImageLoading = ({
  item,
  onPress = () => {},
  style = {},
  loaderStyle = {},
}) => {
  const [image, setImage] = useState('');

  useEffect(() => {
    const prefrerence = item?.photo_reference;

    fetch(
      `https://maps.googleapis.com/maps/api/place/photo?photoreference=${prefrerence}&sensor=false&maxheight=100&maxwidth=100&key=${EndPoints.Google_API_Key}`,
    )
      .then(resp => {
        setImage(resp?.url);
      })
      .catch(() => {
        setImage(null);
      });
  }, []);

  return (
    <>
      <TouchableOpacity onPress={onPress} style={[styles.imageView, style]}>
        {!!image && (
          <CachedImage
            source={!!image ? {uri: image} : images.placeHolderShop}
            resizeMode="cover"
            style={styles.style}
            defaultSource={images.placeHolderImage}
            activityIndicator={
              <View style={[styles.loaderContainer, loaderStyle]}>
                <ActivityIndicator size={'small'} color={colors.greenShade2A} />
              </View>
            }
          />
        )}
      </TouchableOpacity>
    </>
  );
};

export default DynamicImageLoading;

const styles = ScaledSheet.create({
  imageView: {
    width: vs(80),
    height: vs(80),
    marginLeft: s(5),
    overflow: 'hidden',
  },
  style: {
    width: '100%',
    height: '100%',
    borderRadius: ms(10),
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: vs(80),
    height: vs(80),
    position: 'absolute',
    zIndex: 1000,
  },
});
