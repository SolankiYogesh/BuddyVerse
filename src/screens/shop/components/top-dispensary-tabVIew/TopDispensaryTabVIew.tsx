import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import OverviewTab from '../about-screens-tabs/OverviewTab';
import ReviewTab from '../about-screens-tabs/ReviewTab';
import {ms, s, ScaledSheet} from 'react-native-size-matters';
import colorPalates from '../../../../theme/colors/colorPalates';
import fonts from '../../../../theme/fonts/fonts';
import colors from '../../../../theme/colors/colors';

const Tab = createMaterialTopTabNavigator();

function MyTabBar({state, descriptors, navigation}) {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
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
            style={[styles.tabBarButton, isFocused && styles.focusButton]}
          >
            <Text style={[isFocused ? styles.focusText : styles.tabBarTitle]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const TopDispensaryTabVIew = ({data}) => {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />} style={{flex: 1}}>
      <Tab.Screen
        name="OVERVIEW"
        component={OverviewTab}
        initialParams={{data: data}}
      />
      <Tab.Screen
        name="REVIEW"
        component={ReviewTab}
        initialParams={{data: data}}
      />
    </Tab.Navigator>
  );
};

export default TopDispensaryTabVIew;
const styles = ScaledSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colorPalates.grayShade80,
    backgroundColor: colors.white,
    elevation: 5,
    marginTop: s(10),
  },
  tabBarButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: colorPalates.AppTheme.primary,
    paddingBottom: ms(12),
    padding: s(10),
  },
  tabBarTitle: {fontSize: ms(14), fontFamily: fonts.primaryRegularFont},
  focusText: {
    fontSize: ms(14),
    fontFamily: fonts.primaryRegularFont,
    color: colors.blueShade02,
  },
  focusButton: {
    borderBottomColor: colors.blueShade02,
    borderBottomWidth: 1,
  },
});
