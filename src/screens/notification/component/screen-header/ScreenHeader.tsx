import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import colorPalates from '../../../../theme/colors/colorPalates';
import ScreenHeaderStyle from './ScreenHeaderStyle';

export interface screenHeaderProps {
  title?: string;
  isBackVisible?: boolean;
  onPress: () => {};
}

const ScreenHeader = ({
  title = 'Notifications',
  onPress,
}: screenHeaderProps) => {
  const navigation = useNavigation();
  const onPressLeftContainer = () => {
    navigation.goBack();
  };

  const LeftContainer = () => {
    return (
      <TouchableOpacity
        style={ScreenHeaderStyle.leftContainer}
        activeOpacity={0.7}
        onPress={onPressLeftContainer}
      >
        <IconAntDesign
          size={24}
          name={'arrowleft'}
          color={colorPalates.blackShade02}
        />
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

  const RightIconButton = () => {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <Text style={ScreenHeaderStyle.headerLeftText}>Clear All</Text>
      </TouchableOpacity>
    );
  };

  const RightContainer = () => {
    return (
      <View>
        <View style={ScreenHeaderStyle.rightContainer}>
          <RightIconButton />
        </View>
      </View>
    );
  };

  return (
    <View style={ScreenHeaderStyle.container}>
      <LeftContainer />
      <TitleContainer />
      <RightContainer />
    </View>
  );
};

export default ScreenHeader;
