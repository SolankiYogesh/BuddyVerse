import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import RenderGroupItemStyle from './RenderGroupItemStyle';
import FastImage from 'react-native-fast-image';
import {images} from 'theme';
import {
  Communities,
  JoinGroupQuery,
  Action,
  NotificationContent,
  UserIdList,
  SendNotificationTarget,
  Notifications,
} from 'getsocial-react-native-sdk';
import {showToast} from 'utils/helper/helper';
import {useNavigation} from '@react-navigation/native';
import screenNameEnum from 'models/screenNameEnum';
import useUserState from 'redux-wrapper/reducers/user-slice/userState';
import ThemeButton from '../../../../components/theme-button/ThemeButton';
import {ms, s, vs} from 'react-native-size-matters';
import AnnounceMentModal from '../../../../components/annoucement-modal/AnnounceMentModal';
import {useDispatch, useSelector} from 'react-redux';
import {groupSliceActions} from '../../../../redux-wrapper/reducers/group-slice/GroupSlice';
import _ from 'lodash';
import ModalsMessages from '../../../../models/ModalsMessages';
import UserImage from '../../../../components/user-profile-image/UserImage';

const RenderGroupItem = ({item, isPrivate, onReload}) => {
  const TouchableView = isPrivate ? View : TouchableOpacity;
  const navigation = useNavigation();
  const {userData} = useUserState();
  const [modalVisisble, setModalVisisvle] = useState(false);
  const [reRequestModal, setReRequestModal] = useState(false);
  const dispath = useDispatch();
  const requestedIDs = useSelector(state => state?.group?.requestedIds);
  const [error, setError] = useState(false);
  const isRequeted = _.includes(requestedIDs, item?.id);

  const onPressInvite = () => {
    setModalVisisvle(false);
    setReRequestModal(false);
    const groupId = item?.id;
    const query = JoinGroupQuery.create(groupId);
    try {
      Communities.joinGroup(query).then(() => {
        sendNotification();
        if (!isRequeted) {
          showToast(
            isPrivate ? `Request sent to Group Admin` : `Joined ${item?.title}`,
          );
        }

        !isPrivate && navigateToGroupScreen();
        onReload();
        if (isPrivate) {
          if (!isRequeted) {
            console.log('isRequeted', isRequeted);
            dispath(groupSliceActions.addRequestID(groupId));
          } else {
            dispath(groupSliceActions.removeId({id: groupId}));
          }
        }
      });
    } catch (e) {
      setError(true);
    }
  };

  const sendNotification = async () => {
    const notificationContent = new NotificationContent();

    const action = Action.create('request_to_join_group', {
      $group_id: item?.id,
      sender_id: userData?.id,
      title: item?.title,
    });
    notificationContent.templateName = 'JoinGroup';
    notificationContent.templatePlaceholders.GROUP_TITLE = item?.title;
    notificationContent.templatePlaceholders.SENDER_DISPLAY_NAME =
      userData?.displayName;
    notificationContent.action = action;

    const target = SendNotificationTarget.usersWithIds(
      UserIdList.create([item?.settings?.properties?.owner]),
    );

    await Notifications.send(notificationContent, target);
  };

  const navigateToGroupScreen = () => {
    navigation.navigate(screenNameEnum.GroupChatsScreen, {
      item: item,
    });
  };

  return (
    <TouchableView
      style={RenderGroupItemStyle.mainContainer}
      onPress={() => setModalVisisvle(true)}
    >
      <View style={RenderGroupItemStyle.container}>
        <UserImage Url={item?.avatarUrl} size={48} />
        <View style={RenderGroupItemStyle.verticalTextView}>
          <Text style={RenderGroupItemStyle.groupName}>{item?.title}</Text>
          <Text style={RenderGroupItemStyle.membersCount}>
            {item?.membersCount} members
          </Text>
        </View>

        <ThemeButton
          onPress={() =>
            isRequeted ? setReRequestModal(true) : setModalVisisvle(true)
          }
          title={isRequeted ? 'Pending' : 'Join'}
          containerStyle={{
            overflow: 'hidden',
            borderRadius: ms(50),
            height: vs(30),
            width: s(90),
            alignItems: 'center',
            justifyContent: 'center',
          }}
          titleStyle={RenderGroupItemStyle.titleCcntainer}
        />
      </View>
      <AnnounceMentModal
        messageText={`Are you sure you’d like to join ${item?.title} group?`}
        secondButton
        secondButtonText="No"
        buttonText="Yes"
        onPressButton={onPressInvite}
        onPressSecondButton={() => setModalVisisvle(false)}
        modalVisible={modalVisisble}
      />
      <AnnounceMentModal
        messageText={`Would you like to cancel this request ?`}
        secondButton
        secondButtonText="No"
        buttonText="Yes"
        onPressButton={onPressInvite}
        onPressSecondButton={() => setReRequestModal(false)}
        modalVisible={reRequestModal}
      />
      <AnnounceMentModal
        modalVisible={error}
        title={'Oops'}
        buttonText={'Ok'}
        messageText={ModalsMessages.ModalsMassages.somethingWentWrong}
        onPressButton={() => setError(false)}
      />
    </TouchableView>
  );
};

export default RenderGroupItem;
