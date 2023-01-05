import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import screenNameEnum from 'models/screenNameEnum';
import {View, TouchableOpacity, Text} from 'react-native';
import TopTabBarStyle from './TopTabBarStyle';
import MyGroupScreen from 'screens/chat/pages/my-groups/MyGroupScreen';
import DiscoverableGroupScreen from 'screens/chat/pages/discoverable-group/DiscoverableGroupScreen';
import colorPalates from '../../../../theme/colors/colorPalates';

const Tab = createMaterialTopTabNavigator();

const routes = ['Discover Groups', 'My Groups'];

const TopTabBar = p => {
  const isNavBar = p?.route?.params?.isNavRoute;
  const {onChange} = p;
  const TabBar = ({state, descriptors, navigation}: any) => {
    return (
      <View style={TopTabBarStyle.tabBarContainer}>
        {state.routes.map((route: any, index: number) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          if (isFocused) {
            onChange(routes[state?.index]);
          }

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({name: route.name, merge: true});
              // let routeList = [...state.routes];
              // routeList = routeList.slice(0, index + 1);
              // navigation.reset({index: index, routes: [...routeList]});
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[
                TopTabBarStyle.tabBarButton,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  borderBottomWidth: isFocused ? 1 : 0,
                },
              ]}
              key={route.name}
            >
              <Text
                style={[
                  TopTabBarStyle.tabBarTitle,
                  isFocused && {
                    color: colorPalates.AppTheme.primary,
                  },
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
      initialRouteName={isNavBar && screenNameEnum.MyGroupScreen}
    >
      <Tab.Screen
        name={screenNameEnum.DiscoverableGroupScreen}
        component={DiscoverableGroupScreen}
        options={{tabBarLabel: 'Discover Groups'}}
      />
      <Tab.Screen
        name={screenNameEnum.MyGroupScreen}
        component={MyGroupScreen}
        options={{tabBarLabel: 'My Groups'}}
      />
    </Tab.Navigator>
  );
};

export default TopTabBar;
