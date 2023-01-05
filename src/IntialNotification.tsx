import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import {notificationSliceAction, useUserState} from 'redux-wrapper/reducers';
import {useDispatch, useSelector} from 'react-redux';
import AppNavigation from 'navigation/appNavigation';
import MainSplashScreen from 'screens/auth/splash-screen/MainSplashScreen';
import {
  Communities,
  AnnouncementsQuery,
  Notifications,
  NotificationsQuery,
  PagingQuery,
  Invites,
  ReferralUsersQuery,
  UserUpdate,
  GetSocial,
} from 'getsocial-react-native-sdk';
import AnnounceMentModal from './components/annoucement-modal/AnnounceMentModal';
import {Emmiter} from 'utils/helper/helper';
import {groupSliceActions, userAction} from './redux-wrapper/reducers';
import ModalsMessages from './models/ModalsMessages';

const IntialNotification = () => {
  const {userData} = useUserState();
  const dispatch = useDispatch();
  const [isLoadTrue, setTrue] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [activity, setActivity] = useState(null);
  const [error, setError] = useState(false);
  const [alredyShowed, setAlreadyShowed] = useState(false);
  const notificationsIds = useSelector(
    state => state?.notification?.initialState?.lastNotificationID,
  );

  useEffect(() => {
    if (isShow) {
      setAlreadyShowed(true);
    }
  }, [isShow]);

  useEffect(() => {
    var query = ReferralUsersQuery.usersForEvent('newSignUpUser');
    Invites.getReferredUsers(new PagingQuery(query)).then(async value => {
      const users = value.entries;

      const uniqUsers = _.uniq(users, i => i?.userId);

      if (
        uniqUsers?.length >= 3 &&
        userData?.publicProperties?.isVip !== 'VIP'
      ) {
        var batchUpdate = new UserUpdate();
        const currentUser = await GetSocial.getCurrentUser();
        batchUpdate.privateProperties = {...userData?.privateProperties};
        batchUpdate.publicProperties = {...userData?.publicProperties};
        batchUpdate.publicProperties['isVip'] = 'VIP';
        const updateUser = {
          id: currentUser?.id,
          ...userData,
          ...batchUpdate,
        };

        currentUser.updateDetails(updateUser).then(() => {
          dispatch(userAction.setUserData({user: updateUser}));
        });
      }
    });
    Invites.setOnReferralDataReceivedListener(referralData => {
      global.refereData = referralData;
    });
  }, []);

  useEffect(() => {
    Notifications.registerDevice();

    Notifications.setOnNotificationReceivedListener((notification: any) => {
      Emmiter.emit('notification', notification);
      getFriendsRequest();
      if (notification?.action?.type === 'request_to_join_group_approved') {
        dispatch(
          groupSliceActions.removeId({id: notification?.action?.data?.groupID}),
        );
      }
      // dispatch()
    });
  }, []);

  const getAnnoucements = () => {
    const query = AnnouncementsQuery.timeline();

    try {
      Communities.getAnnouncements(query).then(value => {
        if (value.length !== 0) {
          global.isAnnouncementShowing = true;
          setActivity(value[0]);
          setIsShow(true);
        }
      });
      global.isAnnouncementShowing = false;
    } catch (e) {
      setError(true);
    }
  };

  const getFriendsRequest = () => {
    const query = NotificationsQuery.withStatus(['unread']);

    Notifications.get(new PagingQuery(query)).then(result => {
      const filteredIDs = _.filter(result?.entries, i => {
        return (
          userData?.id !== i?.sender?.userId &&
          i?.action?.type !== 'open_chat' &&
          i?.action?.type !== 'custom' &&
          i?.action?.type !== 'group_chat'
        );
      });

      const notificationLength =
        filteredIDs.length !== 0
          ? !_.includes(notificationsIds, filteredIDs[0]?.id)
          : false;

      dispatch(
        notificationSliceAction.UpdateNotification({notificationLength}),
      );
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setTrue(true);
    }, 2000);
  }, []);

  return (
    <>
      {!isLoadTrue && <MainSplashScreen />}
      <AppNavigation
        onLogin={() => {
          if (!alredyShowed) {
            setTimeout(() => {
              getAnnoucements();
            }, 3000);
          }

          getFriendsRequest();
        }}
      />
      <AnnounceMentModal
        modalVisible={isShow}
        onPressButton={() => setIsShow(false)}
        title={ModalsMessages.ModalsTitles.announceModal}
        messageText={activity?.text}
        buttonText={'OK'}
        // activity={activity}
      />

      <AnnounceMentModal
        modalVisible={error}
        title={'Oops'}
        buttonText={'Ok'}
        messageText={ModalsMessages.ModalsMassages.somethingWentWrong}
        onPressButton={() => setError(false)}
      />
    </>
  );
};

export default IntialNotification;
