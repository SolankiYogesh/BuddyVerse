import {Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';

import {styles} from './MakeAdminModalStyle';

const MakeAdminModel = props => {
  const {
    isVisisble,
    onClose,

    item,
    isOwner,
    onPressAdmin,
    onPressRemoveAdmin,
    onPressRemoveUser,
  } = props;

  const isUserMember = item?.membership?.role === 3;
  const isUserAdmin = item?.membership?.role === 1;

  return (
    <Modal
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      coverScreen={true}
      isVisible={isVisisble}
      onBackButtonPress={onClose}
      onDismiss={onClose}
      onBackdropPress={onClose}
      style={{flex: 1}}
    >
      <View style={styles.container}>
        {!isUserAdmin && (
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => onPressAdmin(item)}
            hitSlop={{left: 10, right: 10, bottom: 10, top: 10}}
          >
            <Text>Make As Admin</Text>
          </TouchableOpacity>
        )}
        {!isUserMember && isUserAdmin && (
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => onPressRemoveAdmin(item)}
            hitSlop={{left: 10, right: 10, bottom: 10, top: 10}}
          >
            <Text>Remove From Admin</Text>
          </TouchableOpacity>
        )}
        {((isOwner && isUserAdmin) || isUserMember) && (
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => onPressRemoveUser(item)}
            hitSlop={{left: 10, right: 10, bottom: 10, top: 10}}
          >
            <Text>Remove From Group</Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
};

export default MakeAdminModel;
