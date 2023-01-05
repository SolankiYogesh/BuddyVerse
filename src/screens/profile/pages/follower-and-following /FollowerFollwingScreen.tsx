import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import {styles} from './FollowersFollowingScreen';
import Followers from '../../components/Followers';
import Following from '../../components/Following';
import {TabBar, TabView} from 'react-native-tab-view';
import colorPalates from '../../../../theme/colors/colorPalates';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation, useRoute} from '@react-navigation/native';
import colors from '../../../../theme/colors/colors';
import NotificationButton from '../../../../components/common-header-notification/NotificationButton';
import {useSelector} from 'react-redux';
import screenNameEnum from '../../../../models/screenNameEnum';
import _ from 'lodash';
const FollowerFollwingScreen = () => {
  const layout = useWindowDimensions();
  const navigation = useNavigation();
  const route = useRoute();
  const item = route?.params?.item;
  const userId = item?.id || item?.userId;
  const usersData = useSelector(state => state?.getScoailUsers?.users);
  const userFromRedux = _.find(usersData, i => i?.userId === item?.userId);

  const notificationEnable = useSelector(
    state =>
      state?.notification?.initialState?.isNotification?.notificationLength,
  );

  const [index, setIndex] = React.useState(route?.params?.index || 0);
  const [routes] = React.useState([
    {key: 'followers', title: 'followers'},
    {key: 'following', title: 'following'},
  ]);

  const onPressBack = () => {
    navigation.canGoBack() && navigation.goBack();
  };

  const renderScene = ({route, jumpTo}) => {
    switch (route.key) {
      case 'followers':
        return (
          <Followers
            jumpTo={jumpTo}
            userId={userId}
            {...route}
            focus={index === 0}
          />
        );
      case 'following':
        return (
          <Following
            jumpTo={jumpTo}
            userId={userId}
            {...route}
            focus={index === 1}
          />
        );
    }
  };

  const renderTabBar = props => (
    <TabBar
      {...props}
      style={[
        {backgroundColor: colorPalates.AppTheme.cardColor},
        styles.tabviewBackContainer,
      ]}
      indicatorStyle={{backgroundColor: colorPalates.AppTheme.primary}}
      renderLabel={({route}) => {
        const isFollowers = route?.key === 'followers';
        return (
          <Text
            style={[styles.tabBatTitle, {color: colorPalates.AppTheme.primary}]}
          >
            {isFollowers
              ? userFromRedux?.followers || 0
              : userFromRedux?.following || 0}{' '}
            {route.title}
          </Text>
        );
      }}
    />
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={onPressBack}>
            <IconAntDesign
              size={24}
              name={'arrowleft'}
              color={colorPalates.blackShade02}
            />
          </TouchableOpacity>
          <Text style={styles.titleText}>{item?.displayName}</Text>

          <NotificationButton
            isBadge={notificationEnable}
            onPress={() => {
              navigation.navigate(screenNameEnum.NotificationStack);
            }}
          />
        </View>
        <TabView
          renderTabBar={renderTabBar}
          navigationState={{index, routes}}
          renderScene={renderScene}
          style={styles.tabviewBackContainer}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
        />
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: colors.white}} />
    </>
  );
};

export default FollowerFollwingScreen;
