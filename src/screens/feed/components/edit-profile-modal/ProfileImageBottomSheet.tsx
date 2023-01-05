import {Text, TouchableOpacity, View} from 'react-native';
import React, {forwardRef} from 'react';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import {ms, s, ScaledSheet, vs} from 'react-native-size-matters';
import colors from '../../../../theme/colors/colors';
import FastImage from 'react-native-fast-image';
import fonts from '../../../../theme/fonts/fonts';
import images from '../../../../theme/images/images';
import {useUserState} from 'redux-wrapper/reducers';

const ProfileImageBottomSheet = forwardRef(
  ({uri, onRemoveImage, onPressChange}, ref) => {
    const {userData} = useUserState();
    return (
      <BottomSheet
        hasDraggableIcon
        ref={ref}
        height={vs(220)}
        radius={ms(15)}
        sheetBackgroundColor={colors.white}
      >
        <View style={styles.container}>
          <View style={styles.profileView}>
            <FastImage
              style={styles.profileImage}
              resizeMode="cover"
              source={uri ? {uri: uri} : images.dp}
            />
            <View>
              <Text style={styles.profileText}>
                {userData?.publicProperties?.full_name || ''}
              </Text>
              <Text style={styles.userIdText}>@{userData?.displayName}</Text>
            </View>
          </View>
          <View style={styles.devider} />
          <TouchableOpacity style={styles.btnView} onPress={onPressChange}>
            <Text style={styles.btnText}>New Profile Photo</Text>
          </TouchableOpacity>
          {!!uri && (
            <TouchableOpacity style={styles.btnViewRed} onPress={onRemoveImage}>
              <Text style={styles.btnTextRed}>Remove Photo</Text>
            </TouchableOpacity>
          )}
        </View>
      </BottomSheet>
    );
  },
);

export default ProfileImageBottomSheet;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  profileView: {
    width: '100%',
    paddingHorizontal: s(10),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: s(15),
  },
  profileImage: {
    width: vs(50),
    height: vs(50),
    borderRadius: ms(1000),
  },
  profileText: {
    marginLeft: s(10),
    fontSize: ms(15),
    fontFamily: fonts.primaryMediumFont,
    color: colors.blackShade02,
  },
  btnView: {
    paddingHorizontal: s(10),
    width: '100%',
    marginVertical: vs(15),
  },
  btnText: {
    fontSize: ms(14),
    fontFamily: fonts.primarySemiBoldFont,
    color: colors.blackShade02,
  },
  btnViewRed: {
    paddingHorizontal: s(10),
    width: '100%',
    marginBottom: vs(15),
  },
  btnTextRed: {
    fontSize: ms(14),
    fontFamily: fonts.primarySemiBoldFont,
    color: colors.redShadeDF,
  },
  devider: {
    width: '100%',
    height: vs(1.5),
    backgroundColor: colors.grayShadeEx,
  },
  userIdText: {
    marginLeft: s(10),
    fontFamily: fonts.primaryMediumFont,
    fontSize: ms(12),
    color: colors.blackShade02,
  },
});
