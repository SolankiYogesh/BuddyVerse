import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Modal from 'react-native-modal';
import images from '../../theme/images/images';
import {ms, vs} from 'react-native-size-matters';
import colorPalates from '../../theme/colors/colorPalates';
import Video from 'react-native-video';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import convertToProxyURL from 'react-native-video-cache';
import FastImage from 'react-native-fast-image';

interface ImageViewModalProps {
  isVisible?: boolean;
  onClose?: () => void;
  Url: string;
  thumb?: string;
  newAspectRatio?: number;
}

const ImageVIewModal = ({
  Url,
  thumb,
  onClose,
  isVisible,
  newAspectRatio,
}: ImageViewModalProps) => {
  const videoPlayer = useRef<Video>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [isLoading, setIsLoading] = useState(false);

  const onSeek = seek => {
    videoPlayer?.current?.seek(seek);
  };

  useEffect(() => {
    setPaused(true);
    setPlayerState(PLAYER_STATES.PLAYING);
  }, []);

  const onPaused = ps => {
    setPaused(!paused);
    setPlayerState(ps);
  };

  const onReplay = () => {
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer?.current?.seek(0);
    setTimeout(() => {
      setPaused(true);
    }, 500);
  };

  const onProgress = res => {
    setCurrentTime(res?.currentTime);
  };

  const onLoadStart = () => setIsLoading(true);

  const onEnd = () => {
    setPlayerState(PLAYER_STATES.ENDED), setCurrentTime(0);
    setPaused(false);
  };

  const onSeeking = ct => setCurrentTime(ct);

  const onPressCancelSelection = () => {
    setTimeout(() => {
      onClose && onClose();
    }, 100);
  };
  return (
    <Modal
      isVisible={isVisible}
      style={styles.modalStyle}
      backdropColor={colorPalates.blackShade02}
      onBackButtonPress={onPressCancelSelection}
      onBackdropPress={onPressCancelSelection}
    >
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Image
            source={images.cancelImage}
            resizeMode="contain"
            style={styles.imageCross}
          />
        </TouchableOpacity>

        <View style={[styles.videoParent]}>
          <FastImage
            source={{
              uri: thumb,
            }}
            style={{
              width: '100%',
              aspectRatio: newAspectRatio,
              borderRadius: ms(20),
              overflow: 'hidden',
              // ...StyleSheet.absoluteFillObject,
            }}
            resizeMode={'contain'}
          />
          <Video
            source={{uri: convertToProxyURL(Url)}}
            style={[
              styles.videoStyle,
              {
                aspectRatio: newAspectRatio,
              },
            ]}
            onEnd={onEnd}
            onLoadStart={onLoadStart}
            onLoad={e => {
              setIsLoading(false);
              setDuration(e?.duration);
            }}
            onProgress={onProgress}
            paused={!paused}
            ref={videoPlayer}
            repeat={false}
            resizeMode={'cover'}
            controls={Platform.OS === 'ios'}
          />
          {Platform.OS !== 'ios' && (
            <MediaControls
              duration={duration}
              isLoading={isLoading}
              mainColor={colorPalates.AppTheme.primary}
              onPaused={onPaused}
              onReplay={onReplay}
              onSeek={onSeek}
              onSeeking={onSeeking}
              playerState={playerState}
              progress={currentTime}
              showOnStart={false}
              fadeOutDelay={1000}
              toolbarStyle={undefined}
              containerStyle={{}}
              isFullScreen={false}
              onFullScreen={() => {}}
              sliderStyle={undefined}
              children={undefined}
            />
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ImageVIewModal;

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
    borderRadius: colorPalates.size.defaultBorderRadius,
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
  videoStyle: {
    backgroundColor: 'transparent',
    borderRadius: ms(20),
    position: 'absolute',
    width: '100%',
  },
  videoParent: {
    borderRadius: ms(20),
    overflow: 'hidden',
    width: Dimensions.get('window').width,
    alignSelf: 'center',
    overlayColor: 'hidden',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
