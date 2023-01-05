import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import ScreenHeaderStyle from './ScreenHeaderStyle';
import screenNameEnum from 'models/screenNameEnum';
import {useSelector} from 'react-redux';
import NotificationButton from '../../../../components/common-header-notification/NotificationButton';
import {SvgXml} from 'react-native-svg';
import {ms} from 'react-native-size-matters';
import colors from '../../../../theme/colors/colors';

export interface screenHeaderProps {
  title?: string;
  isBackVisible?: boolean;
  svgData: string;
}

const ScreenHeader = ({
  title = 'Feed',
  isBackVisible = false,
  svgData = '',
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
        hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}
      >
        {isBackVisible ? (
          <IconAntDesign
            size={24}
            name={'arrowleft'}
            color={colors.blackShade02}
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
        {!!svgData && <SvgXml xml={svgData} height={ms(24)} width={ms(24)} />}
        <Text style={ScreenHeaderStyle.headerTitle}>{title}</Text>
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
