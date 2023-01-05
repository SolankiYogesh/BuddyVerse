import React from 'react';
import {
  ImageSourcePropType,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import {Badge} from 'react-native-paper';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {colorPalates, images} from 'theme';
import SettingHeaderStyle from './SettingHeaderStyle';
import {useNavigation} from '@react-navigation/native';

export interface screenHeaderProps {
  title?: string;
  rightContainer?: boolean;
}

const SettingHeader = ({
  title = 'Setting',
  rightContainer = true,
}: screenHeaderProps) => {
  const navigation = useNavigation();
  const LeftContainer = () => {
    return (
      <TouchableOpacity
        style={SettingHeaderStyle.leftContainer}
        activeOpacity={0.7}>
        <IconAntDesign
          size={24}
          name={'arrowleft'}
          color={colorPalates.blackShade02}
          onPress={() => navigation.goBack()}
        />
      </TouchableOpacity>
    );
  };

  const TitleContainer = () => {
    return (
      <View style={SettingHeaderStyle.titleContainer}>
        <Text style={SettingHeaderStyle.headerTitle}>{title}</Text>
      </View>
    );
  };

  const RightIconButton = ({
    icon,
    onPress,
    isBadge = false,
  }: {
    icon: ImageSourcePropType;
    isBadge?: Boolean;
    onPress: () => void;
  }) => {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <Image
          source={icon}
          style={SettingHeaderStyle.rightIcon}
          resizeMode="contain"
        />
        {/* {isBadge && (
          <Badge style={SettingHeaderStyle.badgeRightIcon} size={8} />
        )} */}
      </TouchableOpacity>
    );
  };

  const RightContainer = () => {
    return (
      <View style={SettingHeaderStyle.rightContainer}>
        <RightIconButton icon={images.chatIcon} onPress={() => {}} />
        <RightIconButton
          icon={images.notificationIcon}
          isBadge={true}
          onPress={() => {}}
        />
      </View>
    );
  };

  return (
    <View style={SettingHeaderStyle.container}>
      <LeftContainer />
      <TitleContainer />
      {rightContainer && <RightContainer />}
    </View>
  );
};

export default SettingHeader;
