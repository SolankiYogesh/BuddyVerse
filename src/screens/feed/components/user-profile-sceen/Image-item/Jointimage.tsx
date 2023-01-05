import {Image} from 'react-native';
import React from 'react';
import {ms} from 'react-native-size-matters';
import images from '../../../../../theme/images/images';

const Jointimage = () => {
  return (
    <Image
      source={images.joint_new}
      style={{
        height: ms(20),
        width: ms(20),
      }}
      resizeMode="contain"
    />
  );
};

export default Jointimage;
