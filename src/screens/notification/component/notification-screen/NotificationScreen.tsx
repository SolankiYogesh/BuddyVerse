import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import NotificationScreenStyle from '../notification-screen/NotificationScreenStyle';
import {
  NotificationsQuery,
  PagingQuery,
  Communities,
  UpdateGroupMembersQuery,
  Action,
  NotificationContent,
  UserIdList,
  SendNotificationTarget,
  Notifications,
} from 'getsocial-react-native-sdk';
import DisplayNotificationScreen from '../display-notification/DispalyNotificationScreen';
import DisplaySecondNotification from '../display-second-part/DisplaySecondNotification';
import {colorPalates, images} from 'theme';
import _ from 'lodash';
import moment from 'moment';
import LoadingContainer from 'components/loading-container/LoadingContainer';
import LinearGradient from 'react-native-linear-gradient';
import screenNameEnum from 'models/screenNameEnum';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {notificationSliceAction} from 'redux-wrapper/reducers/notification-list/NotificationSlice';
import {useUserState} from 'redux-wrapper/reducers';
import ScreenHeader from '../screen-header/ScreenHeader';
import colors from '../../../../theme/colors/colors';
import svg from '../../../../theme/images/svg';
import {Swipeable, GestureHandlerRootView} from 'react-native-gesture-handler';
import NoDataFound from '../../../../components/NoDataFound/NoDataFound';
import AnnounceMentModal from '../../../../components/annoucement-modal/AnnounceMentModal';
import ModalsMessages from '../../../../models/ModalsMessages';
import {Emmiter} from '../../../../utils/helper/helper';

const NotificationScreen = () => {
  const [notificationData, setNotificationData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {userData} = useUserState();
  const [next, setNext] = useState('');
  const [isLoadMore, setISLoadMore] = useState(false);
  const [allNotifications, setAllNotifications] = useState([]);
  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(false);
  const newStatus = 'ignored';

  let row = [];
  let prevOpenedRow;

  useEffect(() => {
    getFriendsRequest(false);
    const emit = Emmiter.addListener('notification', () => {
      getFriendsRequest(false);
    });
    dispatch(notificationSliceAction.UpdateNotification(false));

    return () => {
      emit.remove();
    };
  }, []);

  useFocusEffect(() => {
    const ids = _.map(notificationData, i => {
      if (i?.status === 'unread') {
        return i?.id;
      }
    });

    const filterIds = _.filter(ids, i => !!i);

    dispatch(notificationSliceAction.UpdateNotificationID(filterIds));
  }, [notificationData]);

  const getDate = date => {
    if (date) {
      const today = moment().format('DD-MM-YYYY');
      const yesterday = moment().subtract(1, 'days').format('DD-MM-YYYY');
      if (today === date) {
        return `Today ${moment().format('MMM DD,YYYY')}`;
      }
      if (yesterday === date) {
        return `Yesterday ${moment(moment().subtract(1, 'days')).format(
          'MMM DD,YYYY',
        )}`;
      }

      return `${moment(date, 'DD-MM-YYYY').format('MMM DD,YYYY')}`;
    } else {
      return null;
    }
  };

  const onPressNotification = item => {
    const notificationIds = [item?.id];

    try {
      Notifications.setStatus('read', notificationIds).then(() => {
        const index = _.findIndex(notificationData, i => i?.id === item?.id);
        const data = JSON.parse(JSON.stringify(notificationData));
        data[index].status = 'read';

        setNotificationData(data);
      });
    } catch (e) {
      setError(true);
    }
    const isActivity = !!item?.action?.data?.$activity_id;
    const isGroup =
      !!item?.action?.data?.groupID || !!item?.action?.data?.GroupId;

    const isUserProfile =
      item?.action?.data?.followerId || item?.action?.data?.profile;

    if (isActivity) {
      const id = item?.action?.data?.$activity_id;
      const parent_feed_id = item?.action?.data?.$parent_feed_id;
      navigation.navigate(screenNameEnum.FeedDetailScreen, {
        id,
        type: parent_feed_id,
      });
    } else if (!!isUserProfile) {
      navigation.navigate(screenNameEnum.UserProfileScreen, {
        userId: isUserProfile,
      });
    } else if (isGroup) {
      navigation.navigate(screenNameEnum.GroupChatsScreen, {
        id: item?.action?.data?.groupID || item?.action?.data?.GroupId,
      });
    }
  };

  const getFriendsRequest = (isPagination = false, load = true) => {
    const query = NotificationsQuery.withStatus(['unread', 'read']);
    const pagingQuery = new PagingQuery(query);

    if (isPagination && next) {
      pagingQuery.next = next;
      setISLoadMore(true);
    }
    if (isPagination && !next) {
      return;
    }
    setIsLoading(!isPagination && load);
    try {
      Notifications.get(pagingQuery)
        .then(result => {
          setIsLoading(false);

          setNext(result.next);

          setAllNotifications(
            isPagination
              ? [...allNotifications, ...result?.entries]
              : result?.entries,
          );
          let dataFormated = isPagination
            ? [...allNotifications, ...result?.entries]
            : result?.entries;

          const filteredIDs = _.filter(dataFormated, i => {
            return (
              userData?.id !== i?.sender?.userId &&
              i?.action?.type !== 'open_chat' &&
              i?.action?.type !== 'custom' &&
              i?.action?.type !== 'group_chat'
            );
          });

          const groupData = _.chain(filteredIDs)
            .groupBy(i => moment.unix(i?.createdAt).format('DD-MM-YYYY'))
            .map((data, tournamentId) => ({
              tournamentId,
              data,
            }))
            .value();

          let data = [];
          _.map(groupData, i => {
            const d = _.map(i?.data, R => {
              const payload = {
                date: i.tournamentId,
                ...R,
              };
              return payload;
            });
            data = [...data, ...d];
          });

          // let notificationLength = false;
          // if (data.length !== 0) {
          //   notificationLength = true;
          // } else {
          //   notificationLength = false;
          // }

          // dispatch(
          //   notificationSliceAction.UpdateNotification({data.length !== 0}),
          // );
          setISLoadMore(false);
          setNotificationData(data);
        })
        .catch(() => {
          setIsLoading(false);
          setISLoadMore(false);
        });
    } catch (e) {
      setIsLoading(false);
      setError(true);
    }
  };

  const sendNotification = async (groupId, userID, title) => {
    const notificationContent = new NotificationContent();

    const action = Action.create('request_to_join_group_approved', {
      groupID: groupId,
    });
    notificationContent.templateName = 'AprovedJoin';
    notificationContent.templatePlaceholders.GROUP_TITLE = title;
    notificationContent.action = action;

    const target = SendNotificationTarget.usersWithIds(
      UserIdList.create([userID]),
    );

    await Notifications.send(notificationContent, target);
  };

  const onPressAccept = item => {
    const isGroup = item?.action?.type === 'request_to_join_group';

    if (isGroup) {
      const groupId = item?.action?.data?.$group_id;
      const userIds = UserIdList.create([item?.action?.data?.sender_id]);
      const query = UpdateGroupMembersQuery.create(groupId, userIds)
        .withMemberStatus(2)
        .withRole(3);

      try {
        Communities.updateGroupMembers(query)
          .then(() => {
            sendNotification(
              groupId,
              item?.action?.data?.sender_id,
              item?.action?.data?.title,
            );
            onPressReject(item);
          })
          .catch(e => {
            onPressReject(item);
            console.log(e);
          });
      } catch (e) {
        setError(true);
      }
    } else {
      const userIds = UserIdList.create([item?.sender?.userId]);
      try {
        Communities.addFriends(userIds)
          .then(() => {
            onPressReject(item);
          })
          .catch(e => {
            onPressReject(item);
            console.log(e);
          });
      } catch (e) {
        setError(true);
      }
    }
  };

  const clearAllNotifications = async () => {
    let n = '',
      result = [];
    do {
      const query = NotificationsQuery.withStatus(['unread', 'read']);
      const pagingQuery = new PagingQuery(query);
      pagingQuery.next = n;
      const payload = await Notifications.get(pagingQuery);
      n = payload.next;
      result = result.concat(payload?.entries);
    } while (!!n);

    const notificationIds = _.map(result, i => {
      return i?.id;
    });

    try {
      Notifications.setStatus(newStatus, notificationIds).then(() => {
        getFriendsRequest(false, false);
      });
    } catch (e) {
      setError(true);
    }
  };

  const onPressReject = item => {
    const notificationIds = [item?.id];

    try {
      Notifications.setStatus(newStatus, notificationIds).then(() => {
        const removeItems = _.filter(notificationData, i => i?.id !== item?.id);
        setNotificationData(removeItems);
      });
    } catch (e) {
      setError(true);
    }
  };

  const closeRow = index => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  };

  const renderItem = ({item, index}) => {
    const pervData = notificationData[index - 1]?.date;
    const nowDate = item?.date;

    return (
      <>
        {pervData !== nowDate && (
          <Text style={NotificationScreenStyle.firsttitle}>
            {getDate(item?.date)}
          </Text>
        )}
        {item?.action?.type === 'add_friend' ||
        item?.action?.type === 'request_to_join_group' ? (
          <DisplaySecondNotification
            item={item}
            onPressAccept={onPressAccept}
            onPressReject={onPressReject}
          />
        ) : (
          <GestureHandlerRootView>
            <Swipeable
              rightThreshold={-20}
              overshootRight={true}
              onSwipeableOpen={() => closeRow(index)}
              renderRightActions={() => renderHiddenItem(item, index)}
              ref={ref => (row[index] = ref)}
            >
              <DisplayNotificationScreen
                item={item}
                onPress={() => onPressNotification(item)}
              />
            </Swipeable>
          </GestureHandlerRootView>
        )}
      </>
    );
  };

  const renderBottomLoader = () => {
    if (isLoadMore) {
      return (
        <View style={NotificationScreenStyle.bottomFooter}>
          <ActivityIndicator size={'small'} color={colors.blueShade00} />
        </View>
      );
    } else {
      return null;
    }
  };

  const renderHiddenItem = (item, index) => {
    return (
      <TouchableOpacity
        style={NotificationScreenStyle.rowBack}
        onPress={() => {
          row[index]?.close();
          onPressReject(item);
        }}
      >
        <LinearGradient
          start={{x: 0.0, y: 2.5}}
          end={{x: 1.5, y: 2.5}}
          locations={[0, 0.5]}
          colors={[colorPalates.greenShade60, colorPalates.AppTheme.primary]}
          style={NotificationScreenStyle.gradientBack}
        >
          <Image
            source={images.delete}
            style={NotificationScreenStyle.deleteImage}
            resizeMode="contain"
          />
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <SafeAreaView style={NotificationScreenStyle.container}>
        <ScreenHeader
          onPress={async () => setVisible(true)}
          isBackVisible={true}
        />
        <View style={NotificationScreenStyle.mainCOntainer}>
          {isLoading ? (
            <LoadingContainer />
          ) : notificationData.length !== 0 ? (
            <FlatList
              data={notificationData}
              renderItem={renderItem}
              keyExtractor={(_r, id) => `listRequest ${id}`}
              extraData={notificationData}
              onEndReached={() => getFriendsRequest(true, false)}
              ListFooterComponent={renderBottomLoader}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <NoDataFound
              svgSource={svg.notificationIconRed}
              NodataText={'No Notifications'}
            />
          )}
        </View>
        <AnnounceMentModal
          modalVisible={error}
          title={'Oops'}
          buttonText={'Ok'}
          messageText={ModalsMessages.ModalsMassages.somethingWentWrong}
          onPressButton={() => setError(false)}
        />
        <AnnounceMentModal
          modalVisible={visible}
          buttonText={'Yes'}
          secondButton={true}
          secondButtonText={'No'}
          messageText={ModalsMessages.ModalsMassages.clearAllNotifications}
          onPressButton={() => {
            setVisible(false);
            clearAllNotifications();
          }}
          onPressSecondButton={() => setVisible(false)}
        />
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: colors.white}} />
    </>
  );
};

export default NotificationScreen;
