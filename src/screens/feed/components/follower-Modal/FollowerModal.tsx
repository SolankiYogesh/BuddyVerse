import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import colors from 'theme/colors/colors';
import FollowerModalStyle from './FollowerModalStyle';
const FollowerModal = props => {
  const {
    isVisible,
    onClose,
    isFollower,
    onBlockUser,
    onReportUser,
    onUnFollowerUser,
  } = props;
  return (
    <Modal
      isVisible={isVisible}
      animationIn="fadeIn"
      animationOut={'fadeOut'}
      coverScreen={true}
      backdropColor={colors.blackShade02}
      onBackButtonPress={() => onClose()}
      onBackdropPress={() => onClose()}
      style={FollowerModalStyle.modalContainer}
    >
      <View style={FollowerModalStyle.container}>
        <View style={FollowerModalStyle.widthContainer}>
          <View style={FollowerModalStyle.shapContainer} />
        </View>

        {isFollower && (
          <TouchableOpacity
            style={FollowerModalStyle.btnContainer}
            onPress={onUnFollowerUser}
          >
            <Text
              style={[FollowerModalStyle.btnText, {color: colors.redShadeDF}]}
            >
              Unfollow
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={FollowerModalStyle.btnContainer}
          onPress={onBlockUser}
        >
          <Text style={FollowerModalStyle.btnText}>Block User</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={FollowerModalStyle.btnContainer}
          onPress={onReportUser}
        >
          <Text style={FollowerModalStyle.btnText}>Report</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={FollowerModalStyle.cancelBtnContainer}
          onPress={onClose}
        >
          <Text style={FollowerModalStyle.btnText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default FollowerModal;
