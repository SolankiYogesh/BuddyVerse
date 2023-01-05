import {View, TouchableOpacity, TextInput, FlatList, Text} from 'react-native';
import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {ms, s, ScaledSheet, vs} from 'react-native-size-matters';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import fonts from '../../../../theme/fonts/fonts';
import colorPalates from '../../../../theme/colors/colorPalates';
import colors from '../../../../theme/colors/colors';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import UserImage from '../../../../components/user-profile-image/UserImage';

const CommentBox = forwardRef(({onPressCommentSend, mentionsList}, ref) => {
  const [text, setText] = useState('');
  const [mentionsModel, setMentionsModel] = useState(false);

  useImperativeHandle(ref, () => ({
    clearComment,
  }));

  const clearComment = () => {
    setText('');
  };

  const onChangeText = (t: string) => {
    const char = t[t.length - 1];

    if (char === '@') {
      setMentionsModel(true);
    } else {
      setMentionsModel(false);
    }

    setText(t);
  };

  const onPressMentions = item => {
    setText(text.concat(item?.displayName));

    setMentionsModel(false);
  };

  const renderMentionsItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.profileView}
        onPress={() => onPressMentions(item)}
      >
        <UserImage
          Url={item?.avatarUrl}
          size={20}
          style={styles.profileImage}
        />
        <Text style={styles.profileText}>{item?.displayName}</Text>
      </TouchableOpacity>
    );
  };

  const CommentSendButton = () => {
    return (
      <TouchableOpacity
        style={styles.sendButton}
        activeOpacity={0.7}
        hitSlop={{left: 10, right: 10, bottom: 10, top: 10}}
        onPress={() => onPressCommentSend(text)}
      >
        <IconIonicons
          name="paper-plane-sharp"
          size={20}
          color={colorPalates.AppTheme.primary}
        />
      </TouchableOpacity>
    );
  };

  const renderMentionsList = () => {
    return (
      <FlatList
        data={mentionsList}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="none"
        extraData={useState}
        renderItem={renderMentionsItem}
        keyExtractor={(_, index) => `mentions${index}`}
      />
    );
  };

  return (
    <View style={styles.inputContainer}>
      {mentionsModel && mentionsList.length !== 0 && (
        <View style={styles.mentionsViewHeight}>{renderMentionsList()}</View>
      )}
      <IconMaterialCommunity name="pencil-box" style={styles.pencilIcon} />
      <TextInput
        style={styles.commentInputContainer}
        value={text}
        placeholder="Add Comment..."
        placeholderTextColor={colorPalates.grayShadeAB}
        onChangeText={onChangeText}
      />
      <CommentSendButton />
    </View>
  );
});

export default CommentBox;
const styles = ScaledSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    paddingHorizontal: s(15),
    elevation: 5,
    height: vs(50),
    alignSelf: 'center',
    borderRadius: ms(30),
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: vs(5),
    borderTopWidth: 0.3,
    borderTopColor: colorPalates.grayShade80,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  pencilIcon: {
    fontFamily: fonts.primarySemiBoldFont,
    fontSize: ms(24),
    color: colorPalates.AppTheme.text,
    paddingRight: ms(8),
  },
  sendButton: {paddingHorizontal: ms(8)},
  commentInputContainer: {
    fontFamily: fonts.primaryRegularFont,
    fontSize: ms(14),
    color: colorPalates.AppTheme.text,
    paddingVertical: 0,
    borderRadius: ms(5),
    flex: 1,
    width: '100%',
  },
  profileView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: s(10),
    marginVertical: vs(5),
  },
  profileImage: {
    marginRight: s(10),
  },
  profileText: {
    fontSize: ms(15),
    fontFamily: fonts.primaryMediumFont,
    color: colors.blackShade02,
  },
  mentionsViewHeight: {
    maxHeight: ms(180),
    width: '90%',
    alignSelf: 'center',
    backgroundColor: colors.grayShadeE9,
    borderRadius: ms(15),
    padding: ms(10),
    position: 'absolute',
    bottom: '130%',
    left: '5%',
  },
});
