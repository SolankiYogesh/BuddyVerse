import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ImageVideoLoaderStyle from './ImageVideoLoaderStyle';
import Video from 'react-native-video';
import images from '../../theme/images/images';
import FastImage, {ResizeMode} from 'react-native-fast-image';
import ImageVIewModal from '../image-view-modal/ImageVIewModal';
import ImageView from 'react-native-image-viewing';
import convertToProxyURL from 'react-native-video-cache';
import {useIsFocused} from '@react-navigation/native';
import _ from 'lodash';

const ImageVideoLoader = (props: {
  data: any;
  isVideoVisible: boolean;
  feed;
  isMuteVisible: boolean;
}) => {
  const focus = useIsFocused();
  const {data, isVideoVisible, feed, isMuteVisible = true} = props;
  const [play, setPlay] = useState(true);
  const [imageIndexUrl, setImageIndexUrl] = useState(
    data?.imageUrl || data?.__private_8_imageUrl,
  );
  let aspectRatio = 1;
  let resize = 'contain';

  if (
    feed &&
    feed?.properties &&
    feed?.properties?.width &&
    feed?.properties?.height
  ) {
    aspectRatio =
      Number(feed?.properties?.width) / Number(feed?.properties?.height);
    resize =
      feed?.properties?.width < 500 && feed?.properties?.height < 500
        ? 'cover'
        : 'contain';
  }
  let url = '';
  if (data?.videoUrl) {
    const index = data?.videoUrl?.lastIndexOf('mediafilename=');
    const removeExt = data?.videoUrl?.replace('.mp4', '');
    const finalString = removeExt?.slice(index, removeExt?.length);
    const fileName = finalString?.replace('mediafilename=', '');
    url = `https://d1c70unjid1vm2.cloudfront.net/public/${fileName}.jpg`;
  }

  const videoPlayer = useRef<Video>(null);
  const [muted, setMuted] = useState(true);
  const [thumb, setThumb] = useState(url);
  const [visible, setVisible] = useState(false);
  const [newAspectRatio, setNewAspectRatio] = useState(aspectRatio);
  const [resizeMode, setResizeMode] = useState<ResizeMode>(resize);
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    if (isVideoVisible && data && data?.videoUrl) {
      const index = data?.videoUrl?.lastIndexOf('mediafilename=');
      const removeExt = data?.videoUrl?.replace('.mp4', '');
      const finalString = removeExt?.slice(index, removeExt?.length);
      const fileName = finalString?.replace('mediafilename=', '');
      const newUrl = `https://d1c70unjid1vm2.cloudfront.net/public/${fileName}.jpg`;
      setThumb(newUrl);
      downloadVideo(fileName);
    }
  }, [data?.videoUrl, isVideoVisible]);

  const downloadVideo = fileName => {
    if (_.includes(data?.videoUrl, 'm3u8')) {
      const downloadUrl = `https://d1wd77iqpfpytn.cloudfront.net/public/${fileName}.mp4`;
      setVideoUrl(downloadUrl);
    } else {
      setVideoUrl(data?.videoUrl);
    }
  };

  useEffect(() => {
    const imageUrl = data?.imageUrl || data?.__private_8_imageUrl;
    if (imageUrl) {
      setImageIndexUrl(imageUrl);
    } else {
      const index = data?.videoUrl?.lastIndexOf('mediafilename=');
      const removeExt = data?.videoUrl?.replace('.mp4', '');
      const finalString = removeExt?.slice(index, removeExt?.length);
      const fileName = finalString?.replace('mediafilename=', '');
      const newUrl = `https://d1c70unjid1vm2.cloudfront.net/public/${fileName}.jpg`;
      setThumb(newUrl);
    }
  }, [data]);

  useEffect(() => {
    if (!!data?.videoUrl) {
      if (!focus) {
        setPlay(false);
        videoPlayer?.current?.setNativeProps({paused: true});
      } else {
        videoPlayer?.current?.setNativeProps({paused: false});
        setPlay(true);
      }
    }
  }, [focus]);

  const onSetImageWidthHeight = event => {
    if (!feed?.properties?.width || !feed?.properties?.height) {
      //for Image (react-native)
      // const width = event?.nativeEvent?.source?.width;
      // const height = event?.nativeEvent?.source?.height;
      //for FastImage
      const width = event?.nativeEvent?.width;
      const height = event?.nativeEvent?.height;
      if (width < 500 && height < 500) {
        setResizeMode('cover');
      }

      setNewAspectRatio(width / height);
    }
  };

  const onSetVideoWidthHeight = event => {
    if (!feed?.properties?.width || !feed?.properties?.height) {
      const width = event.nativeEvent.width;
      const height = event.nativeEvent.height;
      if (width < 500 && height < 500) {
        setResizeMode('cover');
      }
      setNewAspectRatio(width / height);
    }
  };

  const onEnd = () => {
    videoPlayer?.current?.seek(0);
  };

  const renderImage = () => {
    let fileName = imageIndexUrl.split('/').pop();
    fileName = fileName.split('.');
    fileName = `${fileName[0]}-original.${fileName[1]}`;
    const imgUrl = `https://d1c70unjid1vm2.cloudfront.net/public/${fileName}`;
    return (
      <View
        style={[ImageVideoLoaderStyle.container, {aspectRatio: newAspectRatio}]}
      >
        <TouchableOpacity
          onPress={() => {
            setMuted(true);
            setVisible(true);
          }}
          disabled={!isMuteVisible}
        >
          <FastImage
            style={[
              ImageVideoLoaderStyle.feedImage,
              {aspectRatio: newAspectRatio},
            ]}
            source={{
              uri: imgUrl,
              // cache: FastImage.cacheControl.cacheOnly,
            }}
            onLoad={onSetImageWidthHeight}
            resizeMode={resizeMode}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderVideo = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setMuted(true);
          setVisible(true);
        }}
        disabled={!isMuteVisible}
      >
        <View
          style={[
            ImageVideoLoaderStyle.container,
            {aspectRatio: newAspectRatio},
          ]}
        >
          {!!data?.videoUrl && (
            <FastImage
              source={{
                uri: thumb,
              }}
              style={{
                width: '100%',
                aspectRatio: newAspectRatio,
                ...StyleSheet.absoluteFillObject,
              }}
              onLoad={onSetVideoWidthHeight}
              resizeMode={resizeMode}
            />
          )}
          {!!data?.videoUrl && !!videoUrl && isVideoVisible && (
            <Video
              paused={!isVideoVisible && play}
              ref={videoPlayer}
              repeat={true}
              resizeMode={resizeMode}
              controls={false}
              // onLoadStart={onLoadStart}
              // onLoad={onVideoLoad}
              muted={muted}
              source={{
                uri: convertToProxyURL(videoUrl),
              }}
              onEnd={onEnd}
              style={[
                ImageVideoLoaderStyle.videoContainer,
                {
                  aspectRatio: newAspectRatio,
                },
              ]}
            />
          )}
          {!!data?.videoUrl && isMuteVisible && (
            <TouchableOpacity
              onPress={() => {
                setMuted(!muted);
              }}
              style={[
                ImageVideoLoaderStyle.parentView,
                {aspectRatio: newAspectRatio},
              ]}
            >
              <View style={ImageVideoLoaderStyle.mutedView}>
                <Image
                  source={muted ? images.mute : images.volume}
                  style={ImageVideoLoaderStyle.mutedStyle}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderZoomModal = () => {
    if (data?.videoUrl && !!videoUrl && visible) {
      return (
        <ImageVIewModal
          Url={videoUrl}
          isVisible={visible}
          onClose={() => setVisible(false)}
          newAspectRatio={newAspectRatio}
          thumb={thumb}
        />
      );
    }
    return (
      <ImageView
        images={[
          {
            uri: imageIndexUrl,
          },
        ]}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      />
    );
  };

  return (
    <>
      {!!data?.videoUrl && renderVideo()}
      {!!imageIndexUrl && renderImage()}
      {renderZoomModal()}
    </>
  );
};

export default React.memo(ImageVideoLoader);
