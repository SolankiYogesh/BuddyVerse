import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import RenderMyGroupItemStyle from './RenderMyGroupItemStyle';
import FastImage from 'react-native-fast-image';
import {images} from 'theme';
import {useNavigation} from '@react-navigation/native';
import screenNameEnum from 'models/screenNameEnum';
import ThemeButton from '../../../../components/theme-button/ThemeButton';
import {ms, s, vs} from 'react-native-size-matters';
import UserImage from '../../../../components/user-profile-image/UserImage';

const RenderMyGroupItem = ({props, item}) => {
  const navigation = useNavigation();
  const isOwner = item?.membership?.role === 0 || item?.membership?.role === 1;

  const onPressEdit = () => {
    navigation.navigate(screenNameEnum.EditGroupScreen, {
      item,
    });
  };

  return (
    <TouchableOpacity
      style={RenderMyGroupItemStyle.mainContainer}
      onPress={() => {
        navigation.navigate(screenNameEnum.GroupChatsScreen, {item: item});
      }}
    >
      <View style={RenderMyGroupItemStyle.container}>
        <UserImage Url={item?.avatarUrl} size={48} />

        <View style={RenderMyGroupItemStyle.verticalTextView}>
          <Text style={RenderMyGroupItemStyle.groupName}>{item?.title}</Text>
          <Text style={RenderMyGroupItemStyle.membersCount}>
            {item?.membersCount} members
          </Text>
        </View>
        {isOwner && (
          <View style={RenderMyGroupItemStyle.flex}>
            <ThemeButton
              title="Edit Group"
              onPress={onPressEdit}
              containerStyle={{
                overflow: 'hidden',
                borderRadius: ms(50),
                height: vs(30),
                width: s(80),
                alignItems: 'center',
                justifyContent: 'center',
              }}
              titleStyle={{fontSize: ms(14)}}
            />
          </View>
        )}
        {/* <Text style={RenderMyGroupItemStyle.timeText}>{createdTime}</Text> */}
      </View>
      <View
        style={[RenderMyGroupItemStyle.container, RenderMyGroupItemStyle.cn2]}
      >
        {/* {isOwner ? 
        (<ThemeButton title='Edit Group' onPress={onPressEdit} containerStyle={{height:ms(40)}} titleStyle={{margin:ms(10),fontSize: ms(14),}}/>) 
          :
          (<TouchableOpacity
            style={RenderMyGroupItemStyle.joiBtnView}
            onPress={onPressEdit}
          >
            <Text style={RenderMyGroupItemStyle.joinBtnText}>Edit Group</Text>
          </TouchableOpacity>)
          } */}
      </View>
    </TouchableOpacity>
  );
};

export default RenderMyGroupItem;
