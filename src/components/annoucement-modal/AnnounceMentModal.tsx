import {
  Image,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import images from '../../theme/images/images';
import colors from '../../theme/colors/colors';
import {ms, s, ScaledSheet, vs} from 'react-native-size-matters';
import colorPalates from '../../theme/colors/colorPalates';
import fonts from '../../theme/fonts/fonts';

export interface AnnounceMentModal {
  title: string;
  onPressButton?: () => void;
  buttonText: string;
  buttonStyle: Object;
  messageText: string;
  modalVisible: boolean;
  containerStyle: any;
  popContainerStyle: any;
  onBackDrop?: () => void;
  secondButton?: boolean;
  secondButtonStyle?: any;
  secondButtonText?: string;
  onPressSecondButton?: () => void;
  messegeTextStyle?: StyleProp<TextStyle>;
  isOtherLogo?: boolean;
}

const AnnounceMentModal = ({
  title = '',
  messageText = ' ',
  modalVisible = false,
  secondButton = false,
  buttonText = 'Button',
  secondButtonText = 'secondButton',
  onPressButton = () => {},
  onPressSecondButton = () => {},
  messegeTextStyle = {},
  containerStyle = {},
  isOtherLogo = false,
}) => {
  return (
    <Modal
      isVisible={modalVisible}
      //   onBackButtonPress={onClose}
      //   onBackdropPress={onClose}
      animationIn="fadeIn"
      animationOut={'fadeOut'}
      coverScreen
      style={styles.modalContainer}
    >
      <View style={[styles.container, containerStyle]}>
        {isOtherLogo ? (
          <Image
            style={styles.appLogo}
            source={images.joint_new}
            resizeMode="contain"
          />
        ) : (
          <Image
            style={styles.appLogo}
            source={images.greenLyncLogo}
            resizeMode="contain"
          />
        )}

        {title ? <Text style={styles.titleText}>{title}</Text> : null}
        <Text style={[styles.activityText, messegeTextStyle]}>
          {messageText}
        </Text>
        {/* <Text style={styles.activityText}>{activity?.text}</Text> */}

        <View
          style={
            secondButton
              ? {
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  justifyContent: 'space-around',
                }
              : {width: '100%', alignItems: 'center'}
          }
        >
          <TouchableOpacity
            style={[styles.btnContainer]}
            onPress={onPressButton}
            activeOpacity={0.8}
          >
            <Text style={[styles.titleTextStyle]}>{buttonText}</Text>
          </TouchableOpacity>

          {secondButton && (
            <TouchableOpacity
              style={[styles.secondButtonContainer]}
              onPress={onPressSecondButton}
              activeOpacity={0.8}
            >
              <Text style={[styles.secondButtonTextStyle]}>
                {secondButtonText}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default AnnounceMentModal;

const styles = ScaledSheet.create({
  container: {
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    width: '70%',
    alignSelf: 'center',
    borderRadius: ms(15),
    padding: s(10),
  },
  modalContainer: {
    padding: 0,
    margin: 0,
  },
  appLogo: {
    width: vs(80),
    height: vs(80),
  },
  titleText: {
    fontSize: ms(18),
    color: colorPalates.redShadeDF,
    fontFamily: fonts.primarySemiBoldFont,
    textAlign: 'center',
  },
  activityText: {
    fontSize: ms(15),
    color: colors.grayShade80,
    fontFamily: fonts.primaryRegularFont,
    textAlign: 'center',
    marginVertical: vs(10),
  },
  btnContainer: {
    paddingHorizontal: s(25),
    paddingVertical: vs(7),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colorPalates.AppTheme.primary,
    borderWidth: 1,
    borderRadius: ms(50),
    overflow: 'hidden',
  },
  linearGradientContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ms(30),
    overflow: 'hidden',
    paddingHorizontal: s(25),
    paddingVertical: vs(7),
  },
  titleTextStyle: {
    color: colorPalates.AppTheme.primary,
    fontSize: ms(16),
  },
  secondButtonContainer: {
    paddingHorizontal: s(25),
    paddingVertical: vs(7),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: ms(50),
    overflow: 'hidden',
  },
  secondButtonTextStyle: {
    color: 'red',
    fontSize: ms(16),
  },
});
