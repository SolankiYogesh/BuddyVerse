import moment from 'moment';
import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import colorPalates from '../../../../theme/colors/colorPalates';
import images from '../../../../theme/images/images';
import DisplayNotificationStyle from './DisplayNotificationStyle';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import screenNameEnum from '../../../../models/screenNameEnum';
import UserImage from '../../../../components/user-profile-image/UserImage';

const DisplayNotificationScreen = (props: any) => {
  const {item, onPress} = props;
  const unix = moment.unix(item.createdAt);
  const time = moment(unix).format('hh:mm A');
  const fDate = moment(unix).format('DD-MMM');
  const navigation = useNavigation();
  const isUnRead = item?.status === 'unread';

  const imageType =
    item?.type === 'comment_like' ||
    item?.type === 'activity_like' ||
    item?.action?.type === 'like'
      ? images.newLike
      : item?.type === 'comment' || item?.type === 'related_comment'
      ? images.newComment
      : item?.action?.type === 'likeProfile'
      ? images.newHighFive
      : item?.action?.type === 'follow'
      ? images.addFriend
      : item?.action?.type === 'group_added' ||
        item?.action?.type === 'request_to_join_group' ||
        item?.action?.type === 'request_to_join_group_approved'
      ? images.group_added
      : item?.action?.type === 'mentions'
      ? images.mentions
      : null;

  const getLastestDateString = date => {
    if (date) {
      const isSameDay = moment(date).isSame(moment(), 'd');
      const startDate = moment(moment().format('DD-MM-YYYY'), 'DD-MM-YYYY');
      const endDate = moment(moment(date).format('DD-MM-YYYY'), 'DD-MM-YYYY');
      const dayDiff = startDate.diff(endDate, 'days');
      const isYesterDay = dayDiff === 1;
      if (isSameDay) {
        return `${moment(date).format('hh:mm A')}`;
      }
      if (isYesterDay) {
        return `Yesterday ${time}`;
      }
      return `${fDate} ${time}`;
    }
    return `${fDate} ${time}`;
  };

  const onPressProfile = () => {
    navigation.navigate(screenNameEnum.UserProfileScreen, {
      userId: item?.sender?.userId,
    });
  };

  return (
    <TouchableOpacity
      style={[
        DisplayNotificationStyle.container,
        {backgroundColor: isUnRead ? '#eaf7e9' : colorPalates.white},
      ]}
      onPress={onPress}
    >
      <View style={DisplayNotificationStyle.ParentView}>
        <View style={{left: -20}}>
          <IconAntDesign
            name="left"
            color={colorPalates.AppTheme.primary}
            size={16}
          />
        </View>
      </View>
      <View style={DisplayNotificationStyle.container4}>
        <View style={DisplayNotificationStyle.container2}>
          <TouchableOpacity
            style={DisplayNotificationStyle.imagemain}
            onPress={onPressProfile}
          >
            <UserImage Url={item?.sender?.avatarUrl} size={32} />

            {!!imageType && (
              <Image
                source={imageType}
                resizeMode="contain"
                style={DisplayNotificationStyle.smallImage}
              />
            )}
          </TouchableOpacity>

          <View style={DisplayNotificationStyle.containerinner}>
            <Text style={DisplayNotificationStyle.text1}>
              {item?.sender?.displayName}
            </Text>
            <Text style={DisplayNotificationStyle.textrepeat1}>
              {item?.text}
            </Text>
          </View>
        </View>
      </View>
      <Text style={DisplayNotificationStyle.textrepeat}>
        {getLastestDateString(unix)}
      </Text>
    </TouchableOpacity>
  );
};
export default DisplayNotificationScreen;
