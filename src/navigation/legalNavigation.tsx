import {createNativeStackNavigator} from '@react-navigation/native-stack';
import screenNameEnum from 'models/screenNameEnum';
import React from 'react';
import AboutGreenLyncScreen from 'screens/setting/about/legal/about-greenlync/AboutGreenLyncScreen';
import PrivacyPolicyScreen from 'screens/setting/about/legal/data-policy/DataPolicyScreen';
import DataPolicyScreen from 'screens/setting/about/legal/data-policy/DataPolicyScreen';
import EulaAgreementScreen from 'screens/setting/about/legal/EULA-Agreement/EulaAgreementScreen';
import LegalScreen from 'screens/setting/about/legal/LegalScreen';
import TermsOfUseScreen from 'screens/setting/about/legal/terms-of-use/TermsOfUseScreen';


const LegalStack = createNativeStackNavigator();
const LegalNavigation = () => {
  return (
    <LegalStack.Navigator initialRouteName="LegalScreen">
        <LegalStack.Screen
        name={screenNameEnum.EulaAgreementScreen}
        component={EulaAgreementScreen}
        options={{
          headerShown: false,
        }}
      />
      <LegalStack.Screen
        name={screenNameEnum.DataPolicyScreen}
        component={DataPolicyScreen}
        options={{
          headerShown: false,
        }}
      />
      <LegalStack.Screen
        name={screenNameEnum.TermsOfUseScreen}
        component={TermsOfUseScreen}
        options={{
          headerShown: false,
        }}
      />
      <LegalStack.Screen
        name={screenNameEnum.PrivacyPolicyScreen}
        component={PrivacyPolicyScreen}
        options={{
          headerShown: false,
        }}
      />
      <LegalStack.Screen
        name={screenNameEnum.AboutGreenLyncScreen}
        component={AboutGreenLyncScreen}
        options={{
          headerShown: false,
        }}
      />
      <LegalStack.Screen
        name={screenNameEnum.LegalScreen}
        component={LegalScreen}
        options={{
          headerShown: false,
        }}
      />
    </LegalStack.Navigator>
  );
};

export default LegalNavigation;
