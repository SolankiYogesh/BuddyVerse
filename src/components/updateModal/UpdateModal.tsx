import {
  Image,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ms, s, ScaledSheet, vs} from 'react-native-size-matters';
import React from 'react';
import Modal from 'react-native-modal';
import colors from '../../theme/colors/colors';
import fonts from '../../theme/fonts/fonts';
import {BlurView} from '@react-native-community/blur';
import images from '../../theme/images/images';
import colorPalates from '../../theme/colors/colorPalates';

interface UpdateModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const UpdateModal = ({isVisible}: UpdateModalProps) => {
  const onPressUpdate = () => {
    const url =
      Platform.select({
        android:
          'https://play.google.com/store/apps/details?id=com.greenlync&hl=en&gl=US',
        ios: 'itms-apps://apps.apple.com/app/id1617434861',
      }) || '';
    Linking.openURL(url);
  };

  return (
    <Modal
      isVisible={isVisible}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      coverScreen={true}
      style={styles.modalContainer}
    >
      <BlurView
        style={styles.absolute}
        blurType="light"
        blurAmount={5}
        reducedTransparencyFallbackColor="white"
      />
      <View style={styles.mainContainer}>
        <View style={styles.topContainer}>
          <Image
            source={images.greenLyncLogo}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.titleText}>App Update Required</Text>
          <Text style={styles.modalText}>
            Please update to the latest version to continue using the App
          </Text>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.updateBtn} onPress={onPressUpdate}>
            <Text style={styles.updateBtnText}>Update App</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default UpdateModal;

const styles = ScaledSheet.create({
  modalContainer: {
    padding: 0,
    margin: 0,
  },
  mainContainer: {
    backgroundColor: colors.white,
    alignSelf: 'center',
    width: '65%',
    borderRadius: ms(15),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  topContainer: {
    width: '100%',
    padding: s(10),
  },
  titleText: {
    fontSize: ms(15),
    color: colorPalates.AppTheme.primary,
    fontFamily: fonts.primarySemiBoldFont,
    width: '100%',
    textAlign: 'center',
    marginBottom: s(5),
  },
  modalText: {
    fontSize: ms(15),
    color: colors.blackShade02,
    fontFamily: fonts.primaryRegularFont,
    width: '100%',
    textAlign: 'center',
    paddingHorizontal: ms(10),
  },
  devider: {
    width: '100%',
    height: vs(1.5),
    backgroundColor: colors.grayShadeC8,
  },
  updateBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorPalates.AppTheme.primary,
    alignSelf: 'center',
    borderRadius: ms(50),
  },
  updateBtnText: {
    fontSize: ms(15),
    color: colors.white,
    fontFamily: fonts.primarySemiBoldFont,
    padding: s(5),
    paddingHorizontal: ms(10),
  },
  cancelBtnText: {
    fontSize: ms(15),
    color: colors.redShadeE3,
    fontFamily: fonts.primarySemiBoldFont,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  buttonView: {
    width: '100%',
    alignItems: 'center',
    padding: ms(15),
  },
  horizontalDevider: {
    width: s(1.5),
    height: '100%',
    backgroundColor: colors.grayShadeC8,
  },
  progressBar: {
    width: '85%',
    overflow: 'hidden',
    alignSelf: 'center',
  },
  logo: {
    width: vs(80),
    height: vs(80),
    alignSelf: 'center',
  },
});
