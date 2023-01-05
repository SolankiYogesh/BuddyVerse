import {View, Text, TextInput} from 'react-native';
import React from 'react';
import CreateGroupInputStyle from './CreateGroupInputStyle';
import {colorPalates} from 'theme';

const CreateGroupInput = (props: {
  titleText?: any;
  value: any;
  onChangeText: any;
  onSubmitEditing: any;
  returnKeyType?: any;
  placeholder?: any;
  multiline?: boolean;
  editable?: boolean;
}) => {
  const {
    titleText,
    value,
    onChangeText,
    onSubmitEditing,
    returnKeyType,
    placeholder,
    multiline,
    editable,
  } = props;

  return (
    <View style={CreateGroupInputStyle.container}>
      {!!titleText && (
        <Text style={CreateGroupInputStyle.title}>{titleText}</Text>
      )}
      <TextInput
        style={
          multiline
            ? CreateGroupInputStyle.multiLineStyle
            : CreateGroupInputStyle.input
        }
        onSubmitEditing={onSubmitEditing}
        value={value}
        onChangeText={onChangeText}
        returnKeyType={returnKeyType}
        placeholder={placeholder}
        placeholderTextColor={colorPalates.grayShadeAB}
        multiline={multiline}
        editable={editable}
      />
    </View>
  );
};

export default CreateGroupInput;
