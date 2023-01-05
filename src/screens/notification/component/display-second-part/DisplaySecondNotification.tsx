import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import DisplaynotificationStyle from '../display-second-part/DisplaynotificationStyle';
import ThemeButton from 'components/theme-button/ThemeButton';
import moment from 'moment';
import {images} from 'theme';
import screenNameEnum from '../../../../models/screenNameEnum';
import {useNavigation} from '@react-navigation/native';
import UserImage from '../../../../components/user-profile-image/UserImage';

const DisplaySecondNotification = (props: any) => {
  const {item, onPressReject, onPressAccept} = props;
  const unix = moment.unix(item.createdAt);
  const time = moment(unix).format('hh:mm A');
  const fDate = moment(unix).format('DD-MMM');
  const navigation = useNavigation();

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

  const imageType = images.addFriend;

  const renderItem = () => {
    return (
      <View style={DisplaynotificationStyle.container}>
        <TouchableOpacity style={DisplaynotificationStyle.container4}>
          <View style={DisplaynotificationStyle.container2}>
            <TouchableOpacity
              style={DisplaynotificationStyle.imagemain}
              onPress={onPressProfile}
            >
              <UserImage Url={item?.sender?.avatarUrl} size={32} />

              <Image
                source={imageType}
                resizeMode="contain"
                style={DisplaynotificationStyle.smallImage}
              />
            </TouchableOpacity>

            <View style={DisplaynotificationStyle.containerinner}>
              <Text style={DisplaynotificationStyle.text1}>
                {item?.sender?.displayName}
              </Text>
              <Text style={DisplaynotificationStyle.textrepeat1}>
                {item?.text}
              </Text>
              <Text style={DisplaynotificationStyle.textrepeat}>
                {getLastestDateString(unix)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={DisplaynotificationStyle.button}>
          <TouchableOpacity
            style={DisplaynotificationStyle.button1}
            onPress={() => onPressReject(item)}
          >
            <Text style={DisplaynotificationStyle.textbtn1}>{'Reject'}</Text>
          </TouchableOpacity>
          <View style={DisplaynotificationStyle.button2}>
            <ThemeButton
              containerStyle={DisplaynotificationStyle.txtbtn}
              titleStyle={DisplaynotificationStyle.textbtn1}
              title={'Accept'}
              onPress={() => onPressAccept(item)}
            />
          </View>
        </View>
      </View>
    );
  };
  return renderItem();
};
export default DisplaySecondNotification;
