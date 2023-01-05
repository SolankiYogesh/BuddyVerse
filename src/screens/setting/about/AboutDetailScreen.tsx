import React from 'react';
import {SafeAreaView, View} from 'react-native';
import SettingButton from '../components/SettingButton';
import {useNavigation} from '@react-navigation/native';
import screenNameEnum from 'models/screenNameEnum';
import ScreenHeader from 'screens/feed/components/screen-header/ScreenHeader';
import {styles} from './AboutScreenStyle';

const AboutDetailScreen = () => {
  const navigation = useNavigation();
  const onPressButtonLegalScreen = () => {
    navigation.navigate(screenNameEnum.LegalScreen);
  };
  const onPressButtonSupport = () => {
    navigation.navigate(screenNameEnum.SupportScreen);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader isBackVisible title="About" />
      <View style={styles.viewContainer}>
        <SettingButton title="Legal" onPressButton={onPressButtonLegalScreen} />
        <SettingButton title="Support" onPressButton={onPressButtonSupport} />
      </View>
    </SafeAreaView>
  );
};
export default AboutDetailScreen;
