import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import screenNameEnum from 'models/screenNameEnum';
import AuthNavigation from './authNavigation';
import Message from 'react-native-flash-message';
import {TouchableOpacity} from 'react-native';
import {Auth, Hub} from 'aws-amplify';
import NotificationNavigation from './notificationNavigation';
import ChatNavigation from './chatNavigation';
import {useDispatch, useSelector} from 'react-redux';
import {userAction} from 'redux-wrapper/reducers';
import {navigationRef} from './rootNavigation';
import AllChatsScreen from 'screens/chat/pages/all-chats-list/AllChatsScreen';
import GroupChatsScreen from 'screens/chat/pages/group-chats/GroupChatsScreen';
import EditGroupScreen from 'screens/chat/pages/edit-group/EditGroupScreen';
import FeedDetailScreen from 'screens/feed/pages/feed-detail/FeedDetailScreen';
import CreateGroupScreen from 'screens/chat/pages/create-group/CreateGroupScreen';
import ProfileScreen from 'screens/profile/pages/profile-screen/ProfileScreen';
import {
  Invites,
  Communities,
  Notifications,
  GetSocial,
  Identity,
} from 'getsocial-react-native-sdk';
import AddMembersScreen from 'screens/chat/pages/add-members/AddMembersScreen';
import {Emmiter} from 'utils/helper/helper';
import {useUserState} from 'redux-wrapper/reducers';
import UserProfileScreen from 'screens/feed/components/user-profile-sceen/UserProfileScreen';
import VideoPlayScreen from 'screens/chat/pages/video-play/VideoPlayScreen';
import FollowerFollwingScreen from '../screens/profile/pages/follower-and-following /FollowerFollwingScreen';
import NotificationScreen from '../screens/setting/notifications/NotificationScreen';
import ChangePassword from '../screens/auth/change-password/ChangePassword';
import AboutNavigation from './aboutDetailNavigation';
import CommentScreen from '../screens/feed/pages/commentScreen/CommentScreen';
import MainSplashScreen from '../screens/auth/splash-screen/MainSplashScreen';
import GreenTalk from '../screens/feed/pages/green-talk/GreenTalk';
import AllUsersChatsScreen from '../screens/chat/pages/all-users-list/AllUsersChatsScreen';
import ShopNavigation from './shopNavigation';
import CreateFeedScreen from '../screens/feed/pages/create-feed/CreateFeedScreen';
import colorPalates from '../theme/colors/colorPalates';
import TabNavigation from './TabNavigation';
import FeedNavigation from './feedNavigation';
import DispensaryNewAboutScreen from '../screens/shop/pages/dispensary-new-aboutScreen/DispensaryNewAboutScreen';
import DispensaryAboutScreen from '../screens/shop/pages/dispensaries/pages/dispensary-about/DispensaryAboutScreen';
import EditProfileScreen from '../screens/profile/pages/edit-Profile/EditProfileScreen';
import BlockUsersScreen from '../screens/profile/pages/bloack-users-screen/BlockUsersScreen';

const RootStack = createNativeStackNavigator();

const AppNavigation = props => {
  const [user, setUser] = useState(undefined);
  const dispatch = useDispatch();
  const {userData} = useUserState();
  let isTokenRefresh = false;
  const theme = useSelector(state => state?.theme?.isDark);
  const [loading, setLoading] = useState(false);
  const [noti, setNoti] = useState(null);
  const [shareEventData, setShareEventData] = useState(null);

  useEffect(() => {
    const emit = Emmiter.addListener('startLoading', () => {
      setLoading(true);
    });

    return () => {
      emit.remove();
    };
  }, []);

  useEffect(() => {
    if (navigationRef.isReady() && !!noti) {
      onNotificationCLicked(noti);
    }
  }, [navigationRef.isReady(), noti]);

  useEffect(() => {
    if (navigationRef.isReady() && !!shareEventData) {
      navigateShareData(shareEventData);
    }
  }, [navigationRef.isReady(), shareEventData]);

  useEffect(() => {
    Invites.setOnReferralDataReceivedListener(data => {
      setShareEventData(data);
    });
  }, []);

  const navigateShareData = data => {
    const PlaceId = data?.referralLinkParams?.PlaceID;
    const ShopId = data?.referralLinkParams?.shopID;
    const activityID = data?.referralLinkParams?.activity_id;

    if (!!PlaceId) {
      navigationRef.navigate(screenNameEnum.DispensaryNewAboutScreen, {
        placeID: PlaceId,
      });
    } else if (!!activityID) {
      Communities.getActivity(activityID).then(resp => {
        if (!!resp) {
          navigationRef.navigate(screenNameEnum.FeedDetailScreen, {
            id: activityID,
          });
        }
      });
    } else if (!!ShopId) {
      navigationRef.navigate(screenNameEnum.DispensaryAboutScreen, {
        shopID: ShopId,
      });
    }

    setTimeout(() => {
      setShareEventData(null);
    }, 1000);
  };

  const onNotificationCLicked = notification => {
    const isGroup = notification?.action?.data?.groupID ? true : false;
    const isChat = notification?.action?.data?.$chat_id ? true : false;
    const isActivity = notification?.action?.data?.$activity_id ? true : false;
    const isUserProfile =
      notification?.action?.data?.followerId ||
      notification?.action?.data?.profile;

    if (isChat) {
      const id = notification?.action?.data?.$chat_id;

      navigationRef.navigate(screenNameEnum.AllChatsScreen, {
        id,
      });
    } else if (isGroup) {
      const id = notification?.action?.data?.groupID;
      navigationRef.navigate(screenNameEnum.GroupChatsScreen, {
        id,
      });
    } else if (isActivity) {
      const id = notification?.action?.data?.$activity_id;
      const commentID = notification?.action?.data?.$comment_id;
      navigationRef.navigate(screenNameEnum.FeedDetailScreen, {
        id,
        commentID,
      });
    } else if (!!isUserProfile) {
      navigationRef.navigate(screenNameEnum.UserProfileScreen, {
        userId: isUserProfile,
      });
    } else {
      const notificationIds = [notification?.id];
      const newStatus = 'unread';

      setTimeout(async () => {
        await Notifications.setStatus(newStatus, notificationIds);
        navigationRef.navigate(screenNameEnum.NotificationStack);
      }, 500);
    }
    setTimeout(() => {
      setNoti(null);
    }, 1000);
  };

  useEffect(() => {
    Notifications.setOnNotificationClickedListener(notification => {
      setNoti(notification);
    });
  }, []);

  useEffect(() => {
    try {
      GetSocial.isInitialized().then(async resp => {
        if (resp) {
          if (userData) {
            setUser(userData);
          } else {
            setUser(null);
          }
        } else {
          await GetSocial.init();
        }
      });
    } catch (e) {}
  }, [userData]);

  let handleConflict = async (conflictUser, identity, authUser) => {
    console.log('Conflict User Section', conflictUser);
    console.log('Conflict User Indentity', identity);
    await GetSocial.switchUser(identity);
    props?.onLogin();
    Emmiter.emit('isLoggedIn');
    Emmiter.emit('openAnnouncement');

    try {
      GetSocial.getCurrentUser().then(user => {
        dispatch(userAction.setUserData({user: user}));
        setUser(authUser);
        Emmiter.emit('isLoggedIn');
        Emmiter.emit('openAnnouncement');
      });
    } catch (e) {
      console.log(e);
    }
  };

  const checkUser = async (isSignOut = false) => {
    // setLoading(true);
    if (isTokenRefresh && !isSignOut) {
      setLoading(false);
      return;
    }

    try {
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});

      const userId = authUser?.attributes?.sub;
      const accessToken = authUser?.attributes?.sub;
      const identity = Identity.createCustomIdentity(
        'greenlync',
        userId,
        accessToken,
      );
      if (!GetSocial.isInitialized()) {
        await GetSocial.init();
      }

      const currentUser = await GetSocial.getCurrentUser();
      if (currentUser?.id) {
        isTokenRefresh = true;
      }
      console.log('Before IDENTITY GETSocial User: ', currentUser);
      console.log('IDENTITY', identity);
      currentUser.addIdentity(
        identity,
        async () => {
          console.log('Successfully logged into ' + userId);
          GetSocial.getCurrentUser().then(user => {
            setLoading(false);
            dispatch(userAction.setUserData({user: user}));
            setUser(authUser);
            props?.onLogin();
            Emmiter.emit('isLoggedIn');
            Emmiter.emit('openAnnouncement');
            console.log('USER is LOGGED IN', user);
          });
        },
        conflictUser => {
          setLoading(false);
          handleConflict(conflictUser, identity, authUser);
        },
        e => {
          setLoading(false);
          setLoading(false);

          console.log('Failed to log into ' + userId, e);
        },
      );
    } catch (e) {
      setUser(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    TouchableOpacity.defaultProps = {...TouchableOpacity.defaultProps};
    TouchableOpacity.defaultProps.activeOpacity = 0.8;
    const callMethod = async () => {
      await checkUser();
    };
    callMethod();
    const listener = data => {
      console.log('HUB DATA1', data.payload.event, data);

      switch (data.payload.event) {
        case 'signIn':
          setLoading(true);
          checkUser(true);
          break;
        case 'tokenRefresh':
          checkUser(false);
          break;
        case 'signOut':
          checkUser(false).then(() => {
            dispatch(userAction.setUserData({user: null}));
          });
          break;
      }
    };

    Hub.listen('auth', listener);
    return () => Hub.remove('auth', listener);
  }, []);

  if (user === undefined) {
    return <MainSplashScreen />;
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={theme ? colorPalates.DarkTheme : colorPalates.LightTheme}
    >
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
          <>
            <RootStack.Screen
              name={screenNameEnum.TabStack}
              component={TabNavigation}
            />
            <RootStack.Screen
              name={screenNameEnum.ChangePassword}
              component={ChangePassword}
            />
            <RootStack.Screen
              name={screenNameEnum.AboutStack}
              component={AboutNavigation}
            />

            <RootStack.Screen
              name={screenNameEnum.NotificationScreen}
              component={NotificationScreen}
              options={{
                headerShown: false,
              }}
            />

            <RootStack.Screen
              name={screenNameEnum.CreateFeedScreen}
              component={CreateFeedScreen}
              options={{
                headerShown: false,
              }}
            />

            <RootStack.Screen
              name={screenNameEnum.NotificationStack}
              component={NotificationNavigation}
            />
            <RootStack.Screen
              name={screenNameEnum.ChatStack}
              component={ChatNavigation}
            />
            <RootStack.Screen
              name={screenNameEnum.ShopStack}
              component={ShopNavigation}
            />
            <RootStack.Screen
              name={screenNameEnum.AllUsersChatsScreen}
              component={AllUsersChatsScreen}
            />
            <RootStack.Screen
              name={screenNameEnum.AllChatsScreen}
              component={AllChatsScreen}
              options={{
                headerShown: false,
              }}
            />
            <RootStack.Screen
              name={screenNameEnum.GroupChatsScreen}
              component={GroupChatsScreen}
              options={{
                headerShown: false,
              }}
            />
            <RootStack.Screen
              name={screenNameEnum.DispensaryNewAboutScreen}
              component={DispensaryNewAboutScreen}
              options={{
                headerShown: false,
              }}
            />

            <RootStack.Screen
              name={screenNameEnum.EditGroupScreen}
              component={EditGroupScreen}
              options={{
                headerShown: false,
              }}
            />
            <RootStack.Screen
              name={screenNameEnum.CreateGroupScreen}
              component={CreateGroupScreen}
              options={{
                headerShown: false,
              }}
            />
            <RootStack.Screen
              name={screenNameEnum.FeedDetailScreen}
              component={FeedDetailScreen}
              options={{
                headerShown: false,
              }}
            />
            <RootStack.Screen
              name={screenNameEnum.DispensaryAboutScreen}
              component={DispensaryAboutScreen}
              options={{
                headerShown: false,
              }}
            />
            <RootStack.Screen
              name={screenNameEnum.ProfileScreen}
              component={ProfileScreen}
              options={{
                headerShown: false,
              }}
            />
            <RootStack.Screen
              name={screenNameEnum.AddMembersScreen}
              component={AddMembersScreen}
              options={{
                headerShown: false,
              }}
            />
            <RootStack.Screen
              name={screenNameEnum.EditProfileScreen}
              component={EditProfileScreen}
              options={{
                headerShown: false,
              }}
            />

            <RootStack.Screen
              name={screenNameEnum.UserProfileScreen}
              component={UserProfileScreen}
              options={{
                headerShown: false,
              }}
            />
            <RootStack.Screen
              name={screenNameEnum.GreenTalk}
              component={GreenTalk}
              options={{
                headerShown: false,
              }}
            />
            <RootStack.Screen
              name={screenNameEnum.BlockUsersScreen}
              component={BlockUsersScreen}
              options={{
                headerShown: false,
              }}
            />
            <RootStack.Screen
              name={screenNameEnum.VideoPlayScreen}
              component={VideoPlayScreen}
              options={{
                headerShown: false,
              }}
            />

            <RootStack.Screen
              name={screenNameEnum.FollowerFollwingScreen}
              component={FollowerFollwingScreen}
              options={{
                headerShown: false,
              }}
            />
            <RootStack.Screen
              name={screenNameEnum.CommentScreen}
              component={CommentScreen}
              options={{
                headerShown: false,
              }}
            />
            <RootStack.Screen
              name={screenNameEnum.FeedStack}
              component={FeedNavigation}
            />
          </>
        ) : (
          <>
            <RootStack.Screen
              name={screenNameEnum.AuthStack}
              component={AuthNavigation}
            />
            {/* <RootStack.Screen
              name={screenNameEnum.MainSplashScreen}
              component={MainSplashScreen}
            /> */}

            {/* <RootStack.Screen
              name={screenNameEnum.FeedStack}
              component={FeedNavigation}
            /> */}
            {/* <RootStack.Screen
              name={screenNameEnum.BlockCommentScreen}
              component={BlockCommentScreen}
            /> */}
          </>
        )}
      </RootStack.Navigator>
      <Message duration={3000} />
      {/* {loading && <MainSplashScreen />} */}
    </NavigationContainer>
  );
};
export default AppNavigation;
