import React from 'react';
import {Platform, KeyboardAvoidingView} from 'react-native';

const IosBottomButtonAvoid = props => {
  const {keyboardVerticalOffset} = props;
  return (
    <KeyboardAvoidingView
      enabled={Platform.OS === 'ios'}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
      contentContainerStyle={{flexGrow: 0}}
    />
  );
};

export default IosBottomButtonAvoid;

IosBottomButtonAvoid.defaultProps = {
  keyboardVerticalOffset: 0,
};
