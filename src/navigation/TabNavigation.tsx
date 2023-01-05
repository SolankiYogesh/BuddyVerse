import React, {useEffect, useMemo} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import screenNameEnum from '../models/screenNameEnum';
import FeedList from '../screens/feed/pages/new-feed-list/FeedList';
import CreateFeedScreen from '../screens/feed/pages/create-feed/CreateFeedScreen';
import ToggleBottomBar from '../components/toggle-bottom-bar/ToggleBottomBar';
import GreenTalk from '../screens/feed/pages/green-talk/GreenTalk';
import ProfileScreen from '../screens/profile/pages/profile-screen/ProfileScreen';
import {useUserState} from 'redux-wrapper/reducers';
const Tab = createBottomTabNavigator();
import {
  PostActivityTarget,
  ActivityContent,
  Communities,
  UserUpdate,
  GetSocial,
  Invites,
  UserId,
  NotificationContent,
  Action,
  SendNotificationTarget,
  UserIdList,
  Notifications,
  FollowQuery,
} from 'getsocial-react-native-sdk';
import appConstants from '../models/appConstants';
import {userAction} from '../redux-wrapper/reducers/user-slice/userSlice';
import {useDispatch} from 'react-redux';
import EndPoints from '../Network/EndPoints';
import _ from 'lodash';

const renderTabBar = props => {
  return <ToggleBottomBar {...props} />;
};

const TabNavigation = props => {
  const {userData} = useUserState();

  useMemo(() => {
    const dob = userData?.privateProperties?.dob;
    const labelsData = !!userData?.publicProperties?.labelsData
      ? JSON.parse(userData?.publicProperties?.labelsData)
      : [];

    const imData = !!labelsData?.iamData
      ? JSON.parse(labelsData?.iamData)?.length
      : 0;
    if (
      !userData?.avatarUrl ||
      !userData?.displayName ||
      !userData?.publicProperties?.full_name ||
      imData === 0 ||
      !dob ||
      _.includes(userData?.displayName, 'User ')
    ) {
      props?.navigation?.replace(screenNameEnum.EditProfileScreen, {
        isNotVerified: true,
      });
    }
  }, []);

  useEffect(() => {
    if (!!global.refereData) {
      setRefere();
    }
    followSystem();
    setProfile();
  }, []);

  const setProfile = async () => {
    let data = userData?.publicProperties?.aboutData
      ? JSON.parse(userData?.publicProperties?.aboutData)
      : '';
    let labelData = userData?.publicProperties?.labelsData
      ? JSON.parse(userData?.publicProperties?.labelsData)
      : '';

    let count = 0;

    if (userData?.avatarUrl) {
      count = count + 1;
    }
    if (userData?.displayName) {
      count = count + 1;
    }
    if (userData?.publicProperties?.full_name) {
      count = count + 1;
    }
    if (userData?.privateProperties?.dob) {
      count = count + 1;
    }
    if (userData?.privateProperties?.gender) {
      count = count + 1;
    }
    if (data?.aboutText) {
      count = count + 1;
    }

    if (data?.website) {
      count = count + 1;
    }
    if (labelData?.iamData) {
      count = count + 1;
    }
    if (labelData?.myPassionsData) {
      count = count + 1;
    }
    if (labelData?.canabisData) {
      count = count + 1;
    }

    var batchUpdate = new UserUpdate();
    const currentUser = await GetSocial.getCurrentUser();
    batchUpdate.privateProperties = {...userData?.privateProperties};
    batchUpdate.publicProperties = {...userData?.publicProperties};
    batchUpdate.publicProperties['profileComplete'] = (count * 10).toString();

    const updateUser = {
      id: currentUser?.id,
      ...userData,
      ...batchUpdate,
    };

    currentUser.updateDetails(updateUser).then(() => {
      dispatch(userAction.setUserData({user: updateUser}));
    });
  };

  const followSystem = () => {
    const checkUiD = UserIdList.create([EndPoints.systemUser]);
    const checkQuery = FollowQuery.users(checkUiD);
    Communities.isFollowing(UserId.currentUser(), checkQuery).then(
      async result => {
        if (!result[EndPoints.systemUser]) {
          await Communities.follow(
            FollowQuery.users(UserIdList.create([EndPoints.systemUser])),
          );
        }
      },
    );
  };

  const setRefere = async () => {
    if (userData?.publicProperties?.isRefered !== 'true') {
      if (userData?.displayName?.toLowerCase()?.startsWith('user')) {
        const userId = UserId.create(global.refereData?.referrerUserId);
        const customData = new Map();
        await Invites.setReferrer(userId, 'newSignUpUser', customData);
        updateUser();
      }
    }
  };

  const updateUser = async () => {
    var batchUpdate = new UserUpdate();
    const currentUser = await GetSocial.getCurrentUser();
    batchUpdate.privateProperties = {...userData?.privateProperties};
    batchUpdate.publicProperties = {...userData?.publicProperties};
    batchUpdate.publicProperties['isRefered'] = 'true';

    const updateUser = {
      id: currentUser?.id,
      ...userData,
      ...batchUpdate,
    };

    currentUser.updateDetails(updateUser).then(() => {
      dispatch(userAction.setUserData({user: updateUser}));
      sendReferNotification();
    });
  };

  const sendReferNotification = async () => {
    const notificationContent = new NotificationContent();
    const action = Action.create('refer_User', {profile: userData?.id});
    notificationContent.templateName = 'Refer_user';
    notificationContent.templatePlaceholders['SOMEONE'] =
      userData?.publicProperties?.full_name || userData?.displayName;
    notificationContent.action = action;
    const target = SendNotificationTarget.usersWithIds(
      UserIdList.create([global.refereData?.referrerUserId]),
    );
    await Notifications.send(notificationContent, target);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (!userData?.publicProperties?.reactionID) {
      updateUserData(userData?.id);
    }
  }, []);

  const updateUserData = id => {
    const activityContent = new ActivityContent();
    activityContent.text = id;
    const target = PostActivityTarget.topic(appConstants.APIPuffPuffPass);
    Communities.postActivity(activityContent, target).then(async result => {
      var batchUpdate = new UserUpdate();
      const currentUser = await GetSocial.getCurrentUser();
      batchUpdate.privateProperties = {...userData?.privateProperties};
      batchUpdate.publicProperties = {...userData?.publicProperties};
      batchUpdate.publicProperties['reactionID'] = result?.id;
      const updateUser = {
        id: currentUser?.id,
        ...userData,
        ...batchUpdate,
      };
      currentUser.updateDetails(updateUser).then(() => {
        dispatch(userAction.setUserData({user: updateUser}));
      });
    });
  };
  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      screenOptions={{headerShown: false, lazy: false}}
      defaultScreenOptions={{lazy: false}}
    >
      <Tab.Screen name={screenNameEnum.FeedList} component={FeedList} />
      <Tab.Screen name={screenNameEnum.GreenTalk} component={GreenTalk} />
      <Tab.Screen
        name={screenNameEnum.ProfileScreen}
        component={ProfileScreen}
        options={{lazy: true}}
      />
      <Tab.Screen
        name={screenNameEnum.CreateFeedScreen}
        component={CreateFeedScreen}
      />
      <Tab.Screen name={screenNameEnum.moreMenu} component={FeedList} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
