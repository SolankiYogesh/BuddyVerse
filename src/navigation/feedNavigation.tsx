import {
  createNativeStackNavigator,
  TransitionPresets,
} from '@react-navigation/native-stack';
import screenNameEnum from 'models/screenNameEnum';
import React from 'react';
import ChangePassword from 'screens/auth/change-password/ChangePassword';
import CreateFeedScreen from 'screens/feed/pages/create-feed/CreateFeedScreen';
import FeedDetailScreen from 'screens/feed/pages/feed-detail/FeedDetailScreen';
import EditProfileScreen from '../screens/profile/pages/edit-Profile/EditProfileScreen';
import AboutNavigation from './aboutDetailNavigation';

const FeedStack = createNativeStackNavigator();

const FeedNavigation = p => {
  const routeID = p?.route?.params?.routeID;
  return (
    <FeedStack.Navigator
      initialRouteName={screenNameEnum.HomeScreen}
      screenOptions={{...TransitionPresets.ModalPresentationIOS}}
    >
      <FeedStack.Screen
        name={screenNameEnum.AboutStack}
        component={AboutNavigation}
        options={{
          headerShown: false,
        }}
        initialParams={{routeID}}
      />
      <FeedStack.Screen
        name={screenNameEnum.FeedDetailScreen}
        component={FeedDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <FeedStack.Screen
        name={screenNameEnum.EditProfileScreen}
        component={EditProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <FeedStack.Screen
        name={screenNameEnum.ChangePassword}
        component={ChangePassword}
        options={{
          headerShown: false,
        }}
      />
      <FeedStack.Screen
        name={screenNameEnum.CreateFeedScreen}
        component={CreateFeedScreen}
      />
    </FeedStack.Navigator>
  );
};

export default FeedNavigation;
