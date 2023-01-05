import React from 'react';
import LoginScreenStyle from 'screens/auth/login/LoginScreenStyle';
import {Image} from 'react-native';
import {images} from 'theme';

const RestorePasswordHeader = () => {
  return (
    <Image
      style={LoginScreenStyle.greenLyncLogo}
      source={images.greenLyncLogo}
    />
  );
};
export default RestorePasswordHeader;
