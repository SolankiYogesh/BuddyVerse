import {
  Text,
  SafeAreaView,
  FlatList,
  View,
  ScrollView,
  AppState,
  TextInput,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ChatHeader from 'screens/chat/components/chat-header/ChatHeader';
import {styles} from './AllChatsScreenStyle';
import BottomInputTextSend from 'screens/chat/components/bottom-input-send/BottomInputTextSend';
import RenderChatItem from 'screens/chat/components/render-chat-item/RenderChatItem';
import {openSettings} from 'react-native-permissions';
import {
  ChatMessageContent,
  Communities,
  ChatId,
  UserId,
  ChatMessagesQuery,
  ChatMessagesPagingQuery,
  MediaAttachment,
} from 'getsocial-react-native-sdk';
import LoadingContainer from 'components/loading-container/LoadingContainer';
import {showToast} from 'utils/helper/helper';
import IosBottomButtonAvoid from 'components/ios-bottom-helper/IosBottomButtonAvoid';
import {useTheme} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native-paper';
import useUserState from 'redux-wrapper/reducers/user-slice/userState';
import {getUploadMediaUrl, getFileSize} from 'utils/helper/helper';
import OverlayLoader from 'components/overlay-loader/OverlayLoader';
import PickerModal from 'components/picker-modal/PickerModal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  Emmiter,
  ManualModerationTool,
  SpaceWordModeration,
} from '../../../../utils/helper/helper';
import colorPalates from '../../../../theme/colors/colorPalates';
import AnnounceMentModal from '../../../../components/annoucement-modal/AnnounceMentModal';
import {Storage} from 'aws-amplify';
import Permission from '../../../../models/Permission';
import _ from 'lodash';
import {SvgXml} from 'react-native-svg';
import svg from '../../../../theme/images/svg';
import {ms} from 'react-native-size-matters';
import ModalsMessages from '../../../../models/ModalsMessages';
import {Image} from 'react-native-compressor';
const AllChatsScreen = (props: any) => {
  const [massages, setMessages] = useState([]);
  const listRef = useRef(null);
  const [item, setItem] = useState(props?.route?.params?.item || null);
  const [isLoading, setIsLoading] = useState(false);
  const chatID = props?.route?.params?.id;
  const {userData} = useUserState();
  const [next, setNext] = useState('');
  const [paggingLoader, setpaggingLoader] = useState(false);
  const [isGalleryVisible, setGalleryVisible] = useState(false);
  const [isVideoModel, setVideoModel] = useState(false);
  const [selectedVideoUri, setSelectedVideoUri] = useState('');
  const inputRef = useRef<TextInput>(null);
  const [loadingModal, setLoadingModal] = useState(false);
  const [isPopUp, setIsPopUp] = useState(false);
  const {colors} = useTheme();
  const AllChatsScreenStyle = styles(colors);
  const [permissionModal, setPermissionModel] = useState(false);
  const [videoSize, setVideoSize] = useState({
    height: 0,
    width: 0,
  });
  const [error, setError] = useState(false);
  const [chatImage, setChatImage] = useState<any>(undefined);
  const [flatlistLoader, setFlatlIstLoad] = useState(false);

  useEffect(() => {
    intialSetup();

    const listener = AppState.addEventListener('change', state => {
      if (state === 'active') {
        restrieveMessages(false);
      }
    });
    const emit = Emmiter.addListener('notification', () => {
      restrieveMessages(false);
      if (listRef) {
        scrollToBottom();
      }
    });
    return () => {
      emit.remove();
      listener.remove();
    };
  }, []);

  useEffect(() => {
    if (item) {
      restrieveMessages();
    }
  }, [item]);

  const intialSetup = () => {
    if (chatID) {
      getUser();
    }
  };

  const getUser = () => {
    const chatId = ChatId.create(chatID);

    try {
      setIsLoading(true);
      Communities.getChat(chatId)
        .then(r => {
          setIsLoading(false);
          setItem(r);
        })
        .catch(() => {
          setIsLoading(false);
        });
    } catch (e) {
      setIsLoading(false);
      setError(true);
    }
  };

  const uploadVideo = async () => {
    return new Promise(async resolve => {
      if (selectedVideoUri) {
        setLoadingModal(true);
        const uri = await getUploadMediaUrl(selectedVideoUri);
        const media = await fetch(uri);
        const videoExtension = 'mp4';
        const blob = await media.blob();
        const file_name = `Group-${userData?.id}-${new Date().getTime()}`;

        try {
          Storage.put(`${file_name}.${videoExtension}`, blob, {
            level: 'public',
            contentType: `video/${videoExtension}`,
            useAccelerateEndpoint: true,
          })
            .then(() => {
              setLoadingModal(false);
              const videoUrl = `https://d3ffo1rad4rm2t.cloudfront.net/${file_name}${videoSize.width}x${videoSize.height}.m3u8?width=${videoSize.width}&height=${videoSize.height}&mediafilename=${file_name}.${videoExtension}`;

              const videoFiles = MediaAttachment.withVideoUrl(videoUrl);

              setLoadingModal(false);
              setSelectedVideoUri('');
              setVideoSize({height: 0, width: 0});

              resolve(videoFiles);
            })
            .catch(() => {
              setLoadingModal(false);
            });
        } catch (e) {
          console.log(e);

          setLoadingModal(false);
          setError(true);
          resolve(null);
        }
      }
    });
  };

  const uploadImage = async () => {
    return new Promise(async resolve => {
      if (chatImage) {
        try {
          setLoadingModal(true);
          const uri = await getUploadMediaUrl(chatImage);
          const imageUrl = await Image.compress(uri, {
            compressionMethod: 'manual',
            quality: 0.8,
            output: 'jpg',
          });
          const media = await fetch(imageUrl);
          const blob = await media.blob();

          const file_name = `chat-${userData?.id}_${new Date().getTime()}.jpg`;
          Storage.put(file_name, blob, {
            level: 'public',
            contentType: `image/jpg`,
            useAccelerateEndpoint: true,
          })
            .then(() => {
              setLoadingModal(false);
              const imageFiles = MediaAttachment.withImageUrl(
                `https://d1wd77iqpfpytn.cloudfront.net/public/${file_name}`,
              );

              setChatImage(undefined);
              resolve(imageFiles);
            })
            .catch(() => {
              setLoadingModal(false);

              resolve('');
            });
        } catch (e) {
          console.log(e);

          setLoadingModal(false);
          setError(true);
          resolve('');
        }
      }
    });
  };

  const restrieveMessages = (isLoad = true) => {
    setFlatlIstLoad(isLoad);

    const chatId = chatID
      ? ChatId.create(chatID)
      : ChatId.createWithUserId(
          UserId.create(item?.otherMember?.userId || item?.userId || item?.id),
        );

    const query = ChatMessagesQuery.messagesInChat(chatId);

    try {
      Communities.getChatMessages(new ChatMessagesPagingQuery(query))
        .then((result: any[]) => {
          setNext(result?.previous);
          const chats = _.reverse(result?.entries);

          setMessages(JSON.parse(JSON.stringify(chats)));
          setFlatlIstLoad(false);
        })
        .catch(() => {
          setFlatlIstLoad(false);
        });
    } catch (e) {
      setError(true);
      setFlatlIstLoad(false);
    }
  };

  const onPressGalleryButtons = async () => {
    const mic = await Permission.getMicPermission();
    const camera = await Permission.getCameraPermission();
    const storage = await Permission.getStoragePermission();
    if (mic && camera && storage) {
      setGalleryVisible(true);
    } else {
      setPermissionModel(true);
    }
  };

  const onPressCamera = async () => {
    launchCamera({
      mediaType: isVideoModel ? 'video' : 'photo',
      durationLimit: 15,
      quality: 0.8,
      videoQuality: 'medium',
    })
      .then((cameraResponse: any) => {
        if (cameraResponse.didCancel) {
          return;
        }
        if (cameraResponse.errorCode) {
          return;
        }
        if (cameraResponse.errorMessage) {
          return;
        }

        const resp = {
          uri: cameraResponse?.assets[0].uri,
          fileSize: cameraResponse?.assets[0].fileSize,
          filename: cameraResponse.assets[0].fileName,
          height: cameraResponse.assets[0].height,
          width: cameraResponse.assets[0].width,
          timestamp: cameraResponse.assets[0].timestamp,
          type: cameraResponse.assets[0].type,
        };

        setMediaUrI(resp);

        // setIsVideoModal(false);
      })
      .catch(() => {
        // setIsVideoModal(false);
      });
  };

  const setMediaUrI = async resp => {
    inputRef.current?.focus();
    if (resp && !isVideoModel) {
      const size = await getFileSize(resp?.uri);
      if (Number(size.toFixed()) >= 1024) {
        showToast('File is Bigger than 1024 MB');
        return;
      }

      setChatImage(resp);
      setVideoSize({
        height: resp?.height,
        width: resp?.width,
      });
    } else if (resp) {
      const size = await getFileSize(resp?.uri);
      if (Number(size.toFixed()) >= 1024) {
        showToast('File is Bigger than 1024 MB');
        return;
      }
      setSelectedVideoUri(resp?.uri);
      setVideoSize({
        height: resp?.height,
        width: resp?.width,
      });
    }
  };

  const onPressGallery = () => {
    launchImageLibrary({
      mediaType: isVideoModel ? 'video' : 'photo',
      quality: 1,
      videoQuality: 'high',
      selectionLimit: 1,
      includeExtra: true,
      presentationStyle: 'fullScreen',
    }).then(async (cameraResponse: any) => {
      if (cameraResponse.didCancel) {
        return;
      }
      if (cameraResponse.errorCode) {
        return;
      }
      if (cameraResponse.errorMessage) {
        return;
      }

      const resp = {
        uri: cameraResponse?.assets[0].uri,
        fileSize: cameraResponse?.assets[0].fileSize,
        filename: cameraResponse.assets[0].fileName,
        height: cameraResponse.assets[0].height,
        width: cameraResponse.assets[0].width,
        timestamp: cameraResponse.assets[0].timestamp,
        type: cameraResponse.assets[0].type,
      };
      setMediaUrI(resp);
    });
  };

  const onPressSendMessage = async (text: string) => {
    let uploadedVideo = null;
    let uploadedImage = null;

    if (text !== '') {
      const isSafe = ManualModerationTool(text);
      const isAdv = isSafe && SpaceWordModeration(text);
      if (!isAdv) {
        setIsPopUp(!isSafe);
        return;
      }
    }

    const content = new ChatMessageContent();

    // const safeTextSpace = locationModeration(text);
    // const safeText = locationSpaceWordModeration(safeTextSpace);
    content.text = text;
    if (selectedVideoUri) {
      uploadedVideo = await uploadVideo();
    }
    if (chatImage?.uri) {
      uploadedImage = await uploadImage();
    }
    content.properties.height = videoSize?.height?.toString();
    content.properties.width = videoSize?.width?.toString();

    setChatImage(undefined);
    setSelectedVideoUri('');
    setVideoSize({height: 0, width: 0});

    if (uploadedVideo) {
      content.attachments = [uploadedVideo];
    }
    if (uploadedImage) {
      content.attachments = [uploadedImage];
    }
    const target = ChatId.createWithUserId(
      UserId.create(item?.otherMember?.userId || item?.userId || item?.id),
    );

    try {
      Communities.sendChatMessage(content, target).then(() => {
        restrieveMessages(false);
      });
    } catch (e) {
      setError(true);
    }

    if (listRef) {
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    if (massages.length > 0) {
      listRef?.current?.scrollToIndex({
        animated: false,
        index: 0,
      });
    }
  };

  const onEndReached = () => {
    if (next) {
      const chatId = ChatId.createWithUserId(
        UserId.create(item?.otherMember?.userId || item?.userId || item?.id),
      );

      const query = ChatMessagesQuery.messagesInChat(chatId);
      let chatMessagesQuery = new ChatMessagesPagingQuery(query);
      chatMessagesQuery.previous = next;

      setpaggingLoader(true);
      try {
        Communities.getChatMessages(chatMessagesQuery).then(
          (result: any[]) => {
            setpaggingLoader(false);

            setNext(result?.previous);
            setMessages([...massages, ...result.entries]),
              setFlatlIstLoad(false);
          },
          () => {
            setFlatlIstLoad(false);
            setpaggingLoader(false);
          },
        );
      } catch (e) {
        setpaggingLoader(false);
        setError(true);
      }
    }
  };

  const renderItem = i => {
    return <RenderChatItem item={i?.item} userID={userData?.id} />;
  };

  const renderLoaderComponents = () => {
    if (paggingLoader) {
      return (
        <ActivityIndicator size={'small'} color={colorPalates.blueShade00} />
      );
    }
    return null;
  };

  return (
    <>
      <SafeAreaView style={AllChatsScreenStyle.container}>
        <ChatHeader {...props} item={item} />
        <AnnounceMentModal
          modalVisible={isPopUp}
          buttonText={'ok'}
          messageText={ModalsMessages.ModalsMassages.offensiveWord}
          onPressButton={() => setIsPopUp(false)}
        />
        <View style={AllChatsScreenStyle.viewContainer}>
          {flatlistLoader ? (
            <LoadingContainer />
          ) : massages?.length !== 0 ? (
            <FlatList
              data={massages}
              extraData={massages}
              renderItem={renderItem}
              keyExtractor={(_, index) => `$messages${index}`}
              inverted
              ref={listRef}
              style={AllChatsScreenStyle.messageListStyle}
              showsVerticalScrollIndicator={false}
              onEndReached={onEndReached}
              ListFooterComponent={renderLoaderComponents}
              maxToRenderPerBatch={15}
              windowSize={15}
              initialNumToRender={25}
            />
          ) : (
            <View style={{flex: 1}}>
              <ScrollView
                contentContainerStyle={AllChatsScreenStyle.backImageVIew}
              >
                <SvgXml
                  xml={svg.chatMenuIconGreen}
                  height={ms(100)}
                  width={ms(100)}
                />
                <Text style={AllChatsScreenStyle.boldText}>
                  Say Something......
                </Text>
                {/* <Text style={AllChatsScreenStyle.lightGrayText}>
            
            </Text> */}
              </ScrollView>
            </View>
          )}
          <BottomInputTextSend
            onPressSendMessage={onPressSendMessage}
            onPressCamera={() => {
              setVideoModel(false);
              onPressGalleryButtons();
            }}
            isAttachmentUri={chatImage?.uri || selectedVideoUri || ''}
            onPressCancelAttachment={() => {
              setSelectedVideoUri('');
              setChatImage(undefined);
              setVideoSize({height: 0, width: 0});
            }}
            isVideo={isVideoModel}
            onPressVideo={() => {
              setVideoModel(true);
              onPressGalleryButtons();
            }}
            ref={inputRef}
          />
        </View>

        {isGalleryVisible && (
          <PickerModal
            isVideo={isVideoModel}
            isVisible={isGalleryVisible}
            onClose={() => setGalleryVisible(false)}
            onPressCamera={() => {
              setGalleryVisible(false);
              // onPressCamera();
              setTimeout(() => {
                onPressCamera();
              }, 1000);
            }}
            onPressGallery={() => {
              setGalleryVisible(false);
              // onPressGallery();
              setTimeout(() => {
                onPressGallery();
              }, 1000);
            }}
          />
        )}
        {loadingModal && <OverlayLoader />}
        <IosBottomButtonAvoid />
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
        <AnnounceMentModal
          modalVisible={error}
          title={'Oops'}
          buttonText={'Ok'}
          messageText={ModalsMessages.ModalsMassages.somethingWentWrong}
          onPressButton={() => setError(false)}
        />
        {isLoading && <OverlayLoader />}
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: colorPalates.white}} />
    </>
  );
};

export default AllChatsScreen;
