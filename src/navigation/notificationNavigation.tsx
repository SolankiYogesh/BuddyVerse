import {createNativeStackNavigator} from '@react-navigation/native-stack';
import screenNameEnum from 'models/screenNameEnum';
import React from 'react';
import NotificationScreen from '../screens/notification/component/notification-screen/NotificationScreen';

const NotificationStack = createNativeStackNavigator();

const NotificationNavigation = () => {
  return (
    <NotificationStack.Navigator>
      <NotificationStack.Screen
        name={screenNameEnum.NotificationScreen}
        component={NotificationScreen}
        options={{
          headerShown: false,
        }}
      />
    </NotificationStack.Navigator>
  );
};

export default NotificationNavigation;
