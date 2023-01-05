import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import UserImage from '../../../../../components/user-profile-image/UserImage';
import {ms, s, vs} from 'react-native-size-matters';
import {colorPalates, fonts} from '../../../../../theme';
import colors from '../../../../../theme/colors/colors';
import {Communities, UserIdList} from 'getsocial-react-native-sdk';
import {showToast} from '../../../../../utils/helper/helper';

const BlockedUserItem = ({item, onRemoveUser}) => {
  const onPressUnBlock = () => {
    Communities.unblockUsers(UserIdList.create([item?.userId]))
      .then(() => {
        showToast('USER UNBLOCKED');
        onRemoveUser(item);
      })
      .catch(error => console.error('Failed to unblock users, error: ', error));
  };

  return (
    <View style={styles.itemContainer}>
      <View style={styles.innerView}>
        <UserImage Url={item?.avatarUrl} size={48} onPress={() => {}} />
        <Text style={styles.textName}>{item?.displayName}</Text>
      </View>
      <TouchableOpacity style={styles.unBlockBtn} onPress={onPressUnBlock}>
        <Text style={styles.unblockText}>Unblock User</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BlockedUserItem;

const styles = StyleSheet.create({
  itemContainer: {
    width: '100%',
    marginVertical: vs(5),
    paddingHorizontal: ms(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  innerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  unBlockBtn: {
    backgroundColor: colorPalates.AppTheme.primary,
    padding: ms(7),
    borderRadius: ms(20),
  },
  textName: {
    fontSize: ms(14),
    fontFamily: fonts.primaryMediumFont,
    color: colors.blackShade02,
    marginLeft: s(10),
  },
  unblockText: {
    fontSize: ms(14),
    fontFamily: fonts.primaryMediumFont,
    color: colors.white,
  },
});
