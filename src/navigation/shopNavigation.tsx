import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import MainScreen from '../screens/shop/pages/Main/MainScreen';
import DispensaryAboutScreen from 'screens/shop/pages/dispensaries/pages/dispensary-about/DispensaryAboutScreen';
import screenNameEnum from '../models/screenNameEnum';
import DispensaryNewAboutScreen from '../screens/shop/pages/dispensary-new-aboutScreen/DispensaryNewAboutScreen';

const ShopStack = createNativeStackNavigator();

const ShopNavigation = () => {
  return (
    <ShopStack.Navigator>
      <ShopStack.Screen
        name={screenNameEnum.HomeScreen}
        component={MainScreen}
        options={{
          headerShown: false,
        }}
      />
      <ShopStack.Screen
        name={screenNameEnum.DispensaryAboutScreen}
        component={DispensaryAboutScreen}
        options={{
          headerShown: false,
        }}
      />

      <ShopStack.Screen
        name={screenNameEnum.DispensaryNewAboutScreen}
        component={DispensaryNewAboutScreen}
        options={{
          headerShown: false,
        }}
      />
    </ShopStack.Navigator>
  );
};

export default ShopNavigation;
