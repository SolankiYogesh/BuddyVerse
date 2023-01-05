import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {View, TouchableOpacity, Text} from 'react-native';
import {colorPalates} from 'theme';
import {styles} from './TopTabBarStyle';
import _ from 'lodash';
import DispensariesScreen from '../../pages/dispensaries-Screen/DispensariesScreen';
import DoctorScreen from '../../pages/doctors-screen/DoctorScreen';

const Tab = createMaterialTopTabNavigator();

const TopTabBar = props => {
  const {onChange} = props;
  const tab_bar_data = [
    {
      id: 'Dispensaries',
      title: 'Dispensaries',
      description: 'Dispensaries',
    },
    {
      id: 'doctors',
      title: 'doctors',
      description: 'Doctors',
    },
  ];
  const renderTab = (p: any) => {
    const {state, descriptors, navigation} = p;
    return (
      <View style={styles.tabBarContainer}>
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
            onChange(tab_bar_data[state?.index].description);
          }

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({name: route.name, merge: true});
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
                styles.tabBarButton,

                {
                  borderBottomWidth: isFocused ? 1 : 0,
                },
              ]}
              key={index}
            >
              <Text
                style={[
                  styles.tabBarTitle,

                  {
                    color: isFocused
                      ? colorPalates.AppTheme.primary
                      : colorPalates.grayShade80,
                  },
                ]}
              >
                {_.startCase(_.toLower(label))}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <>
      <Tab.Navigator tabBar={p => renderTab(p)} screenOptions={{lazy: true}}>
        <Tab.Screen
          key={tab_bar_data[0].id}
          initialParams={{
            dataItem: tab_bar_data[0],
          }}
          name={tab_bar_data[0]?.title}
          component={DispensariesScreen}
          options={{tabBarLabel: tab_bar_data[0]?.title}}
        />
        <Tab.Screen
          key={tab_bar_data[1].id}
          initialParams={{
            dataItem: tab_bar_data[1],
          }}
          name={tab_bar_data[1]?.title}
          component={DoctorScreen}
          options={{tabBarLabel: tab_bar_data[1]?.title}}
        />
      </Tab.Navigator>
    </>
  );
};

export default TopTabBar;
