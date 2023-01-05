import { createNativeStackNavigator } from '@react-navigation/native-stack';
import screenNameEnum from 'models/screenNameEnum';
import React, { useEffect } from 'react';
import AgePrivacyConfirmationScreen from 'screens/auth/age-privacy-confirmation/AgePrivacyConfirmationScreeen';
import LoginScreen from 'screens/auth/login/LoginScreen';
import RegisterScreen from 'screens/auth/register/RegisterScreen';
import SplashScreen from 'screens/auth/register/SplashScreen';
import RestorePasswordScreen from 'screens/auth/restore-password/RestorePasswordScreen';
import VerificationCodeScreen from 'screens/auth/restore-password/VerificationCodeScreen';
import ChangePasswordScreen from 'screens/auth/restore-password/ChangePasswordScreen';
import PasswordSuccessScreen from 'screens/auth/restore-password/PasswordSuccessScreen';
import VerifyEmailScreen from 'screens/auth/register/VerifyEmailScreen';
import MainSplashScreen from 'screens/auth/splash-screen/MainSplashScreen';
import LegalNavigation from './legalNavigation';

const AuthStack = createNativeStackNavigator();

const AuthNavigation = () => {

  return (
    <AuthStack.Navigator initialRouteName={screenNameEnum.AgePrivacyConfirmationScreen}>
      {/* Settings Screen */}
      <AuthStack.Screen
        name={screenNameEnum.RestorePasswordScreen}
        component={RestorePasswordScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name={screenNameEnum.LegalStack}
        component={LegalNavigation}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name={screenNameEnum.VerifyEmailScreen}
        component={VerifyEmailScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name={screenNameEnum.PasswordSuccessScreen}
        component={PasswordSuccessScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name={screenNameEnum.ChangePasswordScreen}
        component={ChangePasswordScreen}
        options={{
          headerShown: false,
        }}
      />

      <AuthStack.Screen
        name={screenNameEnum.SplashScreen}
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name={screenNameEnum.AgePrivacyConfirmationScreen}
        component={AgePrivacyConfirmationScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name={screenNameEnum.LoginScreen}
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name={screenNameEnum.RegisterScreen}
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />

      <AuthStack.Screen
        name={screenNameEnum.VerificationCodeScreen}
        component={VerificationCodeScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name={screenNameEnum.MainSplashScreen}
        component={MainSplashScreen}
        options={{
          headerShown: false,
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
