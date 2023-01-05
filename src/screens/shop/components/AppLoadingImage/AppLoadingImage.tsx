import React, {useState} from 'react';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ms} from 'react-native-size-matters';
import {colorPalates} from 'theme';

interface AppLoadingImageProps {
  style: Object;
  imageStyle: Object;
  url: String;
  resizeMode: String;
  isPlaceHolder: Boolean;
  placeHolderImage: Number;
}

const AppLoadingImage = (prop: AppLoadingImageProps) => {
  const {url, style, imageStyle = {}, resizeMode} = prop;

  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);
  const [imgUrl] = useState(url);
  return (
    <View style={style}>
      <>
        {url !== null && url !== '' && !loadingError ? (
          <FastImage
            // style={[styles.imgSize, imageStyle]}
            style={styles.imgSize}
            source={{
              uri: imgUrl,
              priority: FastImage.priority.normal,
            }}
            resizeMode={resizeMode}
            onLoadEnd={() => setIsLoading(false)}
            onError={() => setLoadingError(true)}
          />
        ) : (
          <View style={style} />
        )}
        {url !== null && isLoading && url !== '' && (
          <View style={styles.loader}>
            <ActivityIndicator
              color={colorPalates.greenShade2A}
              animating={true}
              size="small"
            />
          </View>
        )}
      </>
    </View>
  );
};

export default AppLoadingImage;

AppLoadingImage.defaultProps = {
  style: {},
  imageStyle: {},
  url: null,
  resizeMode: 'contain',
  isPlaceHolder: true,
  placeHolderImage: null,
};

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgSize: {
    margin: ms(16),
    height: '70%',
    width: '70%',
    alignSelf: 'center',
    // width: '60%',
    // height: '60%',
    // padding:20
  },
});
