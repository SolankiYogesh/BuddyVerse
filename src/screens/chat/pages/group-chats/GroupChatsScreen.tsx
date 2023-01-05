import {
  View,
  Text,
  ScrollView,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  AppState,
  TextInput,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {styles} from './GroupChatsScreenStyle';
import LoadingContainer from 'components/loading-container/LoadingContainer';
import ChatHeader from 'screens/chat/components/chat-header/ChatHeader';
import {
  Communities,
  PostActivityTarget,
  ActivitiesQuery,
  PagingQuery,
  ActivityContent,
  MembersQuery,
  NotificationContent,
  SendNotificationTarget,
  UserIdList,
  Notifications,
  MediaAttachment,
  RemoveActivitiesQuery,
  Action,
} from 'getsocial-react-native-sdk';
import {Emmiter, showToast} from 'utils/helper/helper';
import RenderChatItem from 'screens/chat/components/render-chat-item/RenderChatItem';
import BottomInputTextSend from 'screens/chat/components/bottom-input-send/BottomInputTextSend';
import _ from 'lodash';
import IosBottomButtonAvoid from 'components/ios-bottom-helper/IosBottomButtonAvoid';
import useUserState from 'redux-wrapper/reducers/user-slice/userState';
import {getUploadMediaUrl, getFileSize} from 'utils/helper/helper';
import OverlayLoader from 'components/overlay-loader/OverlayLoader';
import DeleteMassageModel from 'screens/chat/components/delete-msg-modal/DeleteMassageModel';
import screenNameEnum from 'models/screenNameEnum';
import PickerModal from 'components/picker-modal/PickerModal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  ManualModerationTool,
  onMentions,
  SpaceWordModeration,
} from '../../../../utils/helper/helper';
import {useNavigation, useTheme} from '@react-navigation/native';
import colorPalates from '../../../../theme/colors/colorPalates';
import AnnounceMentModal from '../../../../components/annoucement-modal/AnnounceMentModal';
import {Storage} from 'aws-amplify';
import {Provider} from 'react-native-paper';
import {openSettings} from 'react-native-permissions';
import Permission from '../../../../models/Permission';
import {SvgXml} from 'react-native-svg';
import svg from '../../../../theme/images/svg';
import {ms} from 'react-native-size-matters';
import ModalsMessages from '../../../../models/ModalsMessages';
import {Image} from 'react-native-compressor';
const GroupChatsScreen = props => {
  const [massages, setMessages] = useState([]);
  const listRef = useRef(null);
  const [item, setItem] = useState(props?.route?.params?.item || null);
  const GroupID = props?.route?.params?.id;
  const [members, setMembers] = useState([]);
  const [next, setNext] = useState('');
  const [paggingLoader, setpaggingLoader] = useState(false);
  const [flatlistLoader, setFlatlIstLoad] = useState(false);
  const [isGalleryVisible, setGalleryVisible] = useState(false);
  const [isVideoModel, setVideoModel] = useState(false);
  const [selectedVideoUri, setSelectedVideoUri] = useState('');
  const {userData} = useUserState();
  const inputRef = useRef<TextInput>(null);
  const [loadingModal, setLoadingModal] = useState(false);
  const [isDeleteModelVisisble, setDeleteModelVisible] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [isPopUp, setIsPopUp] = useState(false);
  const navigation = useNavigation();
  const {colors} = useTheme();
  const GroupChatsScreenStyle = styles(colors);
  const [videoSize, setVideoSize] = useState({
    height: 0,
    width: 0,
  });
  const [error, setError] = useState(false);
  const [isGroupDeleted, setIsGroupDeleted] = useState(false);
  const [chatImage, setChatImage] = useState<any>(undefined);
  const [permissionModal, setPermissionModel] = useState(false);

  useEffect(() => {
    restrieveMessages(true);
    getGroupMembers();
  }, [item]);

  useEffect(() => {
    if (GroupID) {
      getGroup();
    }
  }, []);

  useEffect(() => {
    restrieveMessages(true);
    getGroupMembers();
  }, []);

  useEffect(() => {
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
    } else if (resp) {
      const uri = await getUploadMediaUrl(resp);

      const size = await getFileSize(resp?.uri);
      if (Number(size.toFixed()) >= 1024) {
        showToast('File is Bigger than 1024 MB');
        return;
      }
      setSelectedVideoUri(uri);
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
    }).then(async cameraResponse => {
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

  const getGroup = () => {
    const groupId = GroupID;

    Communities.getGroup(groupId)
      .then(result => {
        setFlatlIstLoad(false);

        setItem(result);
      })
      .catch(e => {
        if (_.includes(e?.message, 'group not found')) {
          setIsGroupDeleted(true);
        }
        setFlatlIstLoad(false);
      });
  };

  const getGroupMembers = () => {
    const groupId = item?.id || GroupID;
    const query = MembersQuery.ofGroup(groupId);
    const pagingQuery = new PagingQuery(query);
    setFlatlIstLoad(true);
    Communities.getGroupMembers(pagingQuery)
      .then(
        result => {
          setFlatlIstLoad(false);
          const orderByID = _.filter(
            result.entries,
            i => i?.userId !== userData?.id,
          );
          setMembers(orderByID);
        },
        () => {
          setFlatlIstLoad(false);
        },
      )
      .catch(e => {
        console.log(e);

        setFlatlIstLoad(false);
      });
  };

  const restrieveMessages = (isLoad = false) => {
    const query = ActivitiesQuery.inGroup(item?.id || GroupID);
    const pagingQuery = new PagingQuery(query);
    setFlatlIstLoad(isLoad);
    Communities.getActivities(pagingQuery)
      .then(r => {
        setNext(r?.next);
        setFlatlIstLoad(false);
        setMessages(JSON.parse(JSON.stringify(r?.entries)));
      })
      .catch(() => {
        setFlatlIstLoad(false);
      });
  };

  const uploadVideo = async () => {
    return new Promise(async resolve => {
      if (selectedVideoUri) {
        setLoadingModal(true);
        const media = await fetch(selectedVideoUri);
        const videoExtension = 'mp4';
        const blob = await media.blob();
        const file_name = `Group-${userData?.id}-${new Date().getTime()}`;

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
      }
    });
  };

  const uploadImage = async () => {
    return new Promise(async resolve => {
      if (chatImage) {
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
            setChatImage(undefined);
            resolve('');
          });
      }
    });
  };

  const onPressHeader = () => {
    navigation?.navigate(screenNameEnum.EditGroupScreen, {
      item,
    });
  };

  const onPressDeleteMessage = () => {
    const query = RemoveActivitiesQuery.activityIds([deleteMessage?.id]);

    Communities.removeActivities(query)

      .then(async () => {
        setDeleteModelVisible(false);
        restrieveMessages(false);
      })
      .catch(() => {
        setDeleteModelVisible(false);
        showToast("You Can't Delete this Message");
      });
    setDeleteMessage(null);
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

    onMentions(text, userData, item?.title, 'g', item.id);

    const activityContent = new ActivityContent();
    // const safeTextSpace = locationModeration(text);
    // const safeText = locationSpaceWordModeration(safeTextSpace);
    activityContent.text = text;
    if (selectedVideoUri) {
      uploadedVideo = await uploadVideo();
    }
    if (chatImage) {
      uploadedImage = await uploadImage();
    }

    setChatImage(undefined);
    setSelectedVideoUri('');
    setVideoSize({height: 0, width: 0});

    if (uploadedVideo) {
      activityContent.attachments = [uploadedVideo];
    }
    if (uploadedImage) {
      activityContent.attachments = [uploadedImage];
    }

    const target = PostActivityTarget.group(item?.id);

    Communities.postActivity(activityContent, target)
      .then(() => {
        sendNotification(text || 'media');
        restrieveMessages();
        setChatImage(undefined);

        setSelectedVideoUri('');
        setVideoSize({height: 0, width: 0});
      })
      .catch(() => {
        setChatImage(undefined);

        setSelectedVideoUri('');
        setVideoSize({height: 0, width: 0});
      });

    if (listRef) {
      scrollToBottom();
    }
  };

  const sendNotification = async () => {
    const receivers = _.map(members, i => {
      return i?.userId;
    });
    const filterReceivers = _.filter(receivers, i => i !== userData?.id);
    if (filterReceivers?.length !== 0) {
      const notificationContent = new NotificationContent();

      const action = Action.create('group_chat', {groupID: item?.id});
      notificationContent.templateName = 'group_chat';
      notificationContent.templatePlaceholders.GROUP_TITLE = item?.title;
      notificationContent.action = action;

      const target = SendNotificationTarget.usersWithIds(
        UserIdList.create(filterReceivers),
      );

      await Notifications.send(notificationContent, target);
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
      const query = ActivitiesQuery.inGroup(item?.id);
      let pagingQuery = new PagingQuery(query);
      pagingQuery.next = next;

      setpaggingLoader(true);
      Communities.getActivities(pagingQuery)
        .then(r => {
          setpaggingLoader(false);
          setMessages([...massages, ...r?.entries]);
        })
        .catch(() => {
          setpaggingLoader(false);
        });
    }
  };

  const renderItem = i => {
    return (
      <RenderChatItem
        item={i?.item}
        userID={userData?.id}
        onPressDeleteMessage={message => {
          setDeleteModelVisible(message?.author?.userId === userData?.id);
          setDeleteMessage(
            message?.author?.userId === userData?.id ? message : null,
          );
        }}
      />
    );
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
    <Provider>
      <SafeAreaView style={GroupChatsScreenStyle.container}>
        <ChatHeader
          {...props}
          isGroup={true}
          item={item}
          onPressHeader={onPressHeader}
        />

        <AnnounceMentModal
          modalVisible={isPopUp}
          buttonText={'ok'}
          messageText={ModalsMessages.ModalsMassages.offensiveWord}
          onPressButton={() => setIsPopUp(false)}
        />
        <View style={GroupChatsScreenStyle.viewContainer}>
          {flatlistLoader ? (
            <LoadingContainer />
          ) : isGroupDeleted ? (
            <View style={GroupChatsScreenStyle.noGroupView}>
              <Text style={GroupChatsScreenStyle.noGroupText}>
                Group Deleted
              </Text>
            </View>
          ) : massages.length !== 0 ? (
            <FlatList
              data={massages}
              extraData={massages}
              renderItem={renderItem}
              keyExtractor={(_, index) => `$messages${index}`}
              inverted
              maxToRenderPerBatch={15}
              windowSize={15}
              initialNumToRender={25}
              ref={listRef}
              style={GroupChatsScreenStyle.messageListStyle}
              showsVerticalScrollIndicator={false}
              onEndReached={onEndReached}
              ListFooterComponent={renderLoaderComponents}
            />
          ) : (
            <View style={{flex: 1}}>
              <ScrollView
                contentContainerStyle={GroupChatsScreenStyle.backImageVIew}
              >
                <SvgXml
                  xml={svg.frameIconGreen}
                  height={ms(100)}
                  width={ms(100)}
                />
                <Text style={GroupChatsScreenStyle.boldText}>
                  Say Something......
                </Text>
              </ScrollView>
            </View>
          )}

          {!isGroupDeleted && (
            <BottomInputTextSend
              onPressSendMessage={onPressSendMessage}
              onPressCamera={() => {
                setSelectedVideoUri('');
                setChatImage(undefined);

                setVideoSize({height: 0, width: 0});

                setVideoModel(false);
                onPressGalleryButtons();
              }}
              groupId={item?.id || GroupID}
              isAttachmentUri={chatImage?.uri || selectedVideoUri || ''}
              onPressCancelAttachment={() => {
                setSelectedVideoUri('');
                setChatImage(undefined);

                setVideoSize({height: 0, width: 0});
              }}
              isVideo={isVideoModel}
              onPressVideo={() => {
                setSelectedVideoUri('');
                setChatImage(undefined);

                setVideoSize({height: 0, width: 0});

                setVideoModel(true);
                onPressGalleryButtons();
              }}
              ref={inputRef}
            />
          )}
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
        <DeleteMassageModel
          visible={isDeleteModelVisisble}
          onClose={() => {
            setDeleteModelVisible(false);
            setDeleteMessage(null);
          }}
          onDelete={onPressDeleteMessage}
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
        <AnnounceMentModal
          modalVisible={error}
          title={'Oops'}
          buttonText={'Ok'}
          messageText={ModalsMessages.ModalsMassages.somethingWentWrong}
          onPressButton={() => setError(false)}
        />
        <IosBottomButtonAvoid />
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: colorPalates.white}} />
    </Provider>
  );
};

export default GroupChatsScreen;
