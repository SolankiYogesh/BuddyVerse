import {TouchableOpacity} from 'react-native';
import React from 'react';
import {ms} from 'react-native-size-matters';
import svg from '../../../../../theme/images/svg';
import {SvgXml} from 'react-native-svg';
import {useTheme} from '@react-navigation/native';

const RenderLikeButton = ({onPressLike, isLikedByMe, isComment = false}) => {
  const {dark} = useTheme();
  return (
    <TouchableOpacity onPress={onPressLike}>
      {isLikedByMe ? (
        <SvgXml xml={svg.like} height={ms(26)} width={ms(26)} />
      ) : (
        <SvgXml
          xml={
            !isComment ? svg.unlike : dark ? svg.unlikeWhite : svg.unlikeblack
          }
          height={ms(26)}
          width={ms(26)}
        />
      )}
    </TouchableOpacity>
  );
};

export default RenderLikeButton;
