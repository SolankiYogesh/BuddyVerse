import {
  ImageBackground,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import {ms} from 'react-native-size-matters';

import {images} from '../../theme/index';

interface UserImageProps {
  Url: string;
  size: number;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const UserImage = ({Url, size, onPress, style}: UserImageProps) => {
  const [isLoad, setisLoad] = useState(false);

  return (
    <TouchableOpacity
      style={[styles.container, {width: ms(size), height: ms(size)}, style]}
      disabled={!onPress}
      onPress={onPress}
    >
      <ImageBackground
        style={styles.imageStyle}
        source={!isLoad ? images.dp : undefined}
      >
        <FastImage
          source={{uri: Url, priority: FastImage.priority.normal}}
          style={styles.imageStyle}
          resizeMode="cover"
          onLoad={() => {
            setisLoad(true);
          }}
        />
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default UserImage;

const styles = StyleSheet.create({
  loadingVIew: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    overflow: 'hidden',
    borderRadius: ms(1000),
  },
  container: {
    overflow: 'hidden',
    borderRadius: ms(1000),
  },
  imageStyle: {
    width: '100%',
    height: '100%',
  },
  absolute: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
