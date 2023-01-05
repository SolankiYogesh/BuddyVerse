import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import ReactNativeModal from 'react-native-modal';
import colorPalates from '../../theme/colors/colorPalates';
import {ms, vs} from 'react-native-size-matters';
import AutoHeightImage from 'react-native-auto-height-image';
import images from '../../theme/images/images';

interface ImageViewModalProps {
  isVisible?: boolean;
  onClose?: () => void;
  Urls?: string[];
  intialIndex?: number;
}
const MultiImageViewing = ({
  Urls,
  onClose,
  isVisible,
  intialIndex = 0,
}: ImageViewModalProps) => {
  const {width} = useWindowDimensions();

  const renderItem = ({item}) => {
    return (
      <AutoHeightImage
        width={width}
        source={{uri: item}}
        resizeMode="contain"
        style={styles.imageStyle}
        borderRadius={ms(20)}
      />
    );
  };

  return (
    <ReactNativeModal
      isVisible={isVisible}
      style={styles.modalStyle}
      backdropColor={colorPalates.blackShade02}
    >
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Image
            source={images.cancelImage}
            resizeMode="contain"
            style={styles.imageCross}
          />
        </TouchableOpacity>
        <FlatList
          data={Urls}
          renderItem={renderItem}
          horizontal
          initialScrollIndex={intialIndex}
          snapToInterval={Dimensions.get('screen').width}
          decelerationRate={'fast'}
          snapToAlignment={'start'}
          disableIntervalMomentum
          keyExtractor={(_, index) => `images${index}`}
        />
      </SafeAreaView>
    </ReactNativeModal>
  );
};

export default MultiImageViewing;

const styles = StyleSheet.create({
  modalStyle: {
    padding: 0,
    margin: 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#121212',
  },
  imageStyle: {
    alignSelf: 'center',
    borderRadius: ms(20),
  },
  closeButton: {
    width: vs(20),
    height: vs(20),
    position: 'absolute',
    top: Platform.OS === 'ios' ? vs(40) : vs(20),
    right: '8%',
    zIndex: 1000,
  },
  imageCross: {
    width: '100%',
    height: '100%',
    tintColor: colorPalates.white,
  },
});
