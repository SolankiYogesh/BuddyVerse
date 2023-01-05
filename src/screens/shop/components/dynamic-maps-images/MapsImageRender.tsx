import React, {useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {TouchableOpacity} from 'react-native';
import {ms, s, ScaledSheet, vs} from 'react-native-size-matters';
import CachedImage from 'react-native-image-cache-wrapper';
import images from '../../../../theme/images/images';

const MapsImageRender = ({Images, onPress}) => {
  const onPressImage = item => {
    onPress(item);
  };

  const renderImage = ({item}) => {
    return (
      <TouchableOpacity onPress={() => onPressImage(item)}>
        <CachedImage
          source={{uri: item}}
          resizeMode="cover"
          style={styles.singleImage}
          defaultSource={images.placeHolderImage}
        />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      style={styles.listStyle}
      renderItem={renderImage}
      keyExtractor={(_, index) => `imagesData${index}`}
      data={Images}
      extraData={useState}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default MapsImageRender;

const styles = ScaledSheet.create({
  listStyle: {
    width: '100%',
    marginTop: ms(10),
    padding: s(5),
    flex: 1,
  },
  singleImage: {
    width: s(200),
    height: vs(250),
    borderRadius: ms(10),
    marginRight: s(10),
  },
  doubleImage: {
    width: s(200),
    height: vs(120),
    borderRadius: ms(10),
  },
  doubleImageCOntainer: {
    flexDirection: 'column',
    marginRight: s(10),
  },
  devider: {
    marginVertical: s(5),
  },
});
