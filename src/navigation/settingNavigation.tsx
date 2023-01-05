import {createNativeStackNavigator} from '@react-navigation/native-stack';
import screenNameEnum from 'models/screenNameEnum';
import React from 'react';
import AboutDetailScreen from 'screens/setting/about/AboutDetailScreen';
import FaqScreen from 'screens/setting/faq/FaqScreen';
import AboutGreenLyncScreen from 'screens/setting/about/legal/about-greenlync/AboutGreenLyncScreen';
import DataPolicyScreen from 'screens/setting/about/legal/data-policy/DataPolicyScreen';
import EulaAgreementScreen from 'screens/setting/about/legal/EULA-Agreement/EulaAgreementScreen';
import LegalScreen from 'screens/setting/about/legal/LegalScreen';
import PrivacyPolicyScreen from 'screens/setting/about/legal/privacy-policy/PrivacyPolicyScreen';
import TermsOfUseScreen from 'screens/setting/about/legal/terms-of-use/TermsOfUseScreen';
import EventScreen from 'screens/setting/notifications/events/EventScreen';
import FeedAndCommentScreen from 'screens/setting/notifications/feed-and-comments/FeedAndCommentScreen';
import FollowingAndFollowScreen from 'screens/setting/notifications/following-and-followers/FollowingAndFollowScreen';
import MessageScreen from 'screens/setting/notifications/messages/MessageScreen';
import NotificationScreen from 'screens/setting/notifications/NotificationScreen';
import ActivityScreen from 'screens/setting/privacy-and-security/activity/ActivityScreen';
import AppUpdateScreen from 'screens/setting/privacy-and-security/app-updates/AppUpdateScreen';
import ChatSettingScreen from 'screens/setting/privacy-and-security/chat-setting/ChatScreenSetting';
import MyLocationScreen from 'screens/setting/privacy-and-security/my-location/MyLocationScreen';
import PrivacyAndSecurityScreen from 'screens/setting/privacy-and-security/PrivacyAndSecurityScreen';
import SettingsScreen from 'screens/setting/SettingsScreen';
import SupportScreen from 'screens/setting/about/support/SupportScreen';
import aboutDetailNavigation from './aboutDetailNavigation';
import AboutNavigation from './aboutDetailNavigation';


const SettingStack = createNativeStackNavigator();
const SettingNavigation = () => {
  return (
    <SettingStack.Navigator initialRouteName="SettingsScreen">
       
       
      <SettingStack.Screen
        name={screenNameEnum.SettingsScreen}
        component={SettingsScreen}
        options={{
          headerShown: false,
        }}
      />
      
      {/* <SettingStack.Screen
        name={screenNameEnum.AboutStack}
        component={AboutNavigation}
        options={{
          headerShown: false,
        }}
      /> */}
      <SettingStack.Screen
        name={screenNameEnum.NotificationScreen}
        component={NotificationScreen}
        options={{
          headerShown: false,
        }}
      />
      <SettingStack.Screen
        name={screenNameEnum.FeedAndCommentScreen}
        component={FeedAndCommentScreen}
        options={{
          headerShown: false,
        }}
      />
      <SettingStack.Screen
        name={screenNameEnum.FollowingAndFollowScreen}
        component={FollowingAndFollowScreen}
        options={{
          headerShown: false,
        }}
      />
      <SettingStack.Screen
        name={screenNameEnum.MessageScreen}
        component={MessageScreen}
        options={{
          headerShown: false,
        }}
      />
      <SettingStack.Screen
        name={screenNameEnum.EventScreen}
        component={EventScreen}
        options={{
          headerShown: false,
        }}
      />
      <SettingStack.Screen
        name={screenNameEnum.PrivacyAndSecurityScreen}
        component={PrivacyAndSecurityScreen}
        options={{
          headerShown: false,
        }}
      />
      <SettingStack.Screen
        name={screenNameEnum.ActivityScreen}
        component={ActivityScreen}
        options={{
          headerShown: false,
        }}
      />
      <SettingStack.Screen
        name={screenNameEnum.AppUpdateScreen}
        component={AppUpdateScreen}
        options={{
          headerShown: false,
        }}
      />
      <SettingStack.Screen
        name={screenNameEnum.ChatSettingScreen}
        component={ChatSettingScreen}
        options={{
          headerShown: false,
        }}
      />
      <SettingStack.Screen
        name={screenNameEnum.MyLocationScreen}
        component={MyLocationScreen}
        options={{
          headerShown: false,
        }}
      />
      <SettingStack.Screen
        name={screenNameEnum.FaqScreen}
        component={FaqScreen}
        options={{
          headerShown: false,
        }}
      />
     
    </SettingStack.Navigator>
  );
};

export default SettingNavigation;
