import React from 'react';
import {View, SafeAreaView} from 'react-native';
import SettingButton from '../../components/SettingButton';
import {useNavigation} from '@react-navigation/native';
import screenNameEnum from 'models/screenNameEnum';
import ScreenHeader from 'screens/feed/components/screen-header/ScreenHeader';
import LegalScreenStyle from './LegalScreenStyle';

const LegalScreen = () => {
  const navigation = useNavigation();
  const onPressButtonAboutGreenLync = () => {
    navigation.navigate(screenNameEnum.AboutGreenLyncScreen);
  };
  const onPressButtonDataPolicy = () => {
    navigation.navigate(screenNameEnum.DataPolicyScreen);
  };
  const onPressButtonPrivacyPolicy = () => {
    navigation.navigate(screenNameEnum.PrivacyPolicyScreen);
  };
  const onPressButtonTermsOfUse = () => {
    navigation.navigate(screenNameEnum.TermsOfUseScreen);
  };
  const onPressButtonEulaAgreement = () => {
    navigation.navigate(screenNameEnum.EulaAgreementScreen);
  };
  return (
    <SafeAreaView style={LegalScreenStyle.container}>
      {/* <SettingHeader title="Legal" /> */}
      <ScreenHeader isBackVisible={true} title="Legal" />
      <View style={LegalScreenStyle.mainContainer}>
        <SettingButton
          title="About GreenLync"
          onPressButton={onPressButtonAboutGreenLync}
        />
        <SettingButton
          title="Terms of Use"
          onPressButton={onPressButtonTermsOfUse}
        />
        <SettingButton
          title="Privacy Policy"
          onPressButton={onPressButtonPrivacyPolicy}
        />
        <SettingButton
          title="Data Policy"
          onPressButton={onPressButtonDataPolicy}
        />
        <SettingButton
          title="EULA Agreement"
          onPressButton={onPressButtonEulaAgreement}
        />
      </View>
    </SafeAreaView>
  );
};
export default LegalScreen;
