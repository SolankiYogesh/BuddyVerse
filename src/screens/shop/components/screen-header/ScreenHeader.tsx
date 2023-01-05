import {useNavigation} from '@react-navigation/core';
import screenNameEnum from 'models/screenNameEnum';
import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {colorPalates} from 'theme';
import ScreenHeaderStyle from './ScreenHeaderStyle';
import NotificationButton from '../../../../components/common-header-notification/NotificationButton';

export interface screenHeaderProps {
  title?: string;
  isBackVisible?: boolean;
}

const ScreenHeader = ({
  title = 'Search',
  isBackVisible = false,
}: screenHeaderProps) => {
  const navigation = useNavigation();
  const notificationEnable = useSelector(
    state =>
      state?.notification?.initialState?.isNotification?.notificationLength,
  );

  const onPressLeftContainer = () => {
    if (isBackVisible) {
      navigation.canGoBack() && navigation.goBack();
    } else {
    }
  };

  const LeftContainer = () => {
    return (
      <TouchableOpacity
        style={ScreenHeaderStyle.leftContainer}
        activeOpacity={0.7}
        onPress={onPressLeftContainer}
      >
        {isBackVisible ? (
          <IconAntDesign
            size={24}
            name={'arrowleft'}
            color={colorPalates.blackShade02}
          />
        ) : (
          <FastImage
            style={ScreenHeaderStyle.profileImage}
            source={{
              uri: 'https://picsum.photos/200',
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        )}
      </TouchableOpacity>
    );
  };

  const TitleContainer = () => {
    return (
      <View style={ScreenHeaderStyle.titleContainer}>
        <Text style={ScreenHeaderStyle.headerTitle}>{title}</Text>
      </View>
    );
  };

  const RightContainer = () => {
    return (
      <View style={ScreenHeaderStyle.rightContainer}>
        {/* <RightIconButton
          icon={images.chat_new_black}
          onPress={() => {
            navigation.navigate(screenNameEnum.ChatStack);
          }}
        /> */}
      </View>
    );
  };

  return (
    <View style={ScreenHeaderStyle.container}>
      <LeftContainer />
      <TitleContainer />
      <NotificationButton
        isBadge={notificationEnable}
        onPress={() => {
          navigation.navigate(screenNameEnum.NotificationStack);
        }}
      />
    </View>
  );
};

export default ScreenHeader;
