import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Text,
} from 'react-native';
import React, {forwardRef, useEffect, useState} from 'react';
import {InputTextStyle, styles} from './BottomInputTextSendStyle';
import {useUserState} from 'redux-wrapper/reducers';
import {colorPalates, images} from 'theme';
import VideoButton from 'screens/feed/pages/create-feed/components/video-button/VideoButton';
import CameraButton from 'screens/feed/pages/create-feed/components/camera-button/CameraButton';
import _ from 'lodash';
import VideoPlayer from 'react-native-video-player';
import {
  Communities,
  PagingQuery,
  MembersQuery,
} from 'getsocial-react-native-sdk';
import FastImage from 'react-native-fast-image';
import {useTheme} from '@react-navigation/native';
import AnnounceMentModal from '../../../../components/annoucement-modal/AnnounceMentModal';
import ModalsMessages from '../../../../models/ModalsMessages';
import UserImage from '../../../../components/user-profile-image/UserImage';

const BottomInputTextSend = forwardRef(
  (
    props: {
      onPressSendMessage: any;
      onPressCamera: any;
      isAttachmentUri: string;
      onPressCancelAttachment: any;
      onPressVideo: any;
      isVideo: boolean;
      groupId: string;
    },
    ref,
  ) => {
    const {
      onPressSendMessage,
      onPressCamera,
      isAttachmentUri,
      onPressCancelAttachment,
      onPressVideo,
      isVideo,
      groupId,
    } = props;
    const [text, setText] = useState('');
    const [isTextInputActive, setIsTextInputActive] = useState(false);
    const [mentionsList, setMentionsList] = useState([]);
    const [mentionsModel, setMentionsModel] = useState(false);
    const [dataUsers, setDataUsers] = useState([]);
    const {userData} = useUserState();
    const {colors} = useTheme();
    const BottomInputTextSendStyle = styles(colors);
    const [error, setError] = useState(false);

    useEffect(() => {
      if (!!groupId) {
        const query = MembersQuery.ofGroup(groupId);
        let pagingQuery = new PagingQuery(query);
        try {
          Communities.getGroupMembers(pagingQuery).then(members => {
            const filter: any[] = _.filter(
              members?.entries,
              i => i?.userId !== userData?.id,
            );
            setDataUsers(filter);
            setMentionsList(filter);
          });
        } catch (e) {
          setError(true);
        }
      }
    }, []);

    useEffect(() => {
      if (!mentionsModel) {
        setMentionsList(dataUsers);
      }
    }, [mentionsModel]);

    const onPressSend = () => {
      if (_.trim(text) || !!isAttachmentUri) {
        onPressSendMessage(text);
        setText('');
      }
    };
    const onFocusInput = () => {
      setIsTextInputActive(true);
    };

    const onBlurInput = () => {
      setIsTextInputActive(text.length > 0);
    };

    const getMentions = (keyword: string) => {
      if (Array.isArray(dataUsers)) {
        if (keyword.slice(1) === '') {
          setMentionsList(dataUsers);
        } else {
          const userDataList = mentionsList.filter(
            obj =>
              obj.displayName
                ?.toLowerCase()
                ?.indexOf(keyword?.toLowerCase()?.slice(1)) !== -1,
          );
          setMentionsList([...userDataList]);
        }
      }
    };

    const onChangeText = (t: String) => {
      if (!groupId) {
        setText(t);
        return;
      }
      const lastChar = text.substr(text.length - 1);
      const currentChar = t.substr(t.length - 1);
      const spaceCheck = /[^@A-Za-z_]/g;
      setText(t);
      if (t.length === 0) {
        setMentionsModel(false);
      } else {
        if (spaceCheck.test(lastChar) && currentChar !== '@') {
          setMentionsModel(false);
        } else {
          const checkSpecialChar = currentChar.match(/[^@A-Za-z_]/);
          if (checkSpecialChar === null || currentChar === '@') {
            const pattern = new RegExp(`\\B@[a-z0-9_-]+|\\B@`, `gi`);
            const matches = t.match(pattern) || [];

            if (matches.length > 0) {
              getMentions(matches[matches.length - 1]);
              const findUser = mentionsList.find(
                i => i?.displayName === matches[matches.length - 1].slice(1),
              );

              if (!!findUser) {
                setMentionsModel(false);
              } else {
                setMentionsModel(true);
              }
            } else {
              setMentionsModel(false);
            }
          } else if (checkSpecialChar != null) {
            setMentionsModel(false);
          }
        }
      }
    };

    const onPressMentions = item => {
      const MentionsTex = `${item?.displayName}`;
      setText(text.replace(/\w+[.!?]?$/, '')?.concat(MentionsTex) + ' ');
      setMentionsModel(false);
    };

    const renderMentionsItem = ({item}) => {
      return (
        <TouchableOpacity
          style={BottomInputTextSendStyle.profileView}
          onPress={() => onPressMentions(item)}
        >
          <UserImage
            Url={item?.avatarUrl}
            size={20}
            style={BottomInputTextSendStyle.profileImage}
          />
          <Text style={BottomInputTextSendStyle.profileText}>
            {item?.displayName}
          </Text>
        </TouchableOpacity>
      );
    };

    const renderMentionsList = () => {
      return (
        <FlatList
          data={mentionsList}
          keyboardShouldPersistTaps="always"
          extraData={useState}
          renderItem={renderMentionsItem}
          keyExtractor={(_, index) => `mentions${index}`}
        />
      );
    };

    return (
      <View style={BottomInputTextSendStyle.mainContainer}>
        {!!isAttachmentUri && !mentionsModel && (
          <View style={BottomInputTextSendStyle.imageStyleContainer}>
            <TouchableOpacity
              onPress={() => {
                onPressCancelAttachment();
              }}
              style={BottomInputTextSendStyle.crossContainer}
            >
              <Image
                source={images.cross}
                style={BottomInputTextSendStyle.crossImage}
                resizeMode="contain"
              />
            </TouchableOpacity>

            {isVideo ? (
              <VideoPlayer
                video={{
                  uri: isAttachmentUri,
                }}
                // videoWidth={videoWidth || 1280}
                // videoHeight={videoHeight || 720}
                showDuration={true}
                autoplay={true}
                fullScreenOnLongPress={false}
                disableFullscreen={true}
                customStyles={{video: BottomInputTextSendStyle.feedVideo}}
                resizeMode="cover"
                controlsTimeout={1000}
              />
            ) : (
              <Image
                source={{
                  uri: isAttachmentUri,
                }}
                resizeMode="cover"
                style={BottomInputTextSendStyle.imageStyle}
              />
            )}
          </View>
        )}

        {mentionsModel && mentionsList.length !== 0 && (
          <View style={BottomInputTextSendStyle.mentionsViewHeight}>
            {renderMentionsList()}
          </View>
        )}
        <View style={BottomInputTextSendStyle.inputConntainer}>
          <View style={BottomInputTextSendStyle.rowView}>
            <CameraButton onPressCameraButton={onPressCamera} />
            {/* <VideoButton onPressVideoButton={onPressVideo} /> */}
          </View>
          <TextInput
            style={InputTextStyle(isTextInputActive, colors)}
            value={text}
            placeholder={'Write a message...'}
            placeholderTextColor={colorPalates.grayShade80}
            onChangeText={onChangeText}
            onSubmitEditing={onPressSend}
            blurOnSubmit={true}
            maxLength={300}
            ref={ref}
            onFocus={onFocusInput}
            onBlur={onBlurInput}
            returnKeyType="send"
          />

          <TouchableOpacity
            onPress={onPressSend}
            hitSlop={{top: 10, right: 10, bottom: 10, left: 10}}
          >
            <Image
              source={images.send}
              style={[
                BottomInputTextSendStyle.iconStyle,
                {tintColor: colorPalates.AppTheme.primary},
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <AnnounceMentModal
          modalVisible={error}
          title={'Oops'}
          buttonText={'Ok'}
          messageText={ModalsMessages.ModalsMassages.somethingWentWrong}
          onPressButton={() => setError(false)}
        />
      </View>
    );
  },
);

export default BottomInputTextSend;
