import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ms, s, ScaledSheet, vs} from 'react-native-size-matters';
import Modal from 'react-native-modal';
import colors from '../../../../theme/colors/colors';
import FastImage from 'react-native-fast-image';
import fonts from '../../../../theme/fonts/fonts';
import colorPalates from '../../../../theme/colors/colorPalates';
import images from '../../../../theme/images/images';
import ModalsMessages from '../../../../models/ModalsMessages';
import UserImage from '../../../../components/user-profile-image/UserImage';

const UnFollowModel = ({isVisible = false, item, onClose, onUnFollow}) => {
  return (
    <Modal
      isVisible={isVisible}
      coverScreen={true}
      animationIn="fadeIn"
      animationOut={'fadeOut'}
      style={styles.modalContainer}
      onDismiss={onClose}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
    >
      <>
        <View style={styles.container}>
          <UserImage
            Url={item?.avatarUrl}
            size={55}
            style={styles.profileImage}
          />
          <Text style={styles.infoText}>
            {ModalsMessages.ModalsMassages.ifyouchangeYorMind}{' '}
            <Text style={styles.userText}>
              {item?.publicProperties?.full_name || item?.displayName}
            </Text>{' '}
            {ModalsMessages.ModalsMassages.again}
          </Text>
        </View>
        <View style={styles.secondContainer}>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => onUnFollow(item?.userId)}
          >
            <Text
              style={[
                styles.brnText,
                {
                  fontFamily: fonts.primaryMediumFont,
                  color: colorPalates.AppTheme.primary,
                },
              ]}
            >
              {ModalsMessages.ModalsTitles.Unfollow}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnContainer} onPress={onClose}>
            <Text style={styles.brnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </>
    </Modal>
  );
};

export default UnFollowModel;

const styles = ScaledSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: colors.white,
    padding: s(10),
    alignItems: 'center',
    paddingHorizontal: s(15),
    width: s(200),
    borderTopStartRadius: ms(15),
    borderTopEndRadius: ms(15),
  },
  profileImage: {
    marginBottom: s(10),
  },
  infoText: {
    fontSize: ms(11),
    fontFamily: fonts.primaryMediumFont,
    width: '100%',
    color: colors.grayShade8F,
    marginVertical: s(5),
  },
  userText: {
    color: colors.blackShade02,
    fontSize: ms(12),
    fontFamily: fonts.primaryMediumFont,
  },
  btnContainer: {
    padding: s(8),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: colors.grayShade8F,
  },
  secondContainer: {
    borderBottomStartRadius: ms(10),
    borderBottomEndRadius: ms(10),
    width: s(200),
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  brnText: {
    fontSize: ms(14),
    color: colors.blackShade02,
  },
});
