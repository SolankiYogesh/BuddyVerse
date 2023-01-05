import React, {useState} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import styles from './AboutTabStyle';
import AboutTabScreen from '../../pages/dispensaries/pages/about-tab-screen/AboutTabScreen';
import {colorPalates} from 'theme';
import {Entry} from 'screens/shop/models/FeedModel';

const AboutTabBar = (props: {
  navigation: any;
  data: Entry;
  route: any;
  isDoctor: boolean;
}) => {
  const {navigation, data, route, isDoctor} = props;
  const [isFocused1, setIsFocused1] = useState(true);
  const [isFocused2, setIsFocused2] = useState(false);

  const onPress = (indexes: any) => {
    if (indexes === 0) {
      setIsFocused1(true);
      setIsFocused2(false);
    } else {
      setIsFocused1(false);
      setIsFocused2(true);
    }
  };
  const renderTopTab = () => {
    return (
      <View style={styles.tabBarContainer}>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => onPress(0)}
          style={[
            styles.tabBarButton,
            {
              borderBottomWidth: isFocused1 ? 1 : 0,
            },
          ]}
        >
          <Text
            style={[
              styles.tabBarTitle,
              {
                color: isFocused1
                  ? colorPalates.AppTheme.text
                  : colorPalates.grayShade80,
              },
            ]}
          >
            About
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <AboutTabScreen
        navigation={navigation}
        data={data}
        route={route}
        isDoctor={isDoctor}
      />
    </View>
  );
};

export default AboutTabBar;
