import {createNativeStackNavigator} from '@react-navigation/native-stack';
import screenNameEnum from 'models/screenNameEnum';
import React from 'react';
import AboutDetailScreen from 'screens/setting/about/AboutDetailScreen';
import AboutGreenLyncScreen from 'screens/setting/about/legal/about-greenlync/AboutGreenLyncScreen';
import DataPolicyScreen from 'screens/setting/about/legal/data-policy/DataPolicyScreen';
import EulaAgreementScreen from 'screens/setting/about/legal/EULA-Agreement/EulaAgreementScreen';
import LegalScreen from 'screens/setting/about/legal/LegalScreen';
import PrivacyPolicyScreen from 'screens/setting/about/legal/privacy-policy/PrivacyPolicyScreen';
import TermsOfUseScreen from 'screens/setting/about/legal/terms-of-use/TermsOfUseScreen';
import SupportScreen from 'screens/setting/about/support/SupportScreen';

const About = createNativeStackNavigator();

const AboutNavigation = () => {
  return (
    <About.Navigator initialRouteName="AboutDetailScreen">
        
      <About.Screen
        name={screenNameEnum.SupportScreen}
        component={SupportScreen}
        options={{
          headerShown: false,
        }}
      />
      <About.Screen
        name={screenNameEnum.AboutDetailScreen}
        component={AboutDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <About.Screen
        name={screenNameEnum.EulaAgreementScreen}
        component={EulaAgreementScreen}
        options={{
          headerShown: false,
        }}
      />
      <About.Screen
        name={screenNameEnum.DataPolicyScreen}
        component={DataPolicyScreen}
        options={{
          headerShown: false,
        }}
      />
      <About.Screen
        name={screenNameEnum.TermsOfUseScreen}
        component={TermsOfUseScreen}
        options={{
          headerShown: false,
        }}
      />
      <About.Screen
        name={screenNameEnum.PrivacyPolicyScreen}
        component={PrivacyPolicyScreen}
        options={{
          headerShown: false,
        }}
      />
      <About.Screen
        name={screenNameEnum.AboutGreenLyncScreen}
        component={AboutGreenLyncScreen}
        options={{
          headerShown: false,
        }}
      />
      <About.Screen
        name={screenNameEnum.LegalScreen}
        component={LegalScreen}
        options={{
          headerShown: false,
        }}
      />
    </About.Navigator>
  );
};

export default AboutNavigation;
