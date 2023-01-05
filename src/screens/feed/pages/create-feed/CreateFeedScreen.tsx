/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useRef, useEffect} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  StyleProp,
  ViewStyle,
} from 'react-native';
import CreateFeedScreenStyle, {
  feedDescriptionInputStyle,
} from './CreateFeedScreenStyle';
import SimpleButton from 'components/button/SimpleButton';
import {colorPalates} from 'theme';
import {feedType, feedTypesList} from './models/FeedTypesList';
import {PhotoModel} from 'components/camera-modal/models/photoModel';
import {debugLogs} from 'utils/logs/logs';
import CameraButton from './components/camera-button/CameraButton';
import VideoButton from './components/video-button/VideoButton';
import SendButton from './components/send-button/SendButton';
import RemoveFeedMediaButton from './components/remove-media-button/RemoveFeedMediaButton';
import FeedImage from './components/feed-image/FeedImage';
import FeedVideo from './components/feed-video/FeedVideo';
import {useUserState} from 'redux-wrapper/reducers';
import {
  Emmiter,
  getMediaUrl,
  getUploadMediaUrl,
  showToast,
} from 'utils/helper/helper';
import {useCreateFeedService} from 'services/feed-service/useCreateFeedService';
import {createFeedDataModel} from 'models/create-feed/createFeedDataModel';
import {useNavigationServices} from 'navigation/useNavigationServices';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import PickerModal from 'components/picker-modal/PickerModal';
import appConstants from '../../../../models/appConstants';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ShowNotification} from '../../../../models/Notifications';
import {
  getFileSize,
  ManualModerationTool,
  onMentions,
  SpaceWordModeration,
} from '../../../../utils/helper/helper';
import IosBottomButtonAvoid from '../../../../components/ios-bottom-helper/IosBottomButtonAvoid';
import AnnounceMentModal from '../../../../components/annoucement-modal/AnnounceMentModal';
import screenNameEnum from '../../../../models/screenNameEnum';
import {SvgXml} from 'react-native-svg';
import svg from '../../../../theme/images/svg';
import Permission from '../../../../models/Permission';
import {openSettings} from 'react-native-permissions';
import ModalsMessages from '../../../../models/ModalsMessages';
import {useDispatch} from 'react-redux';

export interface videoDimeProps {
  height: number;
  width: number;
  isLandScape: boolean;
}

const CreateFeedScreen = () => {
  const [isVideoModal, setIsVideoModal] = useState(false);
  const [isTextInputActive, setIsTextInputActive] = useState(false);
  const [feedDescription, setFeedDescription] = useState('');
  const [permissionModal, setPermissionModel] = useState(false);
  const [currentFeedType, setCurrentFeedType] = useState<feedType>(
    feedTypesList[0],
  );

  const {userData} = useUserState();
  const [feedPhoto, setFeedPhoto] = useState<PhotoModel | null>(null);
  const [feedVideo, setFeedVideo] = useState<PhotoModel | null>(null);

  const [errorPopupMessage, setErrorPopup] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [videoSize, setVideoHeight] = useState<videoDimeProps | null>(null);
  const [imageSize, setImageSize] = useState<videoDimeProps | null>(null);

  const {createSimpleFeed, createFeedWithLocalMedia} = useCreateFeedService();
  const {resetFeedStack} = useNavigationServices();
  const [isPickerModal, setIsPickerModal] = useState(false);
  const navigation = useNavigation();
  const [popupMessage, setPopupMessage] = useState(
    'Please Select Image or Video',
  );
  const inputRef = useRef();
  const [isPopUp, setIsPopUp] = useState(false);
  const [videoLoadModal, setIsVideoLoadModal] = useState(false);
  const [videoLengthAlert, setVideoLengthAlert] = useState(false);
  const [isGreenTalk, setIsGreenTalk] = useState(false);

  const isVideoPortrait = () => {
    let isPortrait = false;
    if (feedVideo && feedVideo.height && feedVideo.width) {
      isPortrait = feedVideo.height / feedVideo.width > 0;
    }
    return isPortrait;
  };

  useEffect(() => {
    Emmiter.addListener('isGreenTalk', resp => {
      setCurrentFeedType(feedTypesList[resp ? 1 : 0]);
      setIsGreenTalk(resp);
    });
  }, []);

  const onFocusInput = () => {
    setIsTextInputActive(true);
  };

  const onBlurInput = () => {
    setIsTextInputActive(feedDescription.length > 0);
  };

  const updateFeedDescription = (feedText: string) => {
    setFeedDescription(feedText);
  };

  const onPressSendButton = async () => {
    if (pressed) {
      return;
    }

    const feedTargetData = currentFeedType;

    if (
      feedTargetData.topicName === appConstants.APITheJoint &&
      !feedPhoto &&
      !feedVideo
    ) {
      setPopupMessage('Please Select Image or Video.');
      setErrorPopup(true);
      return;
    }
    if (feedTargetData.topicName === appConstants.APIMemes && !feedPhoto) {
      setPopupMessage('Please Select Image.');
      setErrorPopup(true);
      setPressed(false);
      return;
    }
    if (feedTargetData.topicName === appConstants.APIMoments && !feedVideo) {
      setPopupMessage('Please Select Video');
      setErrorPopup(true);
      return;
    }
    const file = feedPhoto || feedVideo;

    if (!!file) {
      const uri = await getUploadMediaUrl(file);

      const fileSize = await getFileSize(uri);
      if (Number(fileSize.toFixed()) > 1024 && !!feedPhoto) {
        showToast("You can't post image larger than 1024 MB");
        return;
      }
      if (Number(fileSize.toFixed()) > 1024 && !!feedVideo) {
        showToast("You can't post video larger than 1024 MB");
        return;
      }
    }

    if (feedTargetData.topicName === appConstants.APIGreenTalk) {
      if (!feedDescription.trim()) {
        setPopupMessage('Please Enter Text');
        setErrorPopup(true);
        setPressed(false);
        return;
      }
    }

    const isSafe = ManualModerationTool(feedDescription);
    const isAdvSafe = isSafe && SpaceWordModeration(feedDescription);
    if (!isAdvSafe) {
      setIsPopUp(true);
      return;
    }

    // const safeTextSpace = locationModeration(feedDescription);
    // const safeText = locationSpaceWordModeration(safeTextSpace);
    if (feedTargetData) {
      const simpleFeedData: createFeedDataModel = {
        feedText: feedDescription,
        feedTarget: feedTargetData.topicName,
      };

      Keyboard.dismiss();
      if (feedVideo) {
        setIsVideoLoadModal(true);
      } else {
        showToast('We are Processing Your Post');
        if (isGreenTalk) {
          navigation.navigate(screenNameEnum.GreenTalk);
        } else {
          navigation.goBack();
        }
      }

      if (feedPhoto && feedTargetData.topicName !== appConstants.APIGreenTalk) {
        setPressed(true);

        simpleFeedData.feedMedia = await getUploadMediaUrl(feedPhoto);
        simpleFeedData.imageSize = imageSize;
        if (Platform.OS === 'android') {
          simpleFeedData.feedExtention = feedPhoto.type.split('/')[1];
          if (simpleFeedData.feedExtention !== undefined) {
            simpleFeedData.feedExtention = feedPhoto.type.split('/')[1];
          } else {
            const extension = feedPhoto.filename.split('.');
            simpleFeedData.feedExtention = extension[extension.length - 1];
          }
        } else {
          const extension = feedPhoto.filename.split('.');

          simpleFeedData.feedExtention = extension[extension.length - 1];
        }

        (simpleFeedData.size = feedPhoto?.fileSize),
          (simpleFeedData.mediaTypeOfFeed = feedPhoto?.type);
        setFeedPhoto(null);
        setFeedDescription('');

        createFeedWithLocalMedia(simpleFeedData)
          .then(() => {
            onMentions(feedDescription, userData?.displayName, 'POST', 'p');
            setTimeout(() => {
              Emmiter.emit(feedTargetData.name);
            }, 4000);
          })
          .catch((error: string | number | boolean | object | undefined) => {
            debugLogs('Failed to post activity, error: ', error);
          })
          .finally(() => {
            setPressed(false);
          });
      } else if (feedVideo) {
        simpleFeedData.feedMedia = await getUploadMediaUrl(feedVideo);
        simpleFeedData.videoSize = videoSize;
        simpleFeedData.mediaTypeOfFeed = feedVideo.type;
        simpleFeedData.height = feedVideo.height;
        simpleFeedData.width = feedVideo.width;
        simpleFeedData.type = feedVideo.type;
        simpleFeedData.timeStamp = feedVideo.timestamp;
        simpleFeedData.size = feedVideo?.fileSize;

        setFeedVideo(null);
        setFeedDescription('');

        createFeedWithLocalMedia(simpleFeedData)
          .then(() => {
            setTimeout(() => {
              Emmiter.emit(feedTargetData.name);

              ShowNotification();
              onMentions(feedDescription, userData?.displayName, 'POST', 'p');
            }, 10000);
          })
          .catch((error: string | number | boolean | object | undefined) => {
            debugLogs('Failed to post activity, error: ', error);
            showToast('oops! Something went wrong, Try again later');
          });
      } else if (feedTargetData.topicName === appConstants.APIGreenTalk) {
        if (!feedPhoto) {
          setFeedDescription('');
          createSimpleFeed(simpleFeedData)
            .then(() => {
              setTimeout(() => {
                Emmiter.emit(feedTargetData.name);
                // navigation.navigate(screenNameEnum.GreenTalk);
                onMentions(feedDescription, userData?.displayName, 'POST', 'p');
              }, 7000);
            })
            .catch((error: string | number | boolean | object | undefined) => {
              debugLogs('Failed to post activity, error: ', error);
            });
        } else {
          setPressed(true);

          simpleFeedData.feedMedia = await getUploadMediaUrl(feedPhoto);
          if (Platform.OS === 'android') {
            simpleFeedData.feedExtention = feedPhoto.type.split('/')[1];
            if (simpleFeedData.feedExtention !== undefined) {
              simpleFeedData.feedExtention = feedPhoto.type.split('/')[1];
            } else {
              const extension = feedPhoto.filename.split('.');
              simpleFeedData.feedExtention = extension[extension.length - 1];
            }
          } else {
            const extension = feedPhoto.filename.split('.');

            simpleFeedData.feedExtention = extension[extension.length - 1];
          }
          // simpleFeedData.feedMedia = feedPhoto.uri;
          (simpleFeedData.size = feedPhoto?.fileSize),
            (simpleFeedData.mediaTypeOfFeed = feedPhoto?.type);

          createFeedWithLocalMedia(simpleFeedData)
            .then(() => {
              setTimeout(() => {
                Emmiter.emit(feedTargetData.name);
                // navigation.navigate(screenNameEnum.GreenTalk);
                onMentions(feedDescription, userData?.displayName, 'POST', 'p');
              }, 7000);
            })
            .catch((error: string | number | boolean | object | undefined) => {
              debugLogs('Failed to post activity, error: ', error);
            })
            .finally(() => {
              setPressed(false);
            });
        }
      }
    }
  };

  const onPressCameraButton = async () => {
    setIsVideoModal(false);
    setFeedPhoto(null);
    const mic = await Permission.getMicPermission();
    const camera = await Permission.getCameraPermission();
    const storage = await Permission.getStoragePermission();
    if (mic && camera && storage) {
      setIsPickerModal(true);
    } else {
      setPermissionModel(true);
    }
  };

  const onPressVideoButton = async () => {
    setIsVideoModal(true);
    setFeedVideo(null);
    const mic = await Permission.getMicPermission();
    const camera = await Permission.getCameraPermission();
    const storage = await Permission.getStoragePermission();
    if (mic && camera && storage) {
      setIsPickerModal(true);
    } else {
      setPermissionModel(true);
    }
  };

  const onPressRemoveFeedButton = () => {
    setFeedVideo(null);

    setFeedPhoto(null);
  };

  const onPressCamera = () => {
    launchCamera({
      mediaType: isVideoModal ? 'video' : 'photo',
      durationLimit: 15,
      quality: 0.8,
      videoQuality: 'medium',
    })
      .then((cameraResponse: any) => {
        if (cameraResponse?.didCancel || cameraResponse?.assets?.length === 0) {
          return;
        }
        const resp = {
          uri: cameraResponse.assets[0].uri,
          fileSize: cameraResponse.assets[0].fileSize,
          filename: cameraResponse.assets[0].fileName,
          height: cameraResponse.assets[0].height,
          width: cameraResponse.assets[0].width,
          timestamp: cameraResponse.assets[0].timestamp,
          type: cameraResponse.assets[0].type,
        };
        isVideoModal ? setFeedVideo(resp) : setFeedPhoto(resp);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const onPressGallery = () => {
    launchImageLibrary({
      mediaType: isVideoModal ? 'video' : 'photo',
      quality: 1,
      selectionLimit: 1,
      includeExtra: true,
    })
      .then(async (cameraResponse: any) => {
        if (cameraResponse?.didCancel || cameraResponse?.assets?.length === 0) {
          return;
        }
        if (cameraResponse?.assets[0]?.duration > 15) {
          setVideoLengthAlert(true);
          return;
        }

        const resp = {
          uri: cameraResponse?.assets[0]?.uri,
          fileSize: cameraResponse?.assets[0]?.fileSize,
          filename: cameraResponse?.assets[0]?.fileName,
          height: cameraResponse?.assets[0]?.height,
          width: cameraResponse?.assets[0]?.width,
          timestamp: cameraResponse?.assets[0]?.timestamp,
          type: cameraResponse?.assets[0]?.type,
          duration: cameraResponse?.assets[0]?.duration,
        };
        isVideoModal
          ? cameraResponse?.assets[0]?.duration < 15
            ? setFeedVideo(resp)
            : setFeedVideo(null)
          : setFeedPhoto(resp);
      })
      .catch(e => {
        console.log(e);
      });
    // if (!isVideoModal) {
    //   ImagePicker.openPicker({
    //     mediaType: 'video',
    //     compressVideoPreset: 'HighestQuality',
    //   }).then((cameraResponse: any) => {

    //     if (cameraResponse?.duration > 250000) {
    //       setVideoLengthAlert(true);
    //       return;
    //     }
    //     const resp = {
    //       uri: cameraResponse?.path,
    //       fileSize: cameraResponse?.size,
    //       filename: new Date().getTime() + '.mp4',
    //       height: cameraResponse?.height,
    //       width: cameraResponse?.width,
    //       timestamp: cameraResponse?.modificationDate,
    //       type: cameraResponse?.mime,
    //       duration: cameraResponse?.duration,
    //     };
    //     setFeedVideo(resp);
    //   });
    // } else {

    // }
  };

  const CreateFeedHeader = () => {
    return (
      <View style={CreateFeedScreenStyle.createFeedHeader}>
        <SimpleButton
          containerStyle={CreateFeedScreenStyle.cancelButtonContainer}
          buttonTitleStyle={CreateFeedScreenStyle.cancelButtonTitle}
          title="Cancel"
          onPress={() => {
            if (isGreenTalk) {
              navigation.navigate(screenNameEnum.GreenTalk);
            } else {
              navigation.goBack();
            }
          }}
        />
        <Text style={CreateFeedScreenStyle.createFeedHeaderTitle}>
          {'New Post'}
        </Text>
      </View>
    );
  };

  const renderInputText = () => {
    return (
      <View style={CreateFeedScreenStyle.menuContainer}>
        <View style={CreateFeedScreenStyle.feedMediaContainer}>
          {!isGreenTalk && (
            <>
              {currentFeedType.topicName !== appConstants.APIMoments && (
                <CameraButton onPressCameraButton={onPressCameraButton} />
              )}
              {currentFeedType.topicName !== appConstants.APIMemes && (
                <VideoButton onPressVideoButton={onPressVideoButton} />
              )}
            </>
          )}

          {isGreenTalk && (
            <IconMaterialCommunity
              name="pencil-box"
              style={CreateFeedScreenStyle.pencilIcon}
              onPress={() => {
                inputRef.current?.focus();
              }}
            />
          )}
          <TextInput
            style={feedDescriptionInputStyle(isTextInputActive)}
            value={feedDescription}
            placeholder={'Add Comment...'}
            placeholderTextColor={colorPalates.grayShade80}
            onChangeText={updateFeedDescription}
            onFocus={onFocusInput}
            onBlur={onBlurInput}
            maxLength={300}
            multiline
            ref={inputRef}
          />
        </View>
        {(feedDescription.trim().length > 0 || feedPhoto || feedVideo) && (
          <SendButton
            onPressSendButton={() => {
              onPressSendButton();
            }}
            isDisable={pressed}
          />
        )}
      </View>
    );
  };

  let containerStyle: StyleProp<ViewStyle> = {};
  let aspectRatio: any = null;
  if (feedPhoto) {
    aspectRatio = Number(feedPhoto.width) / Number(feedPhoto.height);
  }

  if (aspectRatio !== null && aspectRatio > 1) {
    containerStyle = {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
    };
  }

  return (
    <SafeAreaView style={CreateFeedScreenStyle.container}>
      <CreateFeedHeader />
      <View style={CreateFeedScreenStyle.mainContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView style={{flex: 1}}>
            <View style={CreateFeedScreenStyle.mainContainersecond}>
              {!(feedPhoto || feedVideo) && (
                <ScrollView
                  contentContainerStyle={CreateFeedScreenStyle.scrollContainer}
                  scrollEnabled={false}
                  showsVerticalScrollIndicator={false}
                >
                  <View style={CreateFeedScreenStyle.textView}>
                    {isGreenTalk ? (
                      <SvgXml
                        xml={svg.createFeedGreenTalk}
                        width={100}
                        height={100}
                      />
                    ) : (
                      <SvgXml
                        xml={svg.createFeedTheJoint}
                        width={100}
                        height={100}
                      />
                    )}

                    <Text style={CreateFeedScreenStyle.midleText}>
                      {isGreenTalk ? 'Post to GreenTalk' : 'Post to TheJoint'}
                    </Text>
                  </View>
                </ScrollView>
              )}
              <View
                style={[
                  CreateFeedScreenStyle.fileContainer,
                  {
                    backgroundColor:
                      feedPhoto || feedVideo
                        ? colorPalates.blackShade02
                        : colorPalates.white,
                  },
                  containerStyle,
                ]}
              >
                <>
                  {isVideoModal
                    ? feedVideo &&
                      currentFeedType.topicName !== appConstants.memes && (
                        <FeedVideo
                          videoURI={getMediaUrl(feedVideo)}
                          isPortrait={isVideoPortrait()}
                          onVideoLoad={setVideoHeight}
                          info={feedVideo}
                        />
                      )
                    : feedPhoto &&
                      currentFeedType.topicName !== appConstants.moments && (
                        <FeedImage
                          info={feedPhoto}
                          imgURI={getMediaUrl(feedPhoto)}
                          onImageLoad={setImageSize}
                        />
                      )}
                </>

                {(feedPhoto || feedVideo) && (
                  <RemoveFeedMediaButton
                    onPressRemoveFeedMediaButton={onPressRemoveFeedButton}
                  />
                )}
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
        {renderInputText()}
      </View>

      <AnnounceMentModal
        modalVisible={errorPopupMessage}
        messageText={popupMessage}
        onPressButton={() => {
          setErrorPopup(false);
        }}
        buttonText={'Ok'}
      />

      <AnnounceMentModal
        modalVisible={isPopUp}
        buttonText={'ok'}
        messageText={ModalsMessages.ModalsMassages.offensiveWord}
        onPressButton={() => setIsPopUp(false)}
      />
      <AnnounceMentModal
        modalVisible={videoLengthAlert}
        buttonText={'Ok'}
        messageText={ModalsMessages.ModalsMassages.videoMustBe}
        onPressButton={() => setVideoLengthAlert(false)}
      />

      <AnnounceMentModal
        modalVisible={videoLoadModal}
        messageText={ModalsMessages.ModalsMassages.youVideoIs}
        onPressButton={() => {
          setIsVideoLoadModal(false);
          resetFeedStack();
        }}
        buttonText={'Ok'}
      />

      <PickerModal
        isVideo={isVideoModal}
        isVisible={isPickerModal}
        onClose={() => setIsPickerModal(false)}
        onPressCamera={() => {
          setIsPickerModal(false);
          // onPressCamera();
          setTimeout(() => {
            onPressCamera();
          }, 1000);
        }}
        onPressGallery={() => {
          setIsPickerModal(false);
          // onPressGallery();
          setTimeout(() => {
            onPressGallery();
          }, 1000);
        }}
      />
      <AnnounceMentModal
        modalVisible={permissionModal}
        buttonText="Setting"
        secondButton
        secondButtonText="Cancel"
        onPressSecondButton={() => {
          setPermissionModel(false);
        }}
        messageText={ModalsMessages.ModalsMassages.thisFeatureRequired}
        onPressButton={() => {
          openSettings().then(() => {
            setPermissionModel(false);
          });
        }}
      />

      <IosBottomButtonAvoid />
    </SafeAreaView>
  );
};

export default CreateFeedScreen;
