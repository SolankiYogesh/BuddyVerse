import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import CreateGroupHeaderStyle from './CreateGroupHeaderStyle';

const CreateGroupHeader = props => {
  const {title, onPressCancel, onPressSave, isDisable} = props;
  return (
    <View style={CreateGroupHeaderStyle.container}>
      <TouchableOpacity onPress={onPressCancel}>
        <Text style={CreateGroupHeaderStyle.sideText}>Cancel</Text>
      </TouchableOpacity>
      <Text style={CreateGroupHeaderStyle.middleText}>{title}</Text>
      <TouchableOpacity onPress={onPressSave} disabled={isDisable}>
        <Text style={CreateGroupHeaderStyle.sideText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateGroupHeader;
