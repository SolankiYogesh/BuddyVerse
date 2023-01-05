import {View, Image, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import SearchBarStyle from './SearchBarStyle';
import {colorPalates, images} from 'theme';
import LinearGradient from 'react-native-linear-gradient';

const SearchBar = (props: {
  value: any;
  onChangeText: any;
  onSubmitEditing: any;
  onPress: any;
  placeHolder?: string;
  style: any;
  isSearchIcon?: boolean;
  width?: string | number | undefined;
}) => {
  const {
    value,
    onChangeText,
    onSubmitEditing,
    onPress,
    placeHolder = 'Search Users',
    style,
    isSearchIcon = true,
    width = '',
  } = props;
  return (
    <View style={[style, SearchBarStyle.mainContainer]}>
      <View style={[SearchBarStyle.container, width && {width: width}]}>
        <Image
          style={SearchBarStyle.searchIcon}
          source={images.search}
          resizeMode="contain"
        />
        <TextInput
          style={SearchBarStyle.inputContainer}
          placeholder={placeHolder}
          placeholderTextColor={colorPalates.grayShadeAB}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          returnKeyType="search"
        />
      </View>
      {isSearchIcon && (
        <TouchableOpacity style={SearchBarStyle.btnView} onPress={onPress}>
          <LinearGradient
            start={{x: 0.0, y: 0.5}}
            end={{x: 0.5, y: 0.0}}
            locations={[0, 0.8]}
            colors={[colorPalates.greenShade60, colorPalates.AppTheme.primary]}
            style={SearchBarStyle.gradientContainer}
          >
            <Image
              style={SearchBarStyle.editIcon}
              source={images.search}
              resizeMode="contain"
            />
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;
