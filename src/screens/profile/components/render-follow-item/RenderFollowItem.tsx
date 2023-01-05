import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {ms, s, ScaledSheet, vs} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import colors from '../../../../theme/colors/colors';
import colorPalates from '../../../../theme/colors/colorPalates';
import fonts from '../../../../theme/fonts/fonts';
import {Communities, UserIdList, FollowQuery} from 'getsocial-react-native-sdk';
import UnFollowModel from '../unfollow-modal/UnFollowModel';
import images from '../../../../theme/images/images';
import {useNavigation} from '@react-navigation/native';
import screenNameEnum from '../../../../models/screenNameEnum';
import useUserState from 'redux-wrapper/reducers/user-slice/userState';
import {useDispatch, useSelector} from 'react-redux';
import {getSocialUsersSliceAction} from '../../../../redux-wrapper/reducers/getSocial-users-slice/GetSocialUsersSlice';
import _ from 'lodash';
import AnnounceMentModal from '../../../../components/annoucement-modal/AnnounceMentModal';
import ModalsMessages from '../../../../models/ModalsMessages';
import EndPoints from '../../../../Network/EndPoints';
import {Emmiter, showToast} from '../../../../utils/helper/helper';
import UserImage from '../../../../components/user-profile-image/UserImage';
const RenderFollowItem = ({item, isFollowess}) => {
  const [visisble, setVisisble] = useState(false);
  const navigation = useNavigation();
  const {userData} = useUserState();
  const dispatch = useDispatch();
  const [isFollowed, setISFollowed] = useState(item?.isFolloweYou || false);
  const usersData = useSelector(state => state?.getScoailUsers?.users);
  const userFromRedux = _.find(usersData, i => i?.id === userData?.id);
  const [error, setError] = useState(false);

  const onPressItem = () => {
    navigation.push(screenNameEnum.UserProfileScreen, {
      userId: item?.userId,
    });
  };

  const onPressFollow = () => {
    const userIds = UserIdList.create([item?.userId]);
    const followQuery = FollowQuery.users(userIds);

    if (!!userFromRedux) {
      dispatch(
        getSocialUsersSliceAction.addFollowingTouser({
          id: userData?.id,
          following: userFromRedux?.following + 1,
        }),
      );
    }

    try {
      Communities.follow(followQuery).then(() => {
        setISFollowed(true);
        if (isFollowess) {
          Emmiter.emit('followingData');
        } else {
          Emmiter.emit('followers');
        }
      });
    } catch (e) {
      setError(true);
    }
  };

  const onUnFollow = () => {
    setVisisble(false);
    if (item?.userId !== EndPoints.systemUser) {
      const userIds = UserIdList.create([item?.userId]);
      const followQuery = FollowQuery.users(userIds);
      if (!!userFromRedux) {
        dispatch(
          getSocialUsersSliceAction.addFollowingTouser({
            id: userData?.id,
            following: userFromRedux?.following - 1,
          }),
        );
      }

      try {
        Communities.unfollow(followQuery).then(() => {
          setISFollowed(false);
        });
      } catch (e) {
        setError(true);
      }
    } else {
      setVisisble(false);
      showToast("You can't unfollow System ");
    }
  };

  return (
    <View style={styles.itemCOntainer}>
      <TouchableOpacity style={styles.rowView} onPress={onPressItem}>
        <UserImage Url={item?.avatarUrl} size={30} />
        <Text style={styles.followingBtnText}>
          {item?.userId === userData?.id
            ? 'You'
            : item?.publicProperties?.full_name || item?.displayName}
        </Text>
      </TouchableOpacity>
      {item?.userId !== userData?.id && (
        <TouchableOpacity
          style={isFollowed ? styles.followingBtn : styles.followerBtn}
          onPress={() => (isFollowed ? setVisisble(true) : onPressFollow())}
        >
          <Text style={[styles.btnText, !isFollowed && {color: colors.white}]}>
            {isFollowed ? 'Following' : 'Follow'}
          </Text>
        </TouchableOpacity>
      )}

      <UnFollowModel
        isVisible={visisble}
        item={item}
        onClose={() => {
          setVisisble(false);
        }}
        onUnFollow={onUnFollow}
      />
      <AnnounceMentModal
        modalVisible={error}
        title={'Oops'}
        buttonText={'Ok'}
        messageText={ModalsMessages.ModalsMassages.somethingWentWrong}
        onPressButton={() => setError(false)}
      />
    </View>
  );
};

export default RenderFollowItem;

const styles = ScaledSheet.create({
  itemCOntainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: s(15),
    marginVertical: s(5),
  },
  followingBtnText: {
    color: colors.blackShade02,
    fontSize: ms(12),
    fontFamily: fonts.primaryMediumFont,
    marginStart: s(10),
  },
  btnText: {
    color: colors.blackShade02,
    fontSize: ms(12),
    fontFamily: fonts.primaryMediumFont,
  },
  profileImage: {
    width: vs(30),
    height: vs(30),
    borderRadius: ms(300),
  },
  followerBtn: {
    backgroundColor: colorPalates.AppTheme.primary,
    borderRadius: ms(5),
    padding: s(5),
    paddingHorizontal: s(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  followingBtn: {
    borderColor: colors.grayShadeCC,
    borderWidth: 1,
    borderRadius: ms(5),
    padding: s(5),
    paddingHorizontal: s(6),
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
