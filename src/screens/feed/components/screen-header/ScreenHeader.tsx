import {useNavigation} from '@react-navigation/core';
// import React from 'react';
import React, {useRef} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {Badge} from 'react-native-paper';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import ScreenHeaderStyle from './ScreenHeaderStyle';
import screenNameEnum from 'models/screenNameEnum';
import BottomSheet from 'react-native-gesture-bottom-sheet';
// import { useNavigation } from '@react-navigation/native';
import UserProfile from '../user-profile/UserProfile';
import {ms, s} from 'react-native-size-matters';
import useUserState from 'redux-wrapper/reducers/user-slice/userState';
import {useSelector} from 'react-redux';
import {SvgXml} from 'react-native-svg';
import svg from '../../../../theme/images/svg';
import colors from '../../../../theme/colors/colors';
import images from '../../../../theme/images/images';
import UserImage from '../../../../components/user-profile-image/UserImage';

export interface screenHeaderProps {
  title?: string;
  isBackVisible?: boolean;
  svgData: string;
  isImage: boolean;
  isCreateScreen: boolean;
  isGreenTalk?: boolean;
  isMenu?: boolean;
  onPressMenu?: () => void;
}

const ScreenHeader = ({
  title = 'Feed',
  isBackVisible = false,
  svgData = '',
  isImage = false,
  isMenu = false,
  onPressMenu,
}: screenHeaderProps) => {
  const navigation = useNavigation();
  const notificationEnable = useSelector(
    state =>
      state?.notification?.initialState?.isNotification?.notificationLength,
  );
  const {userData} = useUserState();
  const onPressLeftContainer = () => {
    if (isBackVisible) {
      navigation.canGoBack() && navigation.goBack();
    } else {
    }
  };

  const LeftContainer = () => {
    const UserProfiles = useRef();
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
            color={colors.blackShade02}
          />
        ) : (
          <>
            <BottomSheet ref={UserProfiles} height={ms(500)} radius={ms(32)}>
              <UserProfile UserProfiles={UserProfiles} />
            </BottomSheet>
            <UserImage
              Url={userData?.avatarUrl}
              onPress={() => UserProfiles.current.show()}
              size={32}
            />
          </>
        )}
      </TouchableOpacity>
    );
  };

  const TitleContainer = () => {
    return (
      <View style={ScreenHeaderStyle.titleContainer}>
        {!(isImage || !!svgData) ? null : isImage ? (
          <Image source={svgData} style={ScreenHeaderStyle.icon} />
        ) : (
          <SvgXml xml={svgData} height={ms(24)} width={ms(24)} />
        )}

        <Text style={ScreenHeaderStyle.headerTitle}>{title}</Text>
      </View>
    );
  };

  const RightIconButton = ({
    onPress,
    isBadge = false,
  }: {
    isBadge?: Boolean;
    onPress: () => void;
  }) => {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <SvgXml
          xml={svg.notificationIconWhite}
          height={ms(20)}
          width={ms(20)}
        />

        {isBadge && <Badge style={ScreenHeaderStyle.badgeRightIcon} size={8} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={ScreenHeaderStyle.container}>
      <LeftContainer />
      <TitleContainer />
      <View style={ScreenHeaderStyle.rightContainer}>
        <RightIconButton
          isBadge={notificationEnable}
          onPress={() => {
            navigation.navigate(screenNameEnum.NotificationStack);
          }}
        />
        {isMenu && (
          <TouchableOpacity
            onPress={onPressMenu}
            hitSlop={{left: 5, right: 5, bottom: 10, top: 10}}
          >
            <Image
              source={images.dotMenu}
              resizeMode="contain"
              style={{
                width: ms(20),
                height: ms(20),
                tintColor: colors.blackShade02,
                marginLeft: s(20),
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ScreenHeader;
